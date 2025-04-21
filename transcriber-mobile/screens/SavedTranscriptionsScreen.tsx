import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";

type RootStackParamList = {
  Home: undefined;
  Transcription: { transcription: string, id: string };
  SavedTranscriptions: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SavedTranscriptions"
>;

const SavedTranscriptionsScreen: React.FC = () => {
  const [transcriptions, setTranscriptions] = useState<
  { id: string; text: string; createdAt: string }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const loadTranscriptions = async () => {
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
        });
        setTranscriptions(formattedTranscriptions);
      } catch (error) {
        console.error("Erro ao carregar as transcrições:", error);
      }
    };

    loadTranscriptions();
  }, []);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString(
      "pt-BR",
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  };

  const handleSelectTranscription = (transcription: string, id: string) => {
      navigation.navigate("Transcription", { transcription, id });
  };

  const handleDeleteTranscription = async () => {
    if (selectedKey) {
      try {
        await AsyncStorage.removeItem(selectedKey);
        setTranscriptions((prev) =>
          prev.filter((item) => item.id !== selectedKey)
        );
        setSuccessModalVisible(true);
      } catch (error) {
        console.error("Erro ao deletar a transcrição:", error);
      } finally {
        setModalVisible(false);
        setSelectedKey(null);
      }
    }
  };

  const confirmDelete = (key: string) => {
    setSelectedKey(key);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transcrições Salvas</Text>
      <FlatList
        data={transcriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transcriptionCard}>
            <Text style={styles.transcriptionDate}>
              Transcrição salva em {formatDate(item.createdAt)}:
            </Text>
            <Text style={styles.transcriptionText} numberOfLines={2}>
              {item.text}
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleSelectTranscription(item.text, item.id)}
              >
                <FontAwesome name="edit" size={20} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => confirmDelete(item.id)}
              >
                <FontAwesome name="trash" size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Tem certeza de que deseja excluir esta transcrição?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalIconButton, { backgroundColor: "#007AFF" }]}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesome name="times" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalIconButton, { backgroundColor: "#FF3B30" }]}
                onPress={handleDeleteTranscription}
              >
                <FontAwesome name="trash" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContent}>
            <Text style={styles.successModalText}>Transcrição deletada com sucesso!</Text>
            <TouchableOpacity
              style={styles.successModalButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <FontAwesome name="check" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  transcriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transcriptionDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  transcriptionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 30,
    width: 40,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 10,
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
    marginTop: 10,
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
  successModalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  successModalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  successModalButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CD964",
    borderRadius: 30,
    width: 50,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
});

export default SavedTranscriptionsScreen;
