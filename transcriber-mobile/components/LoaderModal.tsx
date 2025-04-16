import React from "react";
import { Modal, View, Text, StyleSheet, ActivityIndicator } from "react-native";

interface LoaderModalProps {
  visible: boolean;
  message: string;
}

const LoaderModal: React.FC<LoaderModalProps> = ({ visible, message }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default LoaderModal;
