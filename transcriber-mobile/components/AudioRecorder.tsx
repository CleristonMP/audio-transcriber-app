import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

const AudioRecorder = () => {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [message, setMessage] = useState<string>('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

        if (uri) {
            // Enviar o áudio para a API e obter a transcrição
            try {
                const response = await fetch('URL_DA_SUA_API', {
                    method: 'POST',
                    body: JSON.stringify({ uri }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                const transcription = data.transcription;

                // Navegar para a tela de transcrição
                navigation.navigate('Transcription', { transcription });
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível transcrever o áudio.');
            }
        }
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
