"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";
import ErrorModal from "./ErrorModal";
import { uploadAudioFile } from "@/services/uploadService";

interface AudioUploaderProps {
  disabled?: boolean;
}

const AudioUploader: React.FC<AudioUploaderProps> = ({ disabled = false }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setIsModalOpen(true);
    }
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("audio", file);
        const data = await uploadAudioFile(formData);
        router.push(
          `/transcription?text=${encodeURIComponent(data.transcription)}`
        );
      } catch (error: any) {
        if (error.message === "Failed to fetch") {
          setErrorMessage(
            "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
          );
        } else {
          setErrorMessage(error.message || "Ocorreu um erro inesperado.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFile(null);
  };

  return (
    <div>
      {/* Input de arquivo invisível */}
      <input
        id="audio-upload"
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Botão estilizado para upload */}
      <label
        htmlFor="audio-upload"
        className={`p-4 px-5 rounded-full shadow-lg focus:outline-none flex items-center justify-center ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-orange-400 text-white hover:bg-blue-600 cursor-pointer"
        }`}
      >
        <FontAwesomeIcon icon={faFolderOpen} className="text-2xl" />
      </label>

      {/* Modal de confirmação */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirmar Upload"
        message={`Deseja enviar o arquivo "${file?.name}" para transcrição?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmIcon={faPaperPlane}
        cancelIcon={faTimes}
        confirmColor="text-blue-500"
        cancelColor="text-red-500"
        confirmTooltip="Enviar"
        cancelTooltip="Cancelar"
      />

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <p className="text-lg font-bold mb-4">
              Aguarde, estamos processando seu arquivo de áudio...
            </p>
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto"></div>
          </div>
        </div>
      )}

      {/* Modal de erro */}
      <ErrorModal
        isOpen={!!errorMessage}
        title="Erro"
        message={errorMessage || ""}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};

export default AudioUploader;
