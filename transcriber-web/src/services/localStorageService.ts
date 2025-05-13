import { RawDraftContentState } from "draft-js";

export interface Transcription {
  id: string;
  text: string | RawDraftContentState;
  date: string;
}

const LOCAL_STORAGE_KEY = 'transcriptions';

// Obtém todas as transcrições salvas
export const getTranscriptions = (): Transcription[] => {
  const savedTranscriptions = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedTranscriptions ? JSON.parse(savedTranscriptions) : [];
};

// Salva uma lista de transcrições no localStorage
export const saveTranscriptions = (transcriptions: Transcription[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transcriptions));
};

// Adiciona uma nova transcrição
export const addTranscription = (transcription: Transcription): void => {
  const transcriptions = getTranscriptions();
  transcriptions.push(transcription);
  saveTranscriptions(transcriptions);
};

// Remove uma transcrição específica pelo ID
export const deleteTranscription = (id: string): void => {
  const transcriptions = getTranscriptions().filter((t) => t.id !== id);
  saveTranscriptions(transcriptions);
};

// Remove todas as transcrições
export const clearTranscriptions = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const hasSeenHelpModal = (): boolean => {
  return !!localStorage.getItem("hasSeenHelpModal");
};

export const markHelpModalAsSeen = (): void => {
  localStorage.setItem("hasSeenHelpModal", "true");
};