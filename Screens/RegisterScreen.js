import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from './firebase'

const RegisterScreen = ({ navigation }) => {

    const [fullName, setfullName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [imageURL, setimageURL] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        });
    }, [navigation])

    const handleRegister = async () => {
        await auth.createUserWithEmailAndPassword(email, password).then(async (authUser) => {
            var user = authUser.user;
            await user.updateProfile({
                displayName: fullName,
                photoURL: imageURL || 'https://images.unsplash.com/photo-1545996124-0501ebae84d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
            });
        }).catch(err => err.message)
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50 }}>Create a Signal Account</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autoFocus
                    type='text'
                    value={fullName}
                    onChangeText={text => setfullName(text)}
                />
                <Input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={text => setemail(text)}
                />
                <Input
                    placeholder='password'
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => setpassword(text)}
                />
                <Input
                    placeholder='Image URL'
                    type='text'
                    value={imageURL}
                    onChangeText={text => setimageURL(text)}
                    onSubmitEditing={handleRegister}
                />
            </View>
            <Button
                raised
                title='Submit'
                onPress={handleRegister}
                containerStyle={styles.buttonStyle}
            />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
    buttonStyle: {
        width: 200,
        marginTop: 10
    }
})
