import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import CustomListItems from '../Components/CustomListItems';
// import { auth } from './firebase';
// import { getAuth, signOut } from 'firebase/auth';
import dB, { auth } from './firebase';


const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const unsubscribe = dB.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe;
    }, [])

    const signOutUser = () => {
        auth.signOut().then(() => {
            // console.log('User Signed Out');
        }).catch((error) => {
            // An error happened.
            console.log(error.message);
        });
        // auth.onAuthStateChanged((userCredentials) => {
        //     if (userCredentials) {

        //     } else {
        //         // history.push('/loginpage')
        //         // console.log('user is Signed Out from HEADER Component');
        //     }
        // });
        // signOut(auth).then(() => {
        //     // Sign-out successful.
        // }).catch((error) => {
        //     alert(error.message)
        // });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camera" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <SimpleLineIcons onPress={() => navigation.navigate('AddChat')} name="pencil" size={24} color="#000" />
                    </TouchableOpacity>

                </View>
            )
        })
    }, [])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItems key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
