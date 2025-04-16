import { Share } from "react-native";

export const exportText = async (text: string) => {
  try {
    const result = await Share.share({
      message: text,
    });

    if (result.action === Share.sharedAction) {
      console.log("Texto compartilhado com sucesso.");
    } else if (result.action === Share.dismissedAction) {
      console.log("Compartilhamento cancelado pelo usuário.");
    }
  } catch (error) {
    console.error("Erro ao compartilhar o texto:", error);
  }
};
