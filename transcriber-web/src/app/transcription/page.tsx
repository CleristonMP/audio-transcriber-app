'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const TranscriptionScreen: React.FC = () => {
  const searchParams = useSearchParams();
  const text = searchParams?.get('text') || ''; // Obtém o texto da transcrição

  // Inicializa o estado do editor com o texto transcrito
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(text))
  );

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleSave = () => {
    const content = editorState.getCurrentContent();
    const rawContent = JSON.stringify(content);
    localStorage.setItem('transcription', rawContent);
    alert('Transcrição salva com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Editor de Transcrição</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
        {/* Barra de ferramentas para estilização */}
        <div className="mb-4 flex space-x-2">
          <button
            onClick={() => toggleInlineStyle('BOLD')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Negrito
          </button>
          <button
            onClick={() => toggleInlineStyle('ITALIC')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Itálico
          </button>
          <button
            onClick={() => toggleInlineStyle('UNDERLINE')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sublinhado
          </button>
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
      <button
        onClick={handleSave}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        Salvar Transcrição
      </button>
    </div>
  );
};

export default TranscriptionScreen;