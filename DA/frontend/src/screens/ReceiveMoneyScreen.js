import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Assurez-vous d'installer react-native-qrcode-svg
import axios from 'axios'; // Assurez-vous d'installer axios

const ReceiveMoneyScreen = () => {
    const [userId, setUserId] = useState(''); // Ou un identifiant unique
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simuler la récupération de l'identifiant de l'utilisateur depuis l'API
        // Remplacer par un appel API réel
        setTimeout(() => {
            setUserId('user12345'); // Exemple d'identifiant
            setLoading(false);
        }, 500);
    }, []);

    const handleCopyId = () => {
        Clipboard.setString(userId);
        Alert.alert('Identifiant Copié', 'L\'identifiant a été copié dans le presse-papiers.');
    };

    if (loading) {
        return <View style={styles.loadingContainer}><ActivityIndicator size="large" color="white" /></View>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recevoir de l'Argent</Text>

            <View style={styles.qrCodeContainer}>
                {userId ? <QRCode value={userId} size={200} /> : null}
            </View>

            <Text style={styles.idLabel}>Votre Identifiant Unique :</Text>
            <TouchableOpacity onPress={handleCopyId}>
                <Text style={styles.userId}>{userId}</Text>
            </TouchableOpacity>

            <Text style={styles.instructions}>
                Partagez cet identifiant ou le code QR avec la personne qui doit vous envoyer de l'argent.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    qrCodeContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    idLabel: {
        color: '#999',
        fontSize: 16,
        marginBottom: 5,
    },
    userId: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    instructions: {
        color: '#999',
        textAlign: 'center',
    },
});

export default ReceiveMoneyScreen;