import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import TranscriptionScreen from './screens/TranscriptionScreen';

export type RootStackParamList = {
  Home: undefined;
  Transcription: { transcription: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transcription" component={TranscriptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
