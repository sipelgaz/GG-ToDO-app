import React, { useState } from "react";
//import { Text, View, TextInput, Button,  } from "react-native";
import {Avatar, Button, Card, Text, TextInput} from "react-native-paper";
import {View, StyleSheet} from "react-native";

export default function Index() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Handle login logic here

        if (username === "" || password === "") {
            alert("Please enter a username and password.");
        }
        if (username.toLowerCase() === "admin" && password === "admin") { // hardcoded username and password
            alert("Admin login successful!");
        } else if (username.toLowerCase() === "user" && password === "user") { // hardcoded username and password
            alert("User login successful!");
        } else {
            alert("Invalid username or password.");
        }

        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Log In Screen</Text>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin}>
                Log In
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
    },
    input: {
        width: "100%",
        padding: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
    },
});