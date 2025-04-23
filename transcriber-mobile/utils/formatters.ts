export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return `${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString(
    "pt-BR",
    { hour: "2-digit", minute: "2-digit" }
  )}`;
};
