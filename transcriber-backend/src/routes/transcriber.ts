import { Router } from "express";
import multer from "multer";
import { transcribeAudio } from "../services/transcription";

const upload = multer({ dest: "uploads/" });
export const transcriberRouter = Router();

// Endpoint para upload e transcrição
transcriberRouter.post("/upload", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }
    const transcription = await transcribeAudio(req.file.path);
    res.json({ transcription });
  } catch (error) {
    res.status(500).json({ error: "Failed to process audio." });
  }
});
