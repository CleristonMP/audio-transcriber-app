'use client'
import React, { useEffect, useState } from 'react';
import TranscriptionEditor from './TranscriptionEditor';

const AudioUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [transcription, setTranscription] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem("transcription", transcription || "");
      }, [transcription]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('audio', file);
            fetch('http://localhost:3000/api/transcriber/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setMessage('Upload bem-sucedido!');
                    setTranscription(data.transcription);
                })
                .catch((error) => setMessage('Erro no upload.'));
        }
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            {file && <p>Arquivo selecionado: {file.name}</p>}
            <button onClick={handleUpload}>Fazer Upload</button>
            {message && <p>{message}</p>}
            {transcription && <TranscriptionEditor transcription={transcription} />}
        </div>
    );
};

export default AudioUploader;
