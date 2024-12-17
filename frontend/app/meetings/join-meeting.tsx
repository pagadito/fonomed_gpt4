import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

export default function VideoCallScreen() {
    const [meetingDetails, setMeetingDetails] = useState(null);

    const handleCreateMeeting = async () => {
        try {
            const response = await fetch('http://YOUR_IP_ADDRESS:3000/meetings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: 'Consulta Médica' }),
            });
            if (!response.ok) throw new Error();
            const data = await response.json();
            setMeetingDetails(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to create a meeting');
        }
    };

    const handleJoinMeeting = () => {
        if (meetingDetails) {
            Alert.alert('Join Meeting', `Meeting URL: ${meetingDetails.joinUrl}`);
        } else {
            Alert.alert('Error', 'No meeting details available');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Video Call</Text>
            {meetingDetails ? (
                <View>
                    <Text>Meeting ID: {meetingDetails.meetingId}</Text>
                    <Text>Password: {meetingDetails.password}</Text>
                    <View style={styles.buttonSpacer} />
                    <Button title="Join Meeting" onPress={handleJoinMeeting} />
                </View>
            ) : (
                <Button title="Create Meeting" onPress={handleCreateMeeting} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonSpacer: {
        height: 10,
    },
});
