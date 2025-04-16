import { useEffect, useState } from "react";
import { StyleSheet, Alert, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import AudioRecorder from "../components/AudioRecorder";
import AudioUploader from "../components/AudioUploader";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hasSavedTranscription, setHasSavedTranscription] = useState(false);

  useEffect(() => {
    const checkSavedTranscription = async () => {
      try {
        const savedTranscription = await AsyncStorage.getItem("transcription");
        setHasSavedTranscription(!!savedTranscription);
      } catch (error) {
        console.error("Erro ao verificar transcrição salva:", error);
      }
    };

    checkSavedTranscription();
  }, []);

  const handleNavigateToTranscription = async () => {
    try {
      const savedTranscription = await AsyncStorage.getItem("transcription");
      if (savedTranscription) {
        navigation.navigate("Transcription", {
          transcription: savedTranscription,
        });
      } else {
        Alert.alert("Aviso", "Nenhuma transcrição salva encontrada.");
      }
    } catch (error) {
      console.error("Erro ao navegar para a tela de transcrição:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
  });

  return (
    <View style={styles.container}>
      <AudioRecorder />
      <AudioUploader />
      {hasSavedTranscription && (
        <Button
          title="Continuar Transcrição"
          onPress={handleNavigateToTranscription}
        />
      )}
    </View>
  );
};

export default HomeScreen;
