import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function EditAppointmentScreen({ route, navigation }) {
    const { appointmentId, existingData } = route.params;
    const [title, setTitle] = useState(existingData.title);
    const [date, setDate] = useState(existingData.date);
    const [time, setTime] = useState(existingData.time);

    const handleUpdateAppointment = async () => {
        try {
            const response = await fetch(`http://YOUR_IP_ADDRESS:3000/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, date, time }),
            });
            if (!response.ok) throw new Error();
            Alert.alert('Success', 'Appointment updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to update appointment');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Appointment</Text>
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
            <Button title="Update Appointment" onPress={handleUpdateAppointment} />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        fontSize: 16,
    },
});
