import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    ScrollView, // Ajouté pour gérer les écrans plus petits
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RechargeScreen = () => {
    const navigation = useNavigation();
    const [method, setMethod] = useState('mobile_money'); // Default value
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRecharge = async () => {
        setLoading(true);
        setError('');
        setSuccess(''); // Réinitialise le message de succès

        try {
            // **Important:** Remplacez 'https://example.com/recharge' par l'URL réelle de votre API
            const response = await axios.post('https://example.com/recharge', {
                method,
                amount: parseFloat(amount), // Convertir amount en nombre
            });

            if (response.status === 200) { // Vérifie le code de statut HTTP
                setSuccess('Recharge successful!');
                Alert.alert('Succès', 'Recharge effectuée avec succès.'); // Affiche une alerte
                navigation.goBack(); // Retour à l'écran précédent
            } else {
                setError(response.data.message || 'Recharge failed. Please try again.');
                Alert.alert('Erreur', response.data.message || 'Recharge failed.'); // Affiche une alerte
            }

        } catch (err) {
            console.error('Erreur lors de la recharge', err);
            setError('Recharge failed. Please try again.');
            Alert.alert('Erreur', 'Erreur lors de la recharge. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Recharge Account</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}
                {success ? <Text style={styles.success}>{success}</Text> : null}

                <View style={styles.methodSelector}>
                    <TouchableOpacity
                        style={[styles.methodButton, method === 'mobile_money' && styles.methodButtonActive]}
                        onPress={() => setMethod('mobile_money')}
                    >
                        <Text style={[styles.methodText, method === 'mobile_money' && styles.methodTextActive]}>Mobile Money</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.methodButton, method === 'card' && styles.methodButtonActive]}
                        onPress={() => setMethod('card')}
                    >
                        <Text style={[styles.methodText, method === 'card' && styles.methodTextActive]}>Card</Text>
                    </TouchableOpacity>
                    {/* Ajoutez d'autres méthodes de recharge ici */}
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.button} onPress={handleRecharge} disabled={loading}>
                    {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Recharge</Text>}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Couleur de fond plus claire
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    success: {
        color: 'green',
        marginBottom: 10,
        textAlign: 'center',
    },
    methodSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    methodButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#ddd', // Couleur de fond par défaut pour les boutons
    },
    methodButtonActive: {
        backgroundColor: '#007bff', // Couleur de fond lorsque le bouton est actif/sélectionné
    },
    methodText: {
        color: '#333', // Couleur du texte par défaut
    },
    methodTextActive: {
        color: 'white', // Couleur du texte lorsque le bouton est actif
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white', // Fond blanc pour les inputs
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RechargeScreen;