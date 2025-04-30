"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";
import ErrorModal from "./ErrorModal";

const AudioUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      setIsLoading(true); // Exibe o loader
      try {
        const formData = new FormData();
        formData.append("audio", file);

        const response = await fetch("http://localhost:3000/api/transcriber/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          if (response.status === 500) {
            throw new Error("Ocorreu um erro no servidor. Tente novamente mais tarde.");
          } else if (response.status === 400) {
            throw new Error("O arquivo enviado não é válido. Por favor, selecione um arquivo de áudio.");
          } else {
            throw new Error("Não foi possível processar o arquivo. Tente novamente.");
          }
        }

        const data = await response.json();
        console.log("Transcrição recebida:", data.transcription); // Imprime a transcrição no console
      } catch (error: any) {
        if (error.message === "Failed to fetch") {
          setErrorMessage("Não foi possível conectar ao servidor. Verifique sua conexão com a internet.");
        } else {
          setErrorMessage(error.message || "Ocorreu um erro inesperado.");
        }
      } finally {
        setIsLoading(false); // Oculta o loader
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFile(null); // Reseta o arquivo selecionado
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
      />

      {/* Botão estilizado para upload */}
      <label
        htmlFor="audio-upload"
        className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none cursor-pointer flex items-center justify-center"
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
      />

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <p className="text-lg font-bold mb-4">Aguarde, estamos processando seu arquivo de áudio...</p>
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto"></div>
          </div>
        </div>
      )}

      {/* Modal de erro */}
      <ErrorModal
        isOpen={!!errorMessage}
        title="Erro"
        message={errorMessage || ""}
        onClose={() => setErrorMessage(null)} // Fecha o modal de erro
      />
    </div>
  );
};

export default AudioUploader;
