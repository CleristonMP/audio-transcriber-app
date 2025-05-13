"use client";
import React, { useState, useMemo } from "react";
import TranscriptionCard from "@/components/TranscriptionCard";
import {
  getTranscriptions,
  deleteTranscription,
  clearTranscriptions,
} from "@/services/localStorageService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import NavigationDrawer from "@/components/NavigationDrawer";
import instructions from "@/data/instructions.json";
import HelpButton from "@/components/HelpButton";
import dynamic from "next/dynamic";

const HelpModal = dynamic(() => import("@/components/HelpModal"));
const ConfirmationModal = dynamic(() => import("@/components/ConfirmationModal"));

const SavedTranscriptionsScreen: React.FC = () => {
  const [transcriptions, setTranscriptions] = useState(getTranscriptions());
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const router = useRouter();

  const sortedTranscriptions = useMemo(() => {
    return [...transcriptions].reverse();
  }, [transcriptions]);

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
    setIsConfirmationModalOpen(false); // Fecha o modal após a exclusão
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
        {sortedTranscriptions.length > 0 ? (
          sortedTranscriptions.map((transcription) => (
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
        <>
          <button
            onClick={() => setIsConfirmationModalOpen(true)}
            className="mt-6 py-2 px-4 flex rounded-full items-center space-x-2 text-red-500 hover:shadow-md hover:bg-red-100 focus:outline-none transition-all duration-500"
          >
            <FontAwesomeIcon icon={faTrash} />
            <span>Deletar todas as transcrições</span>
          </button>

          {/* Modal de confirmação */}
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            title="Confirmação de Exclusão"
            message="Você está prestes a excluir todas as transcrições salvas. Essa ação é irreversível. Deseja continuar?"
            onConfirm={handleDeleteAll}
            onCancel={() => setIsConfirmationModalOpen(false)}
            confirmIcon={faTrash}
            cancelIcon={faTimes}
            confirmColor="text-red-500"
            cancelColor="text-gray-500"
            confirmTooltip="Excluir todas as transcrições"
            cancelTooltip="Cancelar"
            aria-describedby="confirmation-description"
          />
        </>
      )}
    </div>
  );
};

export default SavedTranscriptionsScreen;