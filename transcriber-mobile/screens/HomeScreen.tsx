import React from 'react';
import { View, StyleSheet } from 'react-native';
import AudioRecorder from '../components/AudioRecorder';
import AudioUploader from '../components/AudioUploader';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <AudioRecorder />
            <AudioUploader />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

export default HomeScreen;