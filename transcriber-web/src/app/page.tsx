"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NavigationDrawer from "@/components/NavigationDrawer";
import HelpModal from "@/components/HelpModal";
import instructions from "@/data/instructions.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "@/config/fontAwesomeConfig";
import HelpButton from "@/components/HelpButton";
import { hasSeenHelpModal, markHelpModalAsSeen } from "@/services/localStorageService";

const AudioUploader = dynamic(() => import("@/components/AudioUploader"));
const AudioRecorder = dynamic(() => import("@/components/AudioRecorder"));

export default function Home() {
  const [hasSavedTranscriptions, setHasSavedTranscriptions] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false); // Estado para controlar a gravação

  useEffect(() => {
    const savedTranscriptions = localStorage.getItem("transcriptions");
    setHasSavedTranscriptions(
      !!savedTranscriptions && JSON.parse(savedTranscriptions).length > 0
    );

    if (!hasSeenHelpModal()) {
      setIsHelpOpen(true);
      markHelpModalAsSeen();
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <NavigationDrawer />

      {/* Botão de ajuda no topo direito */}
      <HelpButton onClick={() => setIsHelpOpen(true)} />

      {/* Modal de ajuda */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title={instructions.home.title}
        content={instructions.home.content}
      />

      <h1 className="text-3xl font-bold text-center mb-8">Audio Transcriber</h1>
      <div className="flex items-center space-x-16 mb-8">
        {/* Botão para o componente AudioUploader */}
        <AudioUploader disabled={isRecording} />

        {/* Botão para o componente AudioRecorder */}
        <AudioRecorder onRecordingChange={(recording) => setIsRecording(recording)} />
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
