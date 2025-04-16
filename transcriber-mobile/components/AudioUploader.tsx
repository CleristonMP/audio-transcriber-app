import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { uploadAudioAndGetTranscription } from "../services/audioService";

const AudioUploader = () => {
  const [file, setFile] = React.useState<DocumentPicker.DocumentPickerResult | null>(null);
  const navigation = useNavigation<RootStackParamList>();

  const pickDocument = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });
      setFile(response);

      // Log para verificar o arquivo selecionado
      console.log("Arquivo selecionado pelo DocumentPicker:", response);
    } catch (error) {
      console.error("Erro ao selecionar o arquivo:", error);
    }
  };

  const handleUpload = async () => {
    if (file && file.assets && file.assets[0]) {
      const selectedFile = file.assets[0];

      // Formatar o arquivo no formato esperado pelo serviço
      const audioFile = {
        uri: selectedFile.uri,
        name: selectedFile.name || "audio-file.aac",
        type: selectedFile.mimeType || "audio/aac",
      };

      // Log para verificar o arquivo antes do upload
      console.log("Arquivo enviado para o serviço de upload:", audioFile);

      await uploadAudioAndGetTranscription(audioFile, navigation);
    } else {
      console.error("Nenhum arquivo válido foi selecionado.");
    }
  };

  return (
    <View>
      <Button title="Selecionar Arquivo de Áudio" onPress={pickDocument} />
      {file && file.assets && file.assets[0] && (
        <Text>Arquivo selecionado: {file.assets[0].name}</Text>
      )}
      <Button title="Enviar" onPress={handleUpload} disabled={!file} />
    </View>
  );
};

export default AudioUploader;
