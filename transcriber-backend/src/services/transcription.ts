require("dotenv").config();
import fs from "fs";
import axios from "axios";
import { fileTypeFromBuffer } from "file-type";
import { exec } from "child_process";
import path from "path";

const apiKey = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!apiKey) {
  throw new Error("API Key is not defined. Please check your .env file.");
}

const encodingMap: {
  [key: string]: { encoding: string; sampleRateHertz: number };
} = {
  wav: { encoding: "LINEAR16", sampleRateHertz: 16000 },
  flac: { encoding: "FLAC", sampleRateHertz: 16000 },
  ulaw: { encoding: "MULAW", sampleRateHertz: 8000 },
  amr: { encoding: "AMR", sampleRateHertz: 8000 },
  awb: { encoding: "AMR_WB", sampleRateHertz: 16000 },
  ogg: { encoding: "OGG_OPUS", sampleRateHertz: 16000 },
  opus: { encoding: "OGG_OPUS", sampleRateHertz: 16000 },
  speex: { encoding: "SPEEX_WITH_HEADER_BYTE", sampleRateHertz: 16000 },
  mp3: { encoding: "MP3", sampleRateHertz: 16000 },
  webm: { encoding: "WEBM_OPUS", sampleRateHertz: 16000 },
};

export async function transcribeAudio(filePath: string): Promise<string> {
  try {
    const convertedFilePath = path.join(
      path.dirname(filePath),
      `${path.basename(filePath, path.extname(filePath))}_converted.wav`
    );

    // Converte o áudio para WAV com taxa de amostragem de 16 kHz
    await new Promise((resolve, reject) => {
      exec(
        `ffmpeg -i ${filePath} -ar 16000 -ac 1 ${convertedFilePath}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error("Error converting audio:", stderr);
            reject(new Error("Failed to convert audio to 16 kHz."));
          } else {
            resolve(stdout);
          }
        }
      );
    });

    // Remove o arquivo original após a conversão
    fs.unlinkSync(filePath);

    const file = fs.readFileSync(convertedFilePath);
    const audioContent = file.toString("base64");

    const fileType = await fileTypeFromBuffer(file);

    console.log("=== Debugging Converted Audio File ===");
    console.log("File Path:", convertedFilePath);
    console.log("File Type Detected:", fileType ? fileType.ext : "unknown");
    console.log("MIME Type Detected:", fileType ? fileType.mime : "unknown");
    console.log("File Size (bytes):", file.length);
    console.log("============================");

    if (!fileType || !encodingMap[fileType.ext]) {
      throw new Error(
        `Unsupported audio format: ${fileType ? fileType.ext : "unknown"}`
      );
    }

    const { encoding, sampleRateHertz } = encodingMap[fileType.ext];

    const request = {
      config: {
        encoding,
        sampleRateHertz,
        languageCode: "pt-BR",
      },
      audio: {
        content: audioContent,
      },
    };

    const response = await axios.post(
      `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Transcription response:", response.data);

    if (!response.data || !response.data.results) {
      console.error(
        "Invalid response from Google Speech-to-Text API:",
        response.data
      );
      throw new Error("Invalid response from Google Speech-to-Text API");
    }

    const transcription = response.data.results
      .map((result: any) => result.alternatives[0].transcript)
      .join("\n");

    fs.unlinkSync(convertedFilePath); // Remove o arquivo convertido
    return transcription;
  } catch (error: any) {
    if (error.response) {
      console.error("Error response from API:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    console.error("Error transcribing audio:", error.message);
    throw new Error("Transcription failed.");
  }
}
