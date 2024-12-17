import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import {useRouter} from "expo-router";

export default function DashboardScreen() {
    const [appointments, setAppointments] = useState([]);
    const router = useRouter();

    // Fetch appointments on mount
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://YOUR_IP_ADDRESS:3000/appointments');
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text>{`Date: ${item.date}`}</Text>
                        <Text>{`Time: ${item.time}`}</Text>
                    </View>
                )}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="New Appointment"
                    onPress={() => router.navigate('../appointments/new-appointment')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={() => router.navigate('../auth/login')} />
            </View>
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
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonContainer: {
        marginTop: 10,
    },
});
