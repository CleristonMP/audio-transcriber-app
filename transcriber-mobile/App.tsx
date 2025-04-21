import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TranscriptionScreen from './screens/TranscriptionScreen';
import SavedTranscriptionsScreen from './screens/SavedTranscriptionsScreen';

export type RootStackParamList = {
  Home: undefined;
  Transcription: { transcription: string, id: string };
  SavedTranscriptions: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transcription" component={TranscriptionScreen} />
        <Stack.Screen name="SavedTranscriptions" component={SavedTranscriptionsScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
