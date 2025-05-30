"use client";
import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faListUl,
  faListOl,
  faEraser,
  faSave,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import "draft-js/dist/Draft.css";
import { v4 as uuidv4 } from "uuid";
import {
  getTranscriptions,
  saveTranscriptions,
} from "@/services/localStorageService";
import dynamic from "next/dynamic";
import NavigationDrawer from "@/components/NavigationDrawer";
import instructions from "@/data/instructions.json";
import HelpButton from "@/components/HelpButton";
import { applyInlineStyle, applyBlockType, clearStyles } from "@/utils/editorUtils";

const HelpModal = dynamic(() => import("@/components/HelpModal"));
const MessageModal = dynamic(() => import("@/components/MessageModal"));

const TranscriptionScreen: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams?.get("id");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const text = searchParams?.get("text") || "";

  const initialEditorState = useMemo(() => {
    if (id) {
      const transcriptions = getTranscriptions();
      const transcriptionToEdit = transcriptions.find((t) => t.id === id);
      if (transcriptionToEdit) {
        return EditorState.createWithContent(
          typeof transcriptionToEdit.text === "string"
            ? ContentState.createFromText(transcriptionToEdit.text)
            : convertFromRaw(transcriptionToEdit.text)
        );
      }
    }
    return EditorState.createWithContent(ContentState.createFromText(text)) || EditorState.createEmpty();
  }, [id, text]);

  const [editorState, setEditorState] = useState(initialEditorState);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(applyInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(applyBlockType(editorState, blockType));
  };

  const clearInlineStyles = () => {
    setEditorState(clearStyles(editorState));
  };

  const handleCopyToClipboard = () => {
    const content = editorState.getCurrentContent();
    const plainText = content.getPlainText();

    navigator.clipboard
      .writeText(plainText)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Feedback temporário
      })
      .catch((err) => {
        console.error("Erro ao copiar para a área de transferência:", err);
      });
  };

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    const text = convertToRaw(content);

    const transcriptions = getTranscriptions();

    if (id) {
      // Atualiza a transcrição existente
      const updatedTranscriptions = transcriptions.map((t) =>
        t.id === id ? { ...t, text } : t
      );
      saveTranscriptions(updatedTranscriptions);
    } else {
      // Cria uma nova transcrição
      const newTranscription = {
        id: uuidv4(),
        text,
        date: new Date().toLocaleString(),
      };
      transcriptions.push(newTranscription);
      saveTranscriptions(transcriptions);
    }

    // Exibe o modal de confirmação
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    router.replace("/saved-transcriptions");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Menu hamburguer para abrir a barra de navegação */}
      <NavigationDrawer />

      {/* Botão de ajuda no topo direito */}
      <HelpButton onClick={() => setIsHelpOpen(true)} />

      {/* Modal de ajuda */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title={instructions.transcriptionScreen.title}
        content={instructions.transcriptionScreen.content}
      />

      <h1 className="text-3xl font-bold mb-6">Editor de Transcrição</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
        {/* Barra de ferramentas para estilização */}
        <div className="mb-4 flex space-x-4 justify-end">
          {/* Botão de Negrito */}
          <div className="group relative">
            <button
              onClick={() => toggleInlineStyle("BOLD")}
              className="p-2 shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-200"
              aria-label="Negrito"
            >
              <FontAwesomeIcon icon={faBold} className="text-xl" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Negrito
            </span>
          </div>

          {/* Botão de Itálico */}
          <div className="group relative">
            <button
              onClick={() => toggleInlineStyle("ITALIC")}
              className="p-2 shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-200"
              aria-label="Itálico"
            >
              <FontAwesomeIcon icon={faItalic} className="text-xl" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Itálico
            </span>
          </div>

          {/* Botão de Sublinhado */}
          <div className="group relative">
            <button
              onClick={() => toggleInlineStyle("UNDERLINE")}
              className="p-2 shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-200"
              aria-label="Sublinhado"
            >
              <FontAwesomeIcon icon={faUnderline} className="text-xl" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Sublinhado
            </span>
          </div>

          {/* Botão de Lista com Marcadores */}
          <div className="group relative">
            <button
              onClick={() => toggleBlockType("unordered-list-item")}
              className="p-2 shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-200"
              aria-label="Lista com Marcadores"
            >
              <FontAwesomeIcon icon={faListUl} className="text-xl" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Lista com Marcadores
            </span>
          </div>

          {/* Botão de Lista Numerada */}
          <div className="group relative">
            <button
              onClick={() => toggleBlockType("ordered-list-item")}
              className="p-2 shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-200"
              aria-label="Lista Numerada"
            >
              <FontAwesomeIcon icon={faListOl} className="text-xl" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Lista Numerada
            </span>
          </div>

          {/* Botão de Limpar Estilização */}
          <div className="group relative">
            <button
              onClick={clearInlineStyles}
              className="p-2 shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-200"
              aria-label="Limpar Estilização"
            >
              <FontAwesomeIcon icon={faEraser} className="text-xl" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Limpar Estilização
            </span>
          </div>
        </div>

        {/* Editor de texto */}
        <div className="border border-gray-300 rounded p-2 min-h-[300px]">
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder="Edite sua transcrição aqui..."
          />
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex space-x-4 mt-6">
        {/* Botão de Salvar Transcrição */}
        <div className="group relative">
          <button
            onClick={handleSave}
            className="px-6 py-3 shadow-md hover:bg-green-300 focus:outline-none transition-all duration-200"
            aria-label="Salvar Transcrição"
          >
            <FontAwesomeIcon icon={faSave} className="text-xl" />
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Salvar Transcrição
          </span>
        </div>

        {/* Botão de Copiar para a Área de Transferência */}
        <div className="group relative">
          <button
            onClick={handleCopyToClipboard}
            className={`px-6 py-3 shadow-md ${
              copySuccess ? "bg-blue-300" : "hover:bg-blue-300"
            } focus:outline-none transition-all duration-200`}
            aria-label="Copiar Transcrição"
          >
            <FontAwesomeIcon icon={faCopy} className="text-xl" />
          </button>
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Copiar Transcrição
          </span>
        </div>
      </div>

      {/* Feedback de Cópia */}
      {copySuccess && (
        <p className="mt-2 text-green-600">Texto copiado com sucesso para a área de transferência!</p>
      )}

      {/* Modal de Confirmação */}
      <MessageModal
        isOpen={isModalOpen}
        message="Transcrição salva com sucesso!"
        onConfirm={handleModalConfirm}
        aria-describedby="modal-description"
      />
    </div>
  );
};

export default TranscriptionScreen;
