import React, { useState } from "react";
import { View, StyleSheet} from "react-native";
import { Card, Checkbox, Button } from "react-native-paper";
import {useRouter} from "expo-router";

const initialTasks = [
    { id: "1", title: "Task 1", day: "Monday", completed: false },
    { id: "2", title: "Task 2", day: "Tuesday", completed: false },
    { id: "3", title: "Task 3", day: "Wednesday", completed: false },
];

export default function TaskList() {
    const router = useRouter();

    const goToProfile = () => {
        router.push('profile');
    };

    const [tasks, setTasks] = useState(initialTasks);

    const toggleTaskCompletion = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const removeTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    console.log()


    return (
        <View style={styles.container}>
            {tasks.map((task) => (
                <Card key={task.id} style={styles.card}>
                    <Card.Title title={task.title} subtitle={task.day} />
                    <Card.Content>
                        <View style={styles.taskRow}>
                            <Checkbox
                                status={task.completed ? "checked" : "unchecked"}
                                onPress={() => toggleTaskCompletion(task.id)}
                            />
                            <Button onPress={() => removeTask(task.id)}>Remove</Button>
                        </View>
                    </Card.Content>
                </Card>
            ))}
            <Button mode="contained" onPress={goToProfile} style={styles.profileButton}>
                P
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginVertical: 8,
    },
    taskRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    profileButton: {
        position: "absolute",
        bottom: 16,
        left: 16,
    },
});