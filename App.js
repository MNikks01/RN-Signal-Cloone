// import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import AddChatScreen from './Screens/AddChatScreen';
import ChatScreen from './Screens/ChatScreen';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2C6BED' }, // header background color to blue
  headerTitleStyle: { color: 'white', alignSelf: 'center' }, // header title color to white
  headerTintColor: 'white', //any header icon color to white
  gestureEnabled: true
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName='Home'
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen options={{ title: 'User Login' }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
