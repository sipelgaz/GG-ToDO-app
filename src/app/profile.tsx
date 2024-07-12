import React, {useContext} from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text, Button } from "react-native-paper";
import {useRouter} from "expo-router";
import {UserContext} from "@/src/app/_layout";

export default function Profile() {
    const router = useRouter();
    const { activeUser, setActiveUser } = useContext(UserContext);
    const handleLogout = () => {
        setActiveUser ? setActiveUser(null) : null;
        router.push("/");

        alert("Logged out successfully!");
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    title="Name"
                    left={(props) => <Avatar.Icon {...props} icon="account" />}
                />
                <Card.Content>
                    <Text variant="bodyMedium">{activeUser?.name}</Text>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Title
                    title="Email"
                    left={(props) => <Avatar.Icon {...props} icon="email" />}
                />
                <Card.Content>
                    <Text variant="bodyMedium">{activeUser?.email}</Text>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Title
                    title="User Role"
                    left={(props) => <Avatar.Icon {...props} icon="account-check" />}
                />
                <Card.Content>
                    <Text variant="bodyMedium">{activeUser?.isAdmin ? "Admin" : "User"}</Text>
                </Card.Content>
            </Card>
            <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
                Logout
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
        card: {
            width: "100%",
            marginVertical: 8,
        },
        logoutButton: {
            position: "absolute",
            bottom: 16,
            width: "90%",
            padding: 16,
        },
});