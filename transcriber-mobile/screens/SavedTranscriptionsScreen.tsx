import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DrawerButton from "../components/DrawerButton";
import { RootStackParamList } from "../App";
import HelpButton from "../components/HelpButton";
import helpTexts from "../assets/helpTexts.json";
import { loadAllTranscriptions, handleDeleteAllTranscriptions as deleteAllTranscriptions, deleteTranscription } from "../utils/storageUtils";
import { formatDate } from "../utils/formatters";

interface SavedTranscriptionsScreenProps {
  openDrawer: () => void;
}

const SavedTranscriptionsScreen: React.FC<SavedTranscriptionsScreenProps> = ({
  openDrawer,
}) => {
  const [transcriptions, setTranscriptions] = useState<
    { id: string; text: string; createdAt: string }[]
  >([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false); // Estado para deletar todas as transcrições
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const transcriptions = await loadAllTranscriptions();
        setTranscriptions(transcriptions);
      } catch (error) {
        console.error("Erro ao carregar as transcrições:", error);
      }
    };

    fetchTranscriptions();
  }, []);

  const handleSelectTranscription = (transcription: string, id: string) => {
    navigation.navigate("Transcription", { transcription, id });
  };

  const handleDeleteTranscription = async () => {
    if (selectedKey) {
      try {
        await deleteTranscription(selectedKey);
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

  const handleDeleteAllTranscriptions = async () => {
    try {
      await deleteAllTranscriptions(transcriptions);
      setTranscriptions([]);
      setSuccessModalVisible(true);
    } catch (error) {
      console.error("Erro ao deletar todas as transcrições:", error);
    } finally {
      setModalVisible(false);
      setDeleteAll(false);
    }
  };

  const confirmDelete = (key: string) => {
    setSelectedKey(key);
    setModalVisible(true);
  };

  const confirmDeleteAll = () => {
    setDeleteAll(true);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerButton onPress={openDrawer} />
      <HelpButton
        title={helpTexts.savedTranscriptions.title}
        description={helpTexts.savedTranscriptions.description}
        items={helpTexts.savedTranscriptions.items}
      />
      <Text style={styles.title}>Transcrições Salvas</Text>
      {transcriptions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma transcrição salva.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={transcriptions}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
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
          <TouchableOpacity
            style={styles.deleteAllButton}
            onPress={confirmDeleteAll}
          >
            <FontAwesome name="trash" size={18} color="#FF3B30" />
            <Text style={styles.deleteAllButtonText}>Deletar Todas</Text>
          </TouchableOpacity>
        </>
      )}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {deleteAll
                ? "Tem certeza de que deseja excluir todas as transcrições? Esta ação não poderá ser desfeita."
                : "Tem certeza de que deseja excluir esta transcrição?"}
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
                onPress={deleteAll ? handleDeleteAllTranscriptions : handleDeleteTranscription}
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
            <Text style={styles.successModalText}>
              {deleteAll
                ? "Todas as transcrições foram deletadas com sucesso!"
                : "Transcrição deletada com sucesso!"}
            </Text>
            <TouchableOpacity
              style={styles.successModalButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <FontAwesome name="check" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
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
    marginLeft: 10,
  },
  deleteAllButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 25,
    marginTop: 20,
    width: "60%",
    alignSelf: "center",
  },
  deleteAllButtonText: {
    color: "#FF3B30",
    fontSize: 12,
    fontWeight: "bold",
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
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
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
  },
  successModalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  successModalText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  successModalButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CD964",
    borderRadius: 30,
    width: 50,
    height: 50,
  },
});

export default SavedTranscriptionsScreen;
