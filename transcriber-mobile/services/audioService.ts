import { Alert } from "react-native";

export const uploadAudioAndGetTranscription = async (
  file: File,
  navigation: any
) => {
  try {
    const formData = new FormData();
    formData.append("audio", file);

    const response = await fetch("http://localhost:3000/api/transcriber/upload", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar arquivo");
    }

    const data = await response.json();
    const transcription = data.transcription;

    // Navegar para a tela de transcrição
    navigation.navigate("Transcription", { transcription });
  } catch (error) {
    Alert.alert("Erro", "Não foi possível transcrever o áudio.");
    console.error(error);
  }
};
