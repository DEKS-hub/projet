import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TransferScreen from './src/screens/TransferScreen';
import BillPaymentScreen from './src/screens/PaymentScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import QRScreen from './src/screens/QRScreen';
import LoyaltyScreen from './src/screens/LoyaltyScreen';
import SupportScreen from './src/screens/SupportScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="BillPayment" component={BillPaymentScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="QR" component={QRScreen} />
        <Stack.Screen name="Loyalty" component={LoyaltyScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
