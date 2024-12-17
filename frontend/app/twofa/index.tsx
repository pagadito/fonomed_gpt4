import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function TwoFactorAuthScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const sendCode = async () => {
        try {
            const response = await fetch('http://YOUR_IP_ADDRESS:3000/auth/generate-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) throw new Error();
            setIsCodeSent(true);
            Alert.alert('Success', '2FA code sent to your email');
        } catch (error) {
            Alert.alert('Error', 'Failed to send 2FA code');
        }
    };

    const verifyCode = async () => {
        try {
            const response = await fetch('http://YOUR_IP_ADDRESS:3000/auth/verify-2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });
            if (!response.ok) throw new Error();
            Alert.alert('Success', '2FA verified successfully');
            navigation.navigate('Dashboard');
        } catch (error) {
            Alert.alert('Error', 'Invalid 2FA code');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
                editable={!isCodeSent}
            />
            {isCodeSent && (
                <TextInput
                    style={styles.input}
                    placeholder="Enter the 2FA code"
                    value={code}
                    keyboardType="numeric"
                    onChangeText={setCode}
                />
            )}
            <Button
                title={isCodeSent ? 'Verify Code' : 'Send Code'}
                onPress={isCodeSent ? verifyCode : sendCode}
            />
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
