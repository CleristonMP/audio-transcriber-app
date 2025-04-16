import React, { useEffect, useState } from "react";
import { TextInput, ScrollView, StyleSheet, Button, Alert, View, TouchableOpacity, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { exportText } from "../utils/exportText";

type RootStackParamList = {
  Home: undefined;
  Transcription: { transcription: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Transcription">;

const TranscriptionScreen: React.FC<Props> = ({ route }: Props) => {
  const { transcription } = route.params;
  const [editedText, setEditedText] = useState(transcription);

  useEffect(() => {
    // Salvar a nova transcrição no AsyncStorage
    if (transcription) {
      deleteEditedText();
      saveEditedText(transcription);
    }

    // Carregar a transcrição salva (se necessário)
    loadEditedText();
  }, [transcription]);

  const saveEditedText = async (text: string) => {
    try {
      await AsyncStorage.setItem("transcription", text);
    } catch (error) {
      console.error("Erro ao salvar a transcrição:", error);
    }
  };

  const loadEditedText = async () => {
    try {
      const savedText = await AsyncStorage.getItem("transcription");
      if (savedText) setEditedText(savedText);
    } catch (error) {
      console.error("Erro ao carregar a transcrição:", error);
    }
  };

  const deleteEditedText = async () => {
    try {
      await AsyncStorage.removeItem("transcription");
      setEditedText("");
    } catch (error) {
      console.error("Erro ao deletar a transcrição:", error);
    }
  };

  const handleExport = async () => {
    try {
      await exportText(editedText);
      Alert.alert("Sucesso", "Transcrição exportada com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível exportar a transcrição.");
      console.error("Erro ao exportar a transcrição:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Transcrição</Text>
      <TextInput
        style={styles.textInput}
        multiline
        value={editedText}
        onChangeText={setEditedText}
      />
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => saveEditedText(editedText)}>
          <FontAwesome name="save" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleExport}>
          <FontAwesome name="share" size={24} color="#4CD964" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
    width: "80%",
    height: "50%",
    alignSelf: "center",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginTop: 20,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TranscriptionScreen;
