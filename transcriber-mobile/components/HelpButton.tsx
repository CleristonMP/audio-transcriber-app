import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Modal, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface HelpButtonProps {
  title: string;
  description: string;
  items?: string[];
}

const HelpButton: React.FC<HelpButtonProps> = ({ title, description, items }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="question-circle" size={24} color="#212121" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
            {items && (
              <View style={styles.listContainer}>
                {items.map((item, index) => (
                  <Text key={index} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </View>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="check" size={20} color="#168208" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  helpButton: {
    position: "absolute",
    top: 40,
    right: 20,
    borderRadius: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  listContainer: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  closeButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#168208",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HelpButton;
