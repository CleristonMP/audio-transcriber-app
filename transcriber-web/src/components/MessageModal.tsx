'use client';
import React from 'react';

interface MessageModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <p className="text-lg font-bold mb-4">{message}</p>
        <button
          onClick={onConfirm}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
