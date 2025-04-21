import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../App";
import AudioRecorder from "../components/AudioRecorder";
import AudioUploader from "../components/AudioUploader";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hasSavedTranscription, setHasSavedTranscription] = useState(false);

  useEffect(() => {
    const checkSavedTranscriptions = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        setHasSavedTranscription(keys.length > 0);
      } catch (error) {
        console.error("Erro ao verificar transcrições salvas:", error);
      }
    };

    checkSavedTranscriptions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transcreva seu Áudio</Text>
      <View style={styles.buttonsRow}>
        <AudioUploader />
        <AudioRecorder />
      </View>
      {/* {hasSavedTranscription && ( */}
        <TouchableOpacity
          style={styles.savedTranscriptionsButton}
          onPress={() => navigation.navigate("SavedTranscriptions")}
        >
          <FontAwesome name="file-text" size={20} color="#fff" />
          <Text style={styles.savedTranscriptionsButtonText}>
            Ver Transcrições Salvas
          </Text>
        </TouchableOpacity>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 60,
    textAlign: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "50%",
  },
  savedTranscriptionsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  savedTranscriptionsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default HomeScreen;
