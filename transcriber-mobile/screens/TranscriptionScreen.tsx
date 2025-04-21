import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Alert,
  View,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { exportText } from "../utils/exportText";
import { loadEditedText, saveEditedText } from "../utils/storageUtils";
import AnimatedButton from "../components/AnimatedButton";

type RootStackParamList = {
  Home: undefined;
  Transcription: { transcription: string; id: string };
  SavedTranscriptions: { id?: string } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Transcription">;

const TranscriptionScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { transcription, id } = route.params;
  const [editedText, setEditedText] = useState(transcription);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadEditedText("transcription").then((savedText) => {
      if (savedText) setEditedText(savedText);
    });
  }, [transcription]);

  const handleExport = async () => {
    try {
      await exportText(editedText);
      Alert.alert("Sucesso", "Transcrição exportada com sucesso!");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível exportar a transcrição. Verifique sua conexão com a internet e tente novamente."
      );
      console.error("Erro ao exportar a transcrição:", error);
    }
  };

  const handleSave = async () => {
    try {
      const savedId = await saveEditedText(id || null, editedText);
      setModalVisible(false);
      // navigation.navigate("SavedTranscriptions");
      
      // Reseta a navegação para ir diretamente para a tela `SavedTranscriptionsScreen`
      navigation.reset({
        index: 0,
        routes: [
          { name: "Home" }, // Define a tela `Home` como a base da pilha
          { name: "SavedTranscriptions", params: { id: savedId } }, // Adiciona a tela `SavedTranscriptionsScreen` no topo
        ],
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transcrição.");
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
        <AnimatedButton
          style={styles.iconButton}
          onPress={() => setModalVisible(true)}
          accessibilityLabel="Salvar transcrição"
          accessibilityHint="Exibe um modal para confirmar o salvamento da transcrição"
        >
          <FontAwesome name="save" size={24} color="#007AFF" />
        </AnimatedButton>
        <AnimatedButton
          style={styles.iconButton}
          onPress={handleExport}
          accessibilityLabel="Exportar transcrição"
          accessibilityHint="Exporta a transcrição para outros aplicativos"
        >
          <FontAwesome name="share" size={24} color="#4CD964" />
        </AnimatedButton>
      </View>

      {/* Modal de Confirmação */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Deseja salvar esta transcrição?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalIconButton, { backgroundColor: "#FF3B30" }]}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesome name="times" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalIconButton, { backgroundColor: "#007AFF" }]}
                onPress={handleSave}
              >
                <FontAwesome name="check" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    height: "30%",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  modalIconButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    width: 50,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TranscriptionScreen;
