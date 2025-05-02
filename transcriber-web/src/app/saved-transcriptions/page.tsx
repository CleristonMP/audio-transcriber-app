"use client";
import React, { useState } from "react";
import TranscriptionCard from "@/components/TranscriptionCard";
import {
  getTranscriptions,
  deleteTranscription,
  clearTranscriptions,
} from "@/services/localStorageService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import NavigationDrawer from "@/components/NavigationDrawer";
import HelpModal from "@/components/HelpModal";
import instructions from "@/data/instructions.json";
import HelpButton from "@/components/HelpButton";

const SavedTranscriptionsScreen: React.FC = () => {
  const [transcriptions, setTranscriptions] = useState(getTranscriptions());
  const [isHelpOpen, setIsHelpOpen] = useState(false); // Estado para o modal de ajuda
  const router = useRouter();

  // Exclui uma transcrição específica
  const handleDelete = (id: string) => {
    deleteTranscription(id);
    setTranscriptions(getTranscriptions());
  };

  // Edita uma transcrição (navega para a página de edição)
  const handleEdit = (id: string) => {
    const transcriptionToEdit = transcriptions.find((t) => t.id === id);
    if (transcriptionToEdit) {
      router.push(`/transcription?id=${id}`);
    }
  };

  // Exclui todas as transcrições
  const handleDeleteAll = () => {
    clearTranscriptions();
    setTranscriptions([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <NavigationDrawer />

      {/* Botão de ajuda no topo direito */}
      <HelpButton onClick={() => setIsHelpOpen(true)} />

      {/* Modal de ajuda */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title={instructions.savedTranscriptionsScreen.title}
        content={instructions.savedTranscriptionsScreen.content}
      />

      <h1 className="text-3xl font-bold mb-6">Transcrições Salvas</h1>
      <div className="w-full max-w-4xl">
        {transcriptions.length > 0 ? (
          transcriptions
            .slice()
            .reverse() // Exibe em ordem decrescente
            .map((transcription) => (
              <TranscriptionCard
                key={transcription.id}
                id={transcription.id}
                text={transcription.text}
                date={transcription.date}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
        ) : (
          <p className="text-gray-500 text-center">Nenhuma transcrição salva.</p>
        )}
      </div>
      {transcriptions.length > 0 && (
        <button
          onClick={handleDeleteAll}
          className="mt-6 py-2 px-4 flex rounded-full items-center space-x-2 text-red-500 hover:shadow-md hover:bg-red-100 focus:outline-none transition-all duration-500"
        >
          <FontAwesomeIcon icon={faTrash} />
          <span>Deletar todas as transcrições</span>
        </button>
      )}
    </div>
  );
};

export default SavedTranscriptionsScreen;