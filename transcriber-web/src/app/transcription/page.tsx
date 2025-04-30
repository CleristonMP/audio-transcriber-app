"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  Modifier,
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
} from "@fortawesome/free-solid-svg-icons";
import "draft-js/dist/Draft.css";
import { v4 as uuidv4 } from "uuid";
import {
  getTranscriptions,
  saveTranscriptions,
} from "@/services/localStorageService";
import MessageModal from "@/components/MessageModal";

const TranscriptionScreen: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams?.get("id");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const transcriptions = getTranscriptions();
      const transcriptionToEdit = transcriptions.find((t) => t.id === id);
      if (transcriptionToEdit) {
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromText(transcriptionToEdit.text)
          )
        );
      }
    }
  }, [id]);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const clearInlineStyles = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    // Remove todas as estilizações inline da seleção atual
    const styles = ["BOLD", "ITALIC", "UNDERLINE"];
    let newContentState = contentState;

    styles.forEach((style) => {
      newContentState = Modifier.removeInlineStyle(
        newContentState,
        selection,
        style
      );
    });

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-inline-style"
    );
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    const text = content.getPlainText(); // Obtém o texto puro do editor

    // // Cria uma nova transcrição com ID único e data atual
    // const newTranscription = {
    //   id: uuidv4(),
    //   text,
    //   date: new Date().toLocaleString(), // Data e hora formatadas
    // };

    // // Adiciona a nova transcrição ao localStorage
    // addTranscription(newTranscription);

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
    router.push("/saved-transcriptions"); // Redireciona para a página de transcrições salvas
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Editor de Transcrição</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
        {/* Barra de ferramentas para estilização */}
        <div className="mb-4 flex space-x-2 justify-end">
          {/* Botão de Negrito */}
          <div className="relative">
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
          <div className="relative">
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
          <div className="relative">
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
          <div className="relative">
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
          <div className="relative">
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
          <div className="relative">
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

      {/* Botão de Salvar Transcrição */}
      <div className="group relative">
        <button
          onClick={handleSave}
          className="mt-6 px-6 py-3 shadow-md hover:bg-green-300 focus:outline-none transition-all duration-200"
          aria-label="Salvar Transcrição"
        >
          <FontAwesomeIcon icon={faSave} className="text-xl" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Salvar Transcrição
        </span>
      </div>

      {/* Modal de Confirmação */}
      <MessageModal
        isOpen={isModalOpen}
        message="Transcrição salva com sucesso!"
        onConfirm={handleModalConfirm}
      />
    </div>
  );
};

export default TranscriptionScreen;
