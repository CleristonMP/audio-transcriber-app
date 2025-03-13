import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { transcriberRouter } from "./routes/transcriber";

dotenv.config();
const apiKey = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/transcriber", transcriberRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
