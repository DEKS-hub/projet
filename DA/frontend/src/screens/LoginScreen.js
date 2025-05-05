import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://ton-api.com/api/login', { // Remplace par ton URL
        identifier: identifier,
        password: password,
      });
      setLoading(false);
      if (response.data.token) {
        // Stocker le token (par exemple, avec AsyncStorage) pour les prochaines requêtes
        console.log('Connexion réussie:', response.data);
        navigation.navigate('Home');
      } else {
        Alert.alert('Erreur', response.data.message || 'Identifiant ou mot de passe incorrect.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Erreur de connexion:', error.response ? error.response.data : error.message);
      Alert.alert('Erreur', error.response?.data?.message || 'Erreur lors de la connexion. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Téléphone ou Email"
        value={identifier}
        onChangeText={setIdentifier}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Se connecter</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.link}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ /* ... styles ... */ });