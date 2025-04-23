import React, { RefObject } from "react";
import { View, Text, Button, StyleSheet, DrawerLayoutAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

interface DrawerContentProps {
  closeDrawer: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ closeDrawer }) => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  return (
    <View style={[styles.navigationContainer]}>
      <Text style={styles.drawerHeaderText}>Navegação</Text>
      <Button
        title="Home"
        onPress={() => {
          closeDrawer();
          navigation.navigate("Home");
        }}
      />
      <Button
        title="Transcrições Salvas"
        onPress={() => {
          closeDrawer();
          navigation.navigate("SavedTranscriptions")
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default DrawerContent;
