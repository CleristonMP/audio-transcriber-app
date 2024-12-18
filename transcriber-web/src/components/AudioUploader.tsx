'use client'
import React, { useState } from 'react';

const AudioUploader = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => console.log('Upload bem-sucedido:', data))
                .catch((error) => console.error('Erro no upload:', error));
        }
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            {file && <p>Arquivo selecionado: {file.name}</p>}
            <button onClick={handleUpload}>Fazer Upload</button>
        </div>
    );
};

export default AudioUploader;
