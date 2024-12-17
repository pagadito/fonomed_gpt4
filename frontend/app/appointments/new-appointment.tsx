import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter  } from 'expo-router';


export default function NewAppointmentScreen() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const router = useRouter();

    const handleCreateAppointment = async () => {
        try {
            const response = await fetch('http://YOUR_IP_ADDRESS:3000/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, date, time }),
            });
            if (!response.ok) throw new Error();
            Alert.alert('Success', 'Appointment created successfully');
            router.navigate('../dashboard');
        } catch (error) {
            Alert.alert('Error', 'Failed to create appointment');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>New Appointment</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Date (YYYY-MM-DD)"
                value={date}
                onChangeText={setDate}
            />
            <TextInput
                style={styles.input}
                placeholder="Time (HH:MM)"
                value={time}
                onChangeText={setTime}
            />
            <Button title="Create Appointment" onPress={handleCreateAppointment} />
            <View style={styles.buttonSpacer} />
            <Button title="Back to Dashboard" onPress={() => router.navigate('../dashboard')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        fontSize: 16,
    },
    buttonSpacer: {
        height: 10,
    },
});
