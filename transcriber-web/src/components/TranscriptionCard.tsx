"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./ConfirmationModal";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

interface TranscriptionCardProps {
  id: string;
  text: any;
  date: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TranscriptionCard: React.FC<TranscriptionCardProps> = ({
  id,
  text,
  date,
  onEdit,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    onDelete(id);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  // Converte o conteúdo serializado em HTML
  const renderStyledText = () => {
    try {
      const contentState = convertFromRaw(text);
      return stateToHTML(contentState);
    } catch (error) {
      console.error("Erro ao renderizar o conteúdo estilizado:", error);
      return "<p>Erro ao carregar o conteúdo.</p>";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Cabeçalho com a data e hora */}
      <div className="mb-4">
        <span className="text-sm text-gray-500">
          Transcrição salva em {date.split(" ")[0]} às {date.split(" ")[1]}
        </span>
      </div>
      {/* Texto da transcrição */}
      <div
        className="text-gray-700 text-sm whitespace-pre-wrap mb-4"
        dangerouslySetInnerHTML={{ __html: renderStyledText() }}
      ></div>
      {/* Botões de ação */}
      <div className="flex justify-end space-x-2">
        {/* Botão de Editar */}
        <button
          onClick={() => onEdit(id)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
          aria-label="Editar"
        >
          <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
        </button>
        {/* Botão de Excluir */}
        <button
          onClick={handleDeleteClick}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
          aria-label="Excluir"
        >
          <FontAwesomeIcon icon={faTrash} className="text-red-500" />
        </button>
      </div>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirmar Exclusão"
        message="Tem certeza de que deseja excluir esta transcrição?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmIcon={faTrash}
        cancelIcon={faTimes}
        confirmColor="text-red-500"
        cancelColor="text-gray-500"
        confirmTooltip="Excluir"
        cancelTooltip="Cancelar"
      />
    </div>
  );
};

export default TranscriptionCard;
