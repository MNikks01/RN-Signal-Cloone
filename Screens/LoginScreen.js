import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Image, Input } from 'react-native-elements'
import { auth } from './firebase'
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {

    const [inputEmail, setinputEmail] = useState('')
    const [inputPassword, setinputPassword] = useState('')

    useEffect(() => {
        // const unSubscribe = onAuthStateChanged((user) => {
        //     if (user) {
        //         navigation.replace('Home');
        //         // User is signed in, see docs for a list of available properties
        //         // https://firebase.google.com/docs/reference/js/firebase.User
        //         // const uid = user.uid;
        //         // ...
        //     } else {
        //     }
        // });

        const unSubscribe = auth.onAuthStateChanged((userCredentials) => {
            if (userCredentials) {
                // // var uid = userCredentials.uid;
                // console.log('userCredentials', userCredentials);
                // handleChangeRedirect(userCredentials)
                navigation.replace('Home');
            } else {
                // User is signed out
            }
        });
        return unSubscribe;
    }, [navigation])

    const SignIn = () => {
        auth.signInWithEmailAndPassword(inputEmail, inputPassword).catch(error => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            {/* this includers the status bar inside the app and makes text color of all the icons white */}
            <Image
                source={{
                    uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png'
                }}
                style={{ width: 200, height: 200 }}
            />
            <View style={styles.inputContainer}>
                <Input
                    type='outline'
                    placeholder='Email'
                    autoFocus
                    type='email'
                    value={inputEmail}
                    onChangeText={text => setinputEmail(text)}
                // leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                />
                <Input
                    placeholder='password'
                    secureTextEntry
                    type='password'
                    value={inputPassword}
                    onChangeText={text => setinputPassword(text)}
                    onSubmitEditing={SignIn}
                // leftIcon={{ type: 'font-awesome', name: 'unlock-alt' }}
                />
            </View>
            <Button containerStyle={styles.button} onPress={SignIn} title='Login' />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} type='outline' title='Register' />
            {/* <View style={{ height: 100 }} /> */}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
