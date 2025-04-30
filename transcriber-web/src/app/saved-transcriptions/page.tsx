'use client';
import React, { useState } from 'react';
import TranscriptionCard from '@/components/TranscriptionCard';
import {
  getTranscriptions,
  deleteTranscription,
  clearTranscriptions,
} from '@/services/localStorageService';

const SavedTranscriptionsScreen: React.FC = () => {
  const [transcriptions, setTranscriptions] = useState(getTranscriptions());

  // Exclui uma transcrição específica
  const handleDelete = (id: string) => {
    deleteTranscription(id);
    setTranscriptions(getTranscriptions());
  };

  // Edita uma transcrição (navega para a página de edição)
  const handleEdit = (id: string) => {
    const transcriptionToEdit = transcriptions.find((t) => t.id === id);
    if (transcriptionToEdit) {
      window.location.href = `/transcription?text=${encodeURIComponent(transcriptionToEdit.text)}`;
    }
  };

  // Exclui todas as transcrições
  const handleDeleteAll = () => {
    clearTranscriptions();
    setTranscriptions([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
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
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 focus:outline-none"
        >
          Deletar Todas as Transcrições
        </button>
      )}
    </div>
  );
};

export default SavedTranscriptionsScreen;