"use client";
import React, { useEffect, useState } from "react";
import AudioUploader from "@/components/AudioUploader";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Evita a adição automática de CSS pelo Font Awesome
config.autoAddCss = false;

export default function Home() {
  const [hasSavedTranscriptions, setHasSavedTranscriptions] = useState(false);

  useEffect(() => {
    // Verifica se há transcrições salvas no localStorage
    const savedTranscriptions = localStorage.getItem("transcriptions");
    setHasSavedTranscriptions(
      !!savedTranscriptions && JSON.parse(savedTranscriptions).length > 0
    );
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Transcriber</h1>
      <div className="flex space-x-4">
        {/* Botão para o componente AudioUploader */}
        <AudioUploader />

        {/* Botão para o componente AudioRecorder */}
        <button
          className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none"
          onClick={() => {
            // Lógica para abrir o componente AudioRecorder
            console.log("Abrir AudioRecorder");
          }}
        >
          <i className="fas fa-microphone text-2xl"></i>
        </button>
      </div>

      {/* Botão para acessar transcrições salvas */}
      {hasSavedTranscriptions && (
        <button
          className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none"
          onClick={() => {
            // Navegar para a rota SavedTranscriptions
            console.log("Ir para SavedTranscriptions");
          }}
        >
          Ver Transcrições Salvas
        </button>
      )}
    </main>
  );
}
