import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';

export default function AdminPanelScreen() {
    const [stats, setStats] = useState({});
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch statistics
        const fetchStats = async () => {
            try {
                const response = await fetch('http://YOUR_IP_ADDRESS:3000/admin/stats');
                if (!response.ok) throw new Error();
                const data = await response.json();
                setStats(data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch statistics');
            }
        };

        // Fetch users
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://YOUR_IP_ADDRESS:3000/admin/users');
                if (!response.ok) throw new Error();
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch users');
            }
        };

        // Fetch appointments
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://YOUR_IP_ADDRESS:3000/admin/appointments');
                if (!response.ok) throw new Error();
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch appointments');
            }
        };

        fetchStats();
        fetchUsers();
        fetchAppointments();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Panel</Text>
            <Text>Total Users: {stats.totalUsers}</Text>
            <Text>Active Appointments: {stats.activeAppointments}</Text>

            <Text style={styles.subtitle}>Users</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{`${item.name} - ${item.email}`}</Text>
                )}
            />

            <Text style={styles.subtitle}>Appointments</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{`${item.title} - ${item.date}`}</Text>
                )}
            />
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
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
});
