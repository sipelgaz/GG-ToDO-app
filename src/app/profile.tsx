import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Card, Text, Button } from "react-native-paper";

export default function Profile() {
    const handleLogout = () => {
        // Handle logout logic here
        alert("Logged out successfully!");
    };

    return (
        <View style={styles.container}>
            <Card>
                <Card.Title
                    title="John Doe"
                    subtitle="johndoe@example.com"
                    left={(props) => <Avatar.Icon {...props} icon="account" />}
                />
                <Card.Content>
                    <Text variant="bodyMedium">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </Text>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={handleLogout}>
                        Logout
                    </Button>
                </Card.Actions>
            </Card>
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
});