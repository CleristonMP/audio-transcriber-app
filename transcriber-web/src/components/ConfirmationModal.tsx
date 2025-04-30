'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center space-x-10 relative">
          {/* Ícone de Cancelar com Tooltip */}
          <div className="group relative">
            <button
              className="flex items-center justify-center text-red-500 hover:text-red-600 focus:outline-none"
              onClick={onCancel}
              aria-label="Cancelar"
            >
              <FontAwesomeIcon icon={faTimes} className="text-3xl" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Cancelar
            </span>
          </div>

          {/* Ícone de Confirmar com Tooltip */}
          <div className="group relative">
            <button
              className="flex items-center justify-center text-blue-500 hover:text-blue-600 focus:outline-none"
              onClick={onConfirm}
              aria-label="Confirmar"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-3xl" />
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Enviar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;