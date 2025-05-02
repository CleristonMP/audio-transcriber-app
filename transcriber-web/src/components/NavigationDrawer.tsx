"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHome, faFileAlt } from "@fortawesome/free-solid-svg-icons";

const NavigationDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão do menu hamburguer */}
      <button
        className="fixed flex top-4 left-4 z-50 p-2 px-3 bg-gray-600 text-white rounded-full shadow-lg focus:outline-none"
        onClick={toggleDrawer}
      >
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>

      {/* Barra de navegação tipo gaveta */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-40`}
      >
        <button
          className="absolute flex top-4 right-4 p-2 px-3 m-0 bg-gray-700 rounded-full focus:outline-none hover:bg-gray-600"
          onClick={toggleDrawer}
        >
          <FontAwesomeIcon icon={faTimes} className="text-xl" />
        </button>
        <nav className="mt-20 flex flex-col space-y-4 px-6">
          <Link href="/" className="flex items-center text-lg hover:underline">
            <FontAwesomeIcon icon={faHome} className="mr-3 text-xl" />
            Página Inicial
          </Link>
          <Link
            href="/saved-transcriptions"
            className="flex items-center text-lg hover:underline"
          >
            <FontAwesomeIcon icon={faFileAlt} className="mr-3 text-xl" />
            Transcrições Salvas
          </Link>
        </nav>
      </div>

      {/* Fundo escuro ao abrir a gaveta */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
};

export default NavigationDrawer;
