import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AudioRecorder from './components/AudioRecorder';
import AudioUploader from './components/AudioUploader';

export default function App() {
  return (
    <View style={styles.container}>
      <AudioRecorder />
      <AudioUploader />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
