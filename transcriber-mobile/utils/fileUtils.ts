import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export const getFileFromUri = async (
  uri: string,
  name: string
): Promise<File> => {
  if (Platform.OS === "web") {
    // Para web, criar o objeto File diretamente
    const response = await fetch(uri);
    const blob = await response.blob();

    return new File([blob], name, { type: blob.type }); // Use o tipo MIME real do blob
  } else {
    // Para dispositivos móveis, usar expo-file-system
    const fileInfo = await FileSystem.getInfoAsync(uri);

    if (!fileInfo.exists) {
      throw new Error("O arquivo não existe na URI fornecida.");
    }

    return { uri: fileInfo.uri, name, type: "audio/wav" } as any;
  }
};
