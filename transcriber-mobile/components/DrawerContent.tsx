import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../App";

interface DrawerContentProps {
  closeDrawer: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ closeDrawer }) => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  return (
    <View style={styles.navigationContainer}>
      <Text style={styles.drawerHeaderText}>Menu</Text>
      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          closeDrawer();
          navigation.navigate("Home");
        }}
      >
        <FontAwesome name="home" size={20} color="#007AFF" />
        <Text style={styles.drawerButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          closeDrawer();
          navigation.navigate("SavedTranscriptions");
        }}
      >
        <FontAwesome name="file-text" size={20} color="#007AFF" />
        <Text style={styles.drawerButtonText}>Transcrições Salvas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    paddingTop: 62,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    paddingLeft: 16,
  },
  drawerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  drawerButtonText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
});

export default DrawerContent;
