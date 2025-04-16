import { Alert } from "react-native";

export const uploadAudioAndGetTranscription = async (
  file: { uri: string; name: string; type: string },
  navigation: any
) => {
  try {
    // Log para verificar o arquivo recebido
    console.log("Arquivo recebido pelo serviço de upload:", file);

    const formData = new FormData();
    const audioFile = {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any;

    const audioBlob = {
      uri: audioFile.uri,
      name: audioFile.name,
      type: audioFile.type,
    } as unknown as Blob;

    formData.append("audio", audioBlob, audioFile.name);

    // Log para verificar o conteúdo do FormData
    console.log("FormData enviado para o servidor:", formData);

    const response = await fetch("http://192.168.0.124:3000/api/transcriber/upload", {
      method: "POST",
      body: formData,
    });

    // Log para verificar a resposta do servidor
    console.log("Resposta do servidor:", response);

    if (!response.ok) {
      throw new Error("Erro ao enviar arquivo");
    }

    const data = await response.json();
    const transcription = data.transcription;

    // Log para verificar a transcrição recebida
    console.log("Transcrição recebida do servidor:", transcription);

    navigation.navigate("Transcription", { transcription });
  } catch (error) {
    Alert.alert("Erro", "Não foi possível transcrever o áudio.");
    console.error("Erro no serviço de upload:", error);
  }
};
