import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function PaymentScreen(): JSX.Element {
    const [amount, setAmount] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handlePayment = async () => {
        try {
            const response = await fetch('http://YOUR_IP_ADDRESS:3000/payments/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, description }),
            });
            if (!response.ok) throw new Error();
            const data = await response.json();
            Alert.alert('Success', `Payment initiated. Visit: ${data.paymentUrl}`);
        } catch (error) {
            Alert.alert('Error', 'Failed to initiate payment');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Pay Now" onPress={handlePayment} />
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
