import { Audio } from "expo-av";
import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { uploadAudioAndGetTranscription } from "../services/audioService";
import { getFileFromUri } from "../utils/fileUtils";
import LoaderModal from "./LoaderModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const AudioRecorder = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startPulsing();
      startRecording();
    } else {
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
        setMessage("Permissão negada!");
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      setMessage("Erro ao iniciar gravação");
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (uri) {
        try {
          const audioFile = await getFileFromUri(uri, "recording.wav");
          setLoading(true);
          setLoadingMessage("Processando áudio...");
          await uploadAudioAndGetTranscription(audioFile, navigation)
            .then(() => {
              setLoadingMessage("Recebendo transcrição...");
            }).finally(() => {
              setLoading(false);
            })
        } catch (error) {
          setMessage("Erro ao processar o arquivo de áudio.");
          console.error(error);
        }
      } else {
        setMessage("Erro ao salvar áudio");
      }
    } catch (error) {
      setMessage("Erro ao finalizar gravação");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <LoaderModal visible={loading} message={loadingMessage} />
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
      <Text>{message}</Text>
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
