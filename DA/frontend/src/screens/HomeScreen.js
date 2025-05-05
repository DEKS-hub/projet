import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Pour l'icône de paramètres
import { BarCodeScanner } from 'expo-barcode-scanner'; // Pour le scanner QR code

const logo = require('../assets/logo.png'); // Chemin vers ton logo

const HomeScreen = () => {
    const navigation = useNavigation();
    const [balance, setBalance] = useState(0); // Exemple de solde
    const [history, setHistory] = useState([]); // Exemple d'historique
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        // Simuler la récupération du solde et de l'historique
        // Remplacer par des appels API réels
        setTimeout(() => {
            setBalance(120000);
            setHistory([
                { id: 1, type: 'Retrait', date: '9 Juillet 2021', time: '8:50 AM', amount: -1000 },
                { id: 2, type: 'Dépôt', date: '7 Juillet 2021', time: '8:01 PM', amount: 10000 },
                { id: 3, type: 'À Mamadou Diop', date: '7 Juillet 2021', time: '6:01 PM', amount: -9000 },
                { id: 4, type: 'Dépôt', date: '6 Juillet 2021', time: '7:10 AM', amount: 15000 },
            ]);
        }, 500);

        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();

    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {/* En-tête */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('Profile')}>
                    <Feather name="settings" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.balance}>{balance.toLocaleString()}F</Text>
                <View style={styles.qrCodeContainer}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <TouchableOpacity style={styles.scannerButton} onPress={() => setScanned(false)}>
                        <Text style={styles.scannerText}>Scanner</Text>
                    </TouchableOpacity>
                </View>
                { <Image source={logo} style={styles.logo} /> }
            </View>

            {/* Actions Principales */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('SendMoney')}>
                    <Text style={styles.actionText}>TRANSFERT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Payments')}>
                    <Text style={styles.actionText}>PAIEMENTS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Credit')}>
                    <Text style={styles.actionText}>CRÉDIT</Text>
                </TouchableOpacity>
            </View>

            {/* Historique des Transactions */}
            <ScrollView style={styles.historyContainer}>
                {history.map(item => (
                    <View key={item.id} style={styles.historyItem}>
                        <View>
                            <Text style={styles.historyType}>{item.type}</Text>
                            <Text style={styles.historyDate}>{`${item.date} at ${item.time}`}</Text>
                        </View>
                        <Text style={[styles.historyAmount, item.amount < 0 ? styles.debit : styles.credit]}>
                            {item.amount.toLocaleString()}F
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    settingsIcon: {
        position: 'absolute',
        left: 0,
        top: 10,
    },
    balance: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    qrCodeContainer: {
        width: 200,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    scannerButton: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 5,
        borderRadius: 5,
    },
    scannerText: {
        color: 'white',
        fontSize: 12,
    },
    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    actionText: {
        color: '#333',
        fontWeight: 'bold',
    },
    historyContainer: {
        flex: 1,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
    historyType: {
        color: 'white',
    },
    historyDate: {
        color: '#999',
        fontSize: 12,
    },
    historyAmount: {
        color: 'white',
        fontWeight: 'bold',
    },
    debit: {
        color: 'red',
    },
    credit: {
        color: 'green',
    },
});

export default HomeScreen;