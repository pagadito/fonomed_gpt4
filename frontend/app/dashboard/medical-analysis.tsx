import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function MedicalAnalysisScreen(): JSX.Element {
    const [features, setFeatures] = useState<number[]>([]);

    const handleInputChange = (index: number, value: string) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = parseFloat(value) || 0;
        setFeatures(updatedFeatures);
    };

    const handlePredict = async () => {
        try {
            const response = await fetch('http://YOUR_IP_ADDRESS:3000/ai/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ features }),
            });
            if (!response.ok) throw new Error();
            const data: { prediction: string } = await response.json();
            Alert.alert('Prediction', `Risk: ${data.prediction}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to get prediction');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter feature 1"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange(0, value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter feature 2"
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange(1, value)}
            />
            {/* Add more inputs as needed */}
            <Button title="Predict Risk" onPress={handlePredict} />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        fontSize: 16,
    },
});
