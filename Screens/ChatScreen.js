import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import dB from "./firebase";

const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chats",
            headerBackTitleVisble: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        rounded
                        source={{
                            uri: messages[0]?.data.photoURL
                        }}
                    />
                    <Text
                        style={{
                            color: "#fff",
                            marginLeft: 10,
                            fontWeight: "700",
                            fontSize: 16,
                        }}
                    >
                        {route.params.chatName}
                    </Text>
                </View>
            ),

            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    {/* <AntDesign name="arrowleft" size={24} color="white" /> */}
                </TouchableOpacity>
            ),

            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 10,
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome
                            name="video-camera"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="phone" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, messages]);

    const sendMessage = async () => {
        Keyboard.dismiss();
        await dB.collection("chats").doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
            photoURL: auth?.currentUser?.photoURL,
        })
            .then(() => setInput(''))
            .catch(error => alert(error))
    };

    useEffect(() => {
        const unsubscribe = dB.collection('chats').doc(route.params.id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot =>
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })
                ))
            );
        return unsubscribe;
    }, [route])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={90}
                style={styles.container}
            >
                <TouchableWithoutFeedback>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }} >
                            {messages.map(({ id, data }) => (
                                data.email === auth?.currentUser.email ?
                                    (
                                        <View key={id} style={styles.reciever} >
                                            <Avatar
                                                position="absolute"
                                                rounded
                                                //web container
                                                containerStyle={{
                                                    position: "absolute",
                                                    bottom: -15,
                                                    right: -5
                                                }}
                                                size={30}
                                                source={{ uri: data.photoURL }}
                                                bottom={-15}
                                                right={-5}
                                            />
                                            <Text style={styles.reciverText}>{data.message} </Text>
                                        </View>)
                                    :
                                    (
                                        <View key={id} style={styles.sender}>
                                            <Avatar
                                                position="absolute"
                                                rounded
                                                size={30}
                                                source={{ uri: data.photoURL }}
                                                bottom={-15}
                                                right={-5}
                                            />
                                            <Text style={styles.senderText}>{data.message} </Text>
                                            <Text style={styles.senderName}>{data.displayName} </Text>
                                        </View>
                                    )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                placeholder="Signal Message"
                                style={styles.TextInput}
                            />

                            <TouchableOpacity
                                onPress={sendMessage}
                                activeOpacity={0.5}
                            >
                                <Ionicons
                                    name="send"
                                    size={24}
                                    color="#2B68E6"
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    senderText: {
        color: 'white',
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    TextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30,
    }
});
