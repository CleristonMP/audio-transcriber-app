import { Audio } from "expo-av";
import React, { useState } from "react";
import { Animated, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { uploadAudioAndGetTranscription } from "../services/audioService";
import { getFileFromUri } from "../utils/fileUtils";
import LoaderModal from "./LoaderModal";
import ErrorModal from "./ErrorModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";

const AudioRecorder = ({ onStartRecording, onStopRecording }: { onStartRecording: () => void; onStopRecording: () => void }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      onStartRecording();
      startPulsing();
      startRecording();
    } else {
      onStopRecording();
      stopRecording();
      stopPulsing();
    }
  };

  const startPulsing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulsing = () => {
    pulseAnim.setValue(1);
    Animated.loop(Animated.timing(pulseAnim, { toValue: 1, duration: 0, useNativeDriver: true })).stop();
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        setErrorMessage("Permissão negada!");
        setErrorModalVisible(true);
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      setErrorMessage("Erro ao iniciar gravação");
      setErrorModalVisible(true);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      const status = await recording.getStatusAsync();
      if (status.durationMillis < 1000) {
        setErrorMessage("O áudio gravado é muito curto. Tente novamente.");
        setErrorModalVisible(true);
        await recording.stopAndUnloadAsync();
        setRecording(null);
        return;
      }

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists || fileInfo.size === 0) {
          setErrorMessage("O áudio gravado está vazio ou não foi encontrado. Tente novamente.");
          setErrorModalVisible(true);
          return;
        }

        try {
          const audioFile = await getFileFromUri(uri, "recording.wav");
          setLoading(true);
          setLoadingMessage("Processando áudio...");
          await uploadAudioAndGetTranscription(audioFile, navigation)
            .then(() => {
              setLoadingMessage("Recebendo transcrição...");
            })
            .finally(() => {
              setLoading(false);
            });
        } catch (error) {
          setErrorMessage("Erro ao processar o arquivo de áudio.");
          setErrorModalVisible(true);
        }
      } else {
        setErrorMessage("Erro ao salvar áudio.");
        setErrorModalVisible(true);
      }
    } catch (error) {
      setErrorMessage("Erro ao finalizar gravação.");
      setErrorModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <LoaderModal visible={loading} message={loadingMessage} />
      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onClose={() => setErrorModalVisible(false)}
      />
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity
          style={[styles.button, isRecording && styles.recordingButton]}
          onPress={toggleRecording}
        >
          <FontAwesome
            name={isRecording ? "stop" : "microphone"}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </Animated.View>
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
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  recordingButton: {
    backgroundColor: "#FF3B30",
  },
});

export default AudioRecorder;
