'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmIcon?: IconDefinition; 
  cancelIcon?: IconDefinition;
  confirmColor?: string;
  cancelColor?: string;
  confirmTooltip?: string;
  cancelTooltip?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmIcon,
  cancelIcon,
  confirmColor = 'text-blue-500',
  cancelColor = 'text-red-500',
  confirmTooltip = 'Confirmar',
  cancelTooltip = 'Cancelar',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-center space-x-10 relative">
          {/* Botão de Cancelar */}
          <div className="group relative">
            <button
              className={`flex items-center justify-center ${cancelColor} hover:opacity-80 focus:outline-none`}
              onClick={onCancel}
              aria-label="Cancelar"
            >
              {cancelIcon && <FontAwesomeIcon icon={cancelIcon} className="text-3xl" />}
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {cancelTooltip}
            </span>
          </div>

          {/* Botão de Confirmar */}
          <div className="group relative">
            <button
              className={`flex items-center justify-center ${confirmColor} hover:opacity-80 focus:outline-none`}
              onClick={onConfirm}
              aria-label="Confirmar"
            >
              {confirmIcon && <FontAwesomeIcon icon={confirmIcon} className="text-3xl" />}
            </button>
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {confirmTooltip}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;