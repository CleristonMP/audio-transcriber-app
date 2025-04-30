'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TranscriptionCardProps {
  id: string;
  text: string;
  date: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TranscriptionCard: React.FC<TranscriptionCardProps> = ({ id, text, date, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{date}</span>
        <div className="flex space-x-2">
          {/* Botão de Editar */}
          <button
            onClick={() => onEdit(id)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            aria-label="Editar"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          {/* Botão de Excluir */}
          <button
            onClick={() => onDelete(id)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
            aria-label="Excluir"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <p className="text-gray-700 text-sm">{text}</p>
    </div>
  );
};

export default TranscriptionCard;