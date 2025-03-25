require("dotenv").config();
import fs from "fs";
import axios from "axios";
import { fileTypeFromBuffer } from "file-type";

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
    const file = fs.readFileSync(filePath);
    const audioContent = file.toString("base64");

    const fileType = await fileTypeFromBuffer(file);
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

    fs.unlinkSync(filePath); // Remove o arquivo temporário
    return transcription;
  } catch (error: any) {
    if (error.response) {
      // A resposta foi recebida, mas o servidor respondeu com um status de erro
      console.error("Error response from API:", error.response.data);
    } else if (error.request) {
      // A solicitação foi feita, mas nenhuma resposta foi recebida
      console.error("No response received:", error.request);
    } else {
      // Algo aconteceu ao configurar a solicitação que acionou um erro
      console.error("Error setting up request:", error.message);
    }
    console.error("Error transcribing audio:", error);
    throw new Error("Transcription failed.");
  }
}
