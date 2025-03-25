import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Button, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { uploadAudioAndGetTranscription } from "../services/audioService";

const AudioUploader = () => {
  const [file, setFile] = React.useState<DocumentPicker.DocumentPickerResult | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const pickDocument = async () => {
    await DocumentPicker.getDocumentAsync({
      type: "audio/*",
    }).then((response) => {
        setFile(response);
        console.log(response);
        
    }).catch((error) => {
        console.error(error);
    });
  };

  const handleUpload = async () => {
    if (file && file.assets && file.assets[0].uri) {
      const audioFile = file.assets[0].file!;
      await uploadAudioAndGetTranscription(audioFile, navigation);
    }
  };

  return (
    <View>
      <Button title="Selecionar Arquivo de Áudio" onPress={pickDocument} />
      {file && <Text>Arquivo selecionado: {file.assets && file.assets[0].name}</Text>}
      <Button title="Enviar" onPress={handleUpload} disabled={!file} />
    </View>
  );
};

export default AudioUploader;
