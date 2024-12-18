import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Button, Text, View } from 'react-native';

const AudioUploader = () => {
    const [file, setFile] = React.useState<DocumentPicker.DocumentPickerResult | null>(null);

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'audio/*',
        });
        setFile(result);
        console.log(result.assets && result.assets[0].name)
    };

    return (
        <View>
            <Button title="Selecionar Arquivo de Áudio" onPress={pickDocument} />
            {file && <Text>Arquivo selecionado: {file.assets && file.assets[0].name}</Text>}
        </View>
    );
};

export default AudioUploader;
