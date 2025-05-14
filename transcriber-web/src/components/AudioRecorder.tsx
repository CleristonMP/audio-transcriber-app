"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import { uploadAudioFile } from "@/services/uploadService";
import ErrorModal from "@/components/ErrorModal";

interface AudioRecorderProps {
  onRecordingChange: (isRecording: boolean) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const startRecording = async () => {
    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      setMediaRecorder(recorder);

      const chunks: Blob[] = []; // Array local para armazenar os chunks

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        } else {
          console.warn("Chunk de áudio vazio recebido.");
        }
      };

      recorder.onstop = async () => {
        // Aguarda um pequeno intervalo para garantir que todos os chunks sejam processados
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Converte os chunks de áudio em um único Blob
        const audioBlob = new Blob(chunks, { type: "audio/webm" });

        if (audioBlob.size === 0) {
          console.error("Erro: O arquivo de áudio está vazio.");
          setErrorMessage("Erro: O arquivo de áudio está vazio. Tente gravar novamente.");
          setIsLoading(false);
          return;
        }

        // Envia o arquivo usando o serviço de upload
        try {
          const formData = new FormData();
          formData.append("audio", audioBlob);

          const data = await uploadAudioFile(formData);
          const transcription = data.transcription;

          // Redireciona para a tela de edição da transcrição
          router.push(`/transcription?text=${encodeURIComponent(transcription)}`);
        } catch (error: any) {
          console.error("Erro ao enviar o áudio:", error);
          setErrorMessage(
            error.message || "Erro ao enviar o áudio. Verifique sua conexão com a internet e tente novamente."
          );
        } finally {
          setIsLoading(false);
        }
      };

      recorder.start();
      setIsRecording(true);
      onRecordingChange(true); // Notifica o componente pai
    } catch (error) {
      console.error("Erro ao acessar o microfone:", error);
      setErrorMessage(
        "Erro ao acessar o microfone. Verifique as permissões do navegador."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      onRecordingChange(false); // Notifica o componente pai
    }
  };

  return (
    <div>
      {/* Modal de erro */}
      {errorMessage && (
        <ErrorModal
          isOpen={!!errorMessage}
          title="Erro na Gravação"
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="loader mb-4"></div>
          <p className="text-gray-700">
            Aguarde enquanto processamos o seu áudio...
          </p>
        </div>
      ) : (
        <>
          <button
            className={`p-4 px-6 flex rounded-full shadow-lg focus:outline-none ${
              isRecording
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={isRecording ? stopRecording : startRecording}
            aria-label={isRecording ? "Parar gravação" : "Iniciar gravação"}
          >
            <FontAwesomeIcon
              icon={isRecording ? faStop : faMicrophone}
              className="text-white text-2xl"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
