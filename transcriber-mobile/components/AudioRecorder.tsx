import { Audio } from "expo-av";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { uploadAudioAndGetTranscription } from "../services/audioService";
import { getFileFromUri } from "../utils/fileUtils";

const AudioRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [message, setMessage] = useState<string>("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        setMessage("Permissão negada!");
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      setMessage("Erro ao iniciar gravação");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        try {
          const audioFile = await getFileFromUri(uri, "recording.wav", "audio/wav");
          setMessage(`Áudio salvo em: ${uri}`);

          console.log(audioFile);          


          await uploadAudioAndGetTranscription(audioFile, navigation);
        } catch (error) {
          setMessage("Erro ao processar o arquivo de áudio.");
          console.error(error);
        }
      } else {
        setMessage("Erro ao salvar áudio");
      }
    } catch (error) {
      setMessage("Erro ao finalizar gravação");
      console.error(error);
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
