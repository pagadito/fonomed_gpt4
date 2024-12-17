import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { ZoomVideoSdk } from '@zoom/videosdk';
import { ZOOM_CONFIG } from './zoomConfig';

export default function ZoomCallScreen({ route }) {
    const { meetingId, password } = route.params;

    useEffect(() => {
        // Initialize the Zoom SDK
        try {
            ZoomVideoSdk.init({
                sdkKey: ZOOM_CONFIG.appKey,
                sdkSecret: ZOOM_CONFIG.appSecret,
                logLevel: 'info',
            });
        } catch (error) {
            console.error('Zoom SDK initialization failed', error);
        }
    }, []);

    const joinMeeting = async () => {
        try {
            const client = ZoomVideoSdk.createClient();
            await client.join({
                sessionName: meetingId,
                sessionPassword: password,
                userName: 'User Display Name', // Replace with the actual user name
            });
            Alert.alert('Success', 'Joined the meeting!');
        } catch (error) {
            Alert.alert('Error', 'Failed to join the meeting');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Join Zoom Meeting" onPress={joinMeeting} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
});
