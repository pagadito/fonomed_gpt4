import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AchievementsScreen() {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await axios.get('http://localhost:3000/achievements');
                setAchievements(response.data);
            } catch (error) {
                console.error('Error fetching achievements:', error);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Achievements</Text>
            <FlatList
                data={achievements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text>{`Points: ${item.points}`}</Text>
                        <Text>{`Date: ${item.date}`}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    card: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8 },
    cardTitle: { fontSize: 18, fontWeight: 'bold' },
});
