import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import SendMoneyScreen from '../screens/SendMoneyScreen';
import ReceiveMoneyScreen from '../screens/ReceiveMoneyScreen';
import RechargeScreen from '../screens/RechargeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SendMoney" component={SendMoneyScreen} />
                <Stack.Screen name="ReceiveMoney" component={ReceiveMoneyScreen} />
                <Stack.Screen name="Recharge" component={RechargeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;