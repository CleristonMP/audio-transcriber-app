import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export const getFileFromUri = async (
  uri: string,
  name: string
): Promise<File> => {
  const fileInfo = await FileSystem.getInfoAsync(uri);

  if (!fileInfo.exists) {
    throw new Error("O arquivo não existe na URI fornecida.");
  }

  return { uri: fileInfo.uri, name, type: "audio/wav" } as any;
};
