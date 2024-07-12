import React, {useContext, useState} from "react";
import { Button, Text, TextInput} from "react-native-paper";
import {View, StyleSheet} from "react-native";
import {useRouter} from "expo-router";
import {IUser} from "@/src/domain/IUser";
import {UserContext} from "@/src/app/_layout";

export default function Index() {
    const router = useRouter();
    const { activeUser, setActiveUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const adminUser: IUser = {
        id: "1",
        name: "Master Admin",
        email: "admin@notdomain.xyz",
        isAdmin: true,
    };
    const regularUser: IUser = {
        id: "2",
        name: "Simple Joe",
        email: "joe@notdomain.xyz",
        isAdmin: false,
    };

    // let activeUser: IUser | null = null; // Change this to adminUser to test admin login



    const handleLogin = () => {
        // Handle login logic here

        if (username === "" || password === "") {
            alert("Please enter a username and password.");
        } else if (username.toLowerCase() === "admin" && password === "admin") { // hardcoded username and password

            setActiveUser!(adminUser);
            // setActiveUser ? setActiveUser(adminUser) : null;

            router.push("taskList");
        } else if (username.toLowerCase() === "user" && password === "user") { // hardcoded username and password
            setActiveUser!(regularUser);
            router.push("/taskList");
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

// export default Index;