import { Share, Alert } from "react-native";

export const exportText = async (text: string) => {
  try {
    const result = await Share.share({
      message: text,
    });

    if (result.action === Share.sharedAction) {
      Alert.alert("Sucesso", "Texto compartilhado com sucesso!");
    } else if (result.action === Share.dismissedAction) {
      Alert.alert("Cancelado", "Compartilhamento cancelado pelo usuário.");
    }
  } catch (error) {
    Alert.alert("Erro", "Não foi possível compartilhar o texto.");
    console.error("Erro ao compartilhar o texto:", error);
  }
};
