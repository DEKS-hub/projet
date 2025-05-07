import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateFields = () => {
    if (!fullName || !email || !phone || !password) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
      return false;
    }
    return true;
  };

  const handleSendCode = () => {
    if (!phone) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone valide.');
      return;
    }

    // Simule l'envoi du code
    console.log(`Code envoyé au ${phone}`);
    setIsCodeSent(true);
    Alert.alert('Code envoyé', 'Un code de vérification a été envoyé.');
  };

  const handleVerifyCode = async () => {
    if (!validateFields() || !verificationCode) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs et le code de vérification.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/register', {
        full_name: fullName,
        email: email,
        phone_number: phone,
        password: password,
        verification_code: verificationCode, // Envoyer le code au serveur pour vérification
      });

      Alert.alert('Succès', 'Compte créé avec succès !');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', error.response?.data?.message || 'Échec de l’inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      {!isCodeSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nom complet"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleSendCode}>
            <Text style={styles.buttonText}>Envoyer le code</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Code de vérification"
            keyboardType="number-pad"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Vérifier et s'inscrire</Text>
            )}
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Déjà un compte ? Connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: {
    backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16,
  },
  button: {
    backgroundColor: '#1E90FF', padding: 15, borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { marginTop: 20, color: '#1E90FF', textAlign: 'center' },
});
// Assurez-vous que votre backend est configuré pour accepter les requêtes et insérer les données dans la base de données.
// Le code pour insérer les données dans la base de données est déjà implémenté dans la fonction `handleVerifyCode`.
// La requête POST envoie les informations saisies (nom complet, email, téléphone, mot de passe) au backend via l'URL `http://127.0.0.1:3000/api/register`.


// Si vous avez besoin d'une autre fonctionnalité ou d'une modification spécifique, veuillez préciser.