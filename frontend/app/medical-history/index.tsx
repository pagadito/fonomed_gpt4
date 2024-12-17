import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';

export default function MedicalHistoryScreen({ route }) {
    const { patientId } = route.params;
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await fetch(`http://YOUR_IP_ADDRESS:3000/medical-history/${patientId}`);
                if (!response.ok) throw new Error();
                const data = await response.json();
                setRecords(data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch medical history');
            }
        };

        fetchRecords();
    }, [patientId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Medical History</Text>
            <FlatList
                data={records}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>{`Diagnosis: ${item.diagnosis}`}</Text>
                        <Text>{`Treatment: ${item.treatment}`}</Text>
                        <Text>{`Date: ${item.date}`}</Text>
                    </View>
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
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
