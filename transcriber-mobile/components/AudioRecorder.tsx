import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const AudioRecorder = () => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [message, setMessage] = useState<string>('');

    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (!permission.granted) {
                setMessage('Permissão negada!');
                return;
            }

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
        } catch (err) {
            setMessage('Erro ao iniciar gravação');
        }
    };

    const stopRecording = async () => {
        setRecording(null);
        const uri = recording?.getURI();
        setMessage(uri ? `Áudio salvo em: ${uri}` : 'Erro ao salvar áudio');
    };

    return (
        <View>
            <Button title="Iniciar Gravação" onPress={startRecording} />
            <Button title="Parar Gravação" onPress={stopRecording} disabled={!recording} />
            <Text>{message}</Text>
        </View>
    );
};

export default AudioRecorder;
