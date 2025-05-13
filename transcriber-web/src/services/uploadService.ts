const API_BASE_URL = "http://localhost:3000/api/transcriber";

export const uploadAudioFile = async (formData: FormData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 500) {
      throw new Error(
        "Ocorreu um erro no servidor. Tente novamente mais tarde."
      );
    } else if (response.status === 400) {
      throw new Error(
        "O arquivo enviado não é válido. Por favor, selecione um arquivo de áudio."
      );
    } else {
      throw new Error("Não foi possível processar o arquivo. Tente novamente.");
    }
  }

  return response.json();
};
