import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddMedicalHistoryScreen({ route, navigation }) {
    const { patientId, doctorId } = route?.params || {};
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');

    const handleAddRecord = async () => {
        try {
            const response = await fetch('http://YOUR_IP_ADDRESS:3000/medical-history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ patientId, doctorId, diagnosis, treatment }),
            });
            if (!response.ok) throw new Error();
            Alert.alert('Success', 'Medical record added successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to add medical record');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Medical Record</Text>
            <TextInput
                style={styles.input}
                placeholder="Diagnosis"
                value={diagnosis}
                onChangeText={setDiagnosis}
            />
            <TextInput
                style={styles.input}
                placeholder="Treatment"
                value={treatment}
                onChangeText={setTreatment}
            />
            <Button title="Add Record" onPress={handleAddRecord} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
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
