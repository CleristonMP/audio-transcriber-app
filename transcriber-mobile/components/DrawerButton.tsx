import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface DrawerButtonProps {
  onPress: () => void;
}

const DrawerButton: React.FC<DrawerButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <FontAwesome name="bars" size={24} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 30,
    left: 20,
    borderRadius: 30,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});

export default DrawerButton;
