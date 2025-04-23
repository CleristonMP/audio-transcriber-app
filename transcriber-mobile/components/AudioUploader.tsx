import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { uploadAudioAndGetTranscription } from "../services/audioService";
import { FontAwesome } from "@expo/vector-icons";
import LoaderModal from "./LoaderModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const AudioUploader = () => {
  const [file, setFile] =
    React.useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const pickDocument = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
      });
      setFile(response);

      if (!response.canceled) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Erro ao selecionar o arquivo:", error);
    }
  };

  const handleUpload = async () => {
    if (file && file.assets && file.assets[0]) {
      const selectedFile = file.assets[0];
      const audioFile = {
        uri: selectedFile.uri,
        name: selectedFile.name || "audio-file.aac",
        type: selectedFile.mimeType || "audio/aac",
      };

      try {
        setLoading(true);
        setLoadingMessage("Enviando arquivo...");
        await uploadAudioAndGetTranscription(audioFile, navigation);
        setLoadingMessage("Transcrevendo áudio...");
      } catch (error) {
        console.error("Erro ao enviar o arquivo:", error);
      } finally {
        setLoading(false);
        setModalVisible(false);
      }
    } else {
      console.error("Nenhum arquivo válido foi selecionado.");
    }
  };

  return (
    <View style={styles.container}>
      <LoaderModal visible={loading} message={loadingMessage} />
      <TouchableOpacity style={styles.button} onPress={pickDocument}>
        <FontAwesome name="folder" size={24} color="#fff" />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Deseja enviar o arquivo selecionado?
            </Text>
            {file && file.assets && file.assets[0] && (
              <Text style={styles.modalFileName}>{file?.assets[0].name}</Text>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleUpload}
              >
                <FontAwesome name="send" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setModalVisible(false)}
              >
                <FontAwesome name="times" size={24} color="#FF3B30" />
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
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF9500",
    alignItems: "center",
    justifyContent: "center",
  },
  fileName: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
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
  modalFileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

export default AudioUploader;
