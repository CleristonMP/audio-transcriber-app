import AsyncStorage from "@react-native-async-storage/async-storage";

const LAST_ID_KEY = "last_transcription_id";

/**
 * Carrega todas as transcrições salvas no AsyncStorage.
 * @returns Uma lista de transcrições ordenadas da mais nova para a mais antiga.
 */
export const loadAllTranscriptions = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    const formattedTranscriptions = items
      .filter(([key]) => key !== "last_transcription_id")
      .map(([key, value]) => {
        const transcription = JSON.parse(value || "{}");
        return {
          id: transcription.id,
          text: transcription.text,
          createdAt: transcription.createdAt,
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return formattedTranscriptions;
  } catch (error) {
    console.error("Erro ao carregar as transcrições:", error);
    throw error;
  }
};

export const saveEditedText = async (
  id: string | null,
  text: string
): Promise<string> => {
  try {
    if (id) {
      // Verifica se a transcrição já existe e atualiza o texto
      const existingTranscription = await AsyncStorage.getItem(id);
      if (existingTranscription) {
        const updatedTranscription = {
          ...JSON.parse(existingTranscription),
          text,
        };
        await AsyncStorage.setItem(id, JSON.stringify(updatedTranscription));
        return id;
      }
    }

    // Gera um novo ID sequencial para uma nova transcrição
    const lastId = await AsyncStorage.getItem(LAST_ID_KEY);
    const newId = lastId ? (parseInt(lastId, 10) + 1).toString() : "1";

    // Cria uma nova transcrição
    const newTranscription = {
      id: newId,
      text,
      createdAt: new Date().toISOString(),
    };
    await AsyncStorage.setItem(newId, JSON.stringify(newTranscription));
    await AsyncStorage.setItem(LAST_ID_KEY, newId); // Atualiza o último ID gerado
    return newId;
  } catch (error) {
    console.error(`Erro ao salvar ou atualizar a transcrição (${id || "nova"}):`, error);
    throw error;
  }
};

export const loadEditedText = async (id: string): Promise<string | null> => {
  try {
    const transcription = await AsyncStorage.getItem(id);
    return transcription ? JSON.parse(transcription).text : null;
  } catch (error) {
    console.error(`Erro ao carregar a transcrição (${id}):`, error);
    return null;
  }
};

export const deleteTranscription = async (id: string) => {
  try {
    await AsyncStorage.removeItem(id);
  } catch (error) {
    console.error(`Erro ao deletar a transcrição (${id}):`, error);
  }
};

/**
 * Remove todas as transcrições salvas no AsyncStorage.
 * @param transcriptions Lista de transcrições a serem removidas.
 */
export const handleDeleteAllTranscriptions = async (transcriptions: { id: string }[]) => {
  try {
    const keys = transcriptions.map((item) => item.id);
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error("Erro ao deletar todas as transcrições:", error);
    throw error;
  }
};
