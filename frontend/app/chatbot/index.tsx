import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function ChatbotScreen(): JSX.Element {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const handleAsk = async () => {
        try {
            const response = await fetch('http://YOUR_IP_ADDRESS:3000/chatbot/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
            });
            if (!response.ok) throw new Error();
            const data: { answer: string } = await response.json();
            setAnswer(data.answer);
        } catch (error) {
            setAnswer('Error getting response from chatbot');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Ask a medical question"
                value={question}
                onChangeText={setQuestion}
            />
            <Button title="Ask" onPress={handleAsk} />
            {answer ? <Text style={styles.answer}>{answer}</Text> : null}
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        fontSize: 16,
    },
    answer: {
        marginTop: 20,
        fontSize: 16,
        color: '#333',
    },
});
