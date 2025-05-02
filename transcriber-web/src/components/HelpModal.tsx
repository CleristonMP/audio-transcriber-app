"use client";
import React from "react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: Array<{
    title: string;
    description: string;
    subitems?: string[];
  }>;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <ul className="space-y-4">
          {content.map((item, index) => (
            <li key={index}>
              <p className="font-bold">{item.title}</p>
              <p className="text-gray-700">{item.description}</p>
              {item.subitems && (
                <ul className="list-disc list-inside mt-2">
                  {item.subitems.map((subitem, subIndex) => (
                    <li key={subIndex} className="text-gray-700">
                      {subitem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default HelpModal;
