import React, { useEffect, useState } from "react";
import { TextInput, ScrollView, StyleSheet, Button, Alert } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  Transcription: { transcription: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Transcription'>;

const TranscriptionScreen: React.FC<Props> = ({ route } : Props) => {
  const { transcription } = route.params;
  const [editedText, setEditedText] = useState(transcription);

  useEffect(() => {
    loadEditedText();
  }
  , []);

  const saveEditedText = async (text: string) => {
    try {
        await AsyncStorage.setItem('transcription', text);
    } catch (error) {
        console.error('Erro ao salvar a transcrição:', error);
    }
 };
 
 const loadEditedText = async () => {
    try {
        const savedText = await AsyncStorage.getItem('transcription');
        if (savedText) setEditedText(savedText);
    } catch (error) {
        console.error('Erro ao carregar a transcrição:', error);
    }
 };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        value={editedText}
        onChangeText={setEditedText}
      />
      <Button title="Salvar" onPress={() => saveEditedText(editedText)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default TranscriptionScreen;
