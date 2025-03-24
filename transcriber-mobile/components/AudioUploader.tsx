import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';

const AudioUploader = () => {
    const [file, setFile] = React.useState<DocumentPicker.DocumentPickerResult | null>(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
        });
        setFile(result);
        console.log(result.assets && result.assets[0].name);
    };

    const handleUpload = async () => {
        if (file && 'uri' in file) {
            // Enviar o áudio para a API e obter a transcrição
            try {
                const response = await fetch('URL_DA_SUA_API', {
                    method: 'POST',
                    body: JSON.stringify({ uri: file.uri }),
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
            <Button title="Selecionar Arquivo de Áudio" onPress={pickDocument} />
            {file && <Text>Arquivo selecionado: {file.output?.item.name}</Text>}
            <Button title="Enviar" onPress={handleUpload} disabled={!file} />
        </View>
    );
};

export default AudioUploader;
