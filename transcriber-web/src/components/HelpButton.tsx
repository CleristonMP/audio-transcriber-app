"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

interface HelpButtonProps {
  onClick: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed top-4 right-4 z-50 flex p-2 bg-transparent text-gray-800 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none"
      onClick={onClick}
      aria-label="Ajuda"
    >
      <FontAwesomeIcon icon={faQuestionCircle} className="text-2xl" />
    </button>
  );
};

export default HelpButton;
