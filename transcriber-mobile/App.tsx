import React, { useRef, useState } from "react";
import { DrawerLayoutAndroid, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import TranscriptionScreen from "./screens/TranscriptionScreen";
import SavedTranscriptionsScreen from "./screens/SavedTranscriptionsScreen";
import DrawerContent from "./components/DrawerContent";

export type RootStackParamList = {
  Home: undefined;
  Transcription: { transcription: string; id: string };
  SavedTranscriptions: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition] = useState<"left" | "right">("left");

  const openDrawer = () => {
    drawer.current?.openDrawer();
  };

  const closeDrawer = () => {
    drawer.current?.closeDrawer();
  };

  const navigationView = () => <DrawerContent closeDrawer={closeDrawer} />;

  return (
    <NavigationContainer>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} openDrawer={openDrawer} />}
          </Stack.Screen>

          <Stack.Screen name="Transcription">
            {(props) => (
              <TranscriptionScreen {...props} openDrawer={openDrawer} />
            )}
          </Stack.Screen>

          <Stack.Screen name="SavedTranscriptions">
            {(props) => (
              <SavedTranscriptionsScreen {...props} openDrawer={openDrawer} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </DrawerLayoutAndroid>
    </NavigationContainer>
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
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
});

export default App;
