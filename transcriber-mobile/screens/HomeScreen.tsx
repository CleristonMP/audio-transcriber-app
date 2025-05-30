import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../App";
import AudioRecorder from "../components/AudioRecorder";
import AudioUploader from "../components/AudioUploader";
import DrawerButton from "../components/DrawerButton";
import HelpButton from "../components/HelpButton";
import helpTexts from "../assets/helpTexts.json";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  openDrawer: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ openDrawer }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hasSavedTranscription, setHasSavedTranscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const recorderPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkSavedTranscriptions = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        setHasSavedTranscription(keys.length > 0);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível verificar as transcrições salvas.");
        console.error("Erro ao verificar transcrições salvas:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSavedTranscriptions();
  }, []);

  const navigateToTranscription = () => {
    navigation.navigate("SavedTranscriptions");
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    Animated.timing(recorderPosition, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleStopRecording = () => {
    Animated.timing(recorderPosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsRecording(false));
  };

  const recorderStyle = {
    transform: [
      {
        translateX: recorderPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 10],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <DrawerButton onPress={openDrawer} />
      <HelpButton
        title={helpTexts.home.title}
        description={helpTexts.home.description}
        items={helpTexts.home.items}
      />
      <Text style={styles.title}>Transcreva seu Áudio</Text>
      <View style={styles.buttonsRow}>
        {!isRecording && <AudioUploader />}
        <Animated.View style={[styles.recorderContainer, recorderStyle]}>
          <AudioRecorder
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        </Animated.View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        hasSavedTranscription && (
          <TouchableOpacity
            style={styles.savedTranscriptionsButton}
            onPress={navigateToTranscription}
            accessibilityLabel="Ver Transcrições Salvas"
            accessibilityHint="Navega para a tela de transcrições salvas"
          >
            <FontAwesome name="file-text" size={20} color="#fff" />
            <Text style={styles.savedTranscriptionsButtonText}>
              Ver Transcrições Salvas
            </Text>
          </TouchableOpacity>
        )
      )}
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
  recorderContainer: {
    flex: 1,
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
