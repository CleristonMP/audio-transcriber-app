'use client'
import AudioUploader from "@/components/AudioUploader";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 className="text-3xl font-bold text-center">Transcriber</h1>
      <AudioUploader />
    </main>
  );
}
