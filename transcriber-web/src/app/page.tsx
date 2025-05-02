"use client";
import React, { useEffect, useState } from "react";
import AudioUploader from "@/components/AudioUploader";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import AudioRecorder from "@/components/AudioRecorder";
import NavigationDrawer from "@/components/NavigationDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
      <NavigationDrawer />
      <h1 className="text-3xl font-bold text-center mb-8">Audio Transcriber</h1>
      <div className="flex space-x-16 mb-8">
        {/* Botão para o componente AudioUploader */}
        <AudioUploader />

        {/* Botão para o componente AudioRecorder */}
        <AudioRecorder />
      </div>

      {/* Botão para acessar transcrições salvas */}
      {hasSavedTranscriptions && (
        <Link
          className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none"
          href="/saved-transcriptions"
        >
          <FontAwesomeIcon icon={faFileAlt} className="mr-3 text-xl" />
          Ver Transcrições Salvas
        </Link>
      )}
    </main>
  );
}
