import AudioUploader from "@/components/AudioUploader";
import TranscriptionEditor from "@/components/TranscriptionEditor";

export default function Home() {
  const exampleTranscription = "Este é um exemplo de texto transcrito.";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <AudioUploader />

      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Editor de Transcrição</h1>
        <TranscriptionEditor transcription={exampleTranscription} />
      </main>
    </div>
  );
}
