import * as FileSystem from "expo-file-system";

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
