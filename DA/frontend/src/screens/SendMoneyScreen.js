import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Assurez-vous d'installer axios

const SendMoneyScreen = () => {
    const navigation = useNavigation();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendMoney = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://ton-api.com/api/send-money', { // Remplacez par votre URL
                recipient: recipient,
                amount: parseFloat(amount),
                note: note,
            });

            if (response.status === 200) {
                // Transfert réussi
                console.log('Transfert réussi', response.data);
                navigation.goBack(); // Revenir à l'écran précédent
            } else {
                setError(response.data.message || 'Erreur lors du transfert');
            }

        } catch (e) {
            console.error('Erreur lors du transfert', e);
            setError('Erreur lors du transfert. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Envoyer de l'Argent</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="Numéro de Téléphone / Identifiant du Bénéficiaire"
                    value={recipient}
                    onChangeText={setRecipient}
                    keyboardType="default"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Montant"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Note (Optionnel)"
                    value={note}
                    onChangeText={setNote}
                    multiline
                />

                <TouchableOpacity style={styles.button} onPress={handleSendMoney} disabled={loading}>
                    {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Envoyer</Text>}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#444',
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    }
});

export default SendMoneyScreen;