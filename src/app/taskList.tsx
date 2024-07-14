import React, {createContext, useContext, useState} from "react";
import { View, StyleSheet} from "react-native";
import {Card, Checkbox, Button, Title, Avatar} from "react-native-paper";
import {useRouter} from "expo-router";
import {ITask} from "@/src/domain/ITask";
import dayjs from 'dayjs';
import {IUser} from "@/src/domain/IUser";
import {TaskContext, UserContext} from "@/src/app/_layout";

const initialTasks = [
    { id: "1", title: "Task 1", day: "Monday", completed: false },
    { id: "2", title: "Task 2", day: "Tuesday", completed: false },
    { id: "3", title: "Task 3", day: "Wednesday", completed: false },
];

const initialTaskList:ITask[] = [
    {
        id: "1",
        title: 'Complete project',
        description: 'Finish the task by the deadline',
        location: 'Tallinn, Estonia',
        date: dayjs().add(7,"day"), // Initialize with a Day.js date,
        completed: false,
    },
    {
        id: "2",
        title: 'Prepare coffee',
        description: 'Need coffee?',
        location: 'Tallinn, Estonia',
        date: dayjs().add(2, "day"), // Initialize with a Day.js date
        completed: false,
    },
    {
        id: "3",
        title: 'Pay taxes',
        description: 'Don\'t forget to pay taxes',
        location: 'Tallinn, Estonia',
        date: dayjs().add(4, "day"), // Initialize with a Day.js date
        completed: false,
    }
];

// Function to sort tasks by date
const sortTasksByDate = (tasks: ITask[]) => {
    return tasks.sort((a, b) => a.date.diff(b.date));
};

export default function TaskList() {
    const router = useRouter();
    const { activeUser, setActiveUser } = useContext(UserContext);
    const { activeTask, setActiveTask } = useContext(TaskContext);
    const [tasks, setTasks] = useState(sortTasksByDate(initialTaskList));

    const goToProfile = () => {
        router.push('profile');
    };

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

    const handleAddTask = () => {
        router.push('/taskForm');
    };

    const handleEditTask = (task: ITask) => {
        setActiveTask!(task);
        router.push(`/taskForm`);
    };

    console.log()


    return (
        <View style={styles.container}>
            {tasks.map((task) => (
                <Card key={task.id} style={styles.card} onPress={() => handleEditTask(task)}>
                    <Card.Content  >
                        <View style={styles.taskRow}>
                            {activeUser?.isAdmin && (
                            <Checkbox
                                status={task.completed ? "checked" : "unchecked"}
                                onPress={() => toggleTaskCompletion(task.id)}
                                disabled={!activeUser?.isAdmin}
                            />)}
                            <Title style={styles.taskTitle}>{task.title}</Title>
                            {activeUser?.isAdmin && (
                            <Button icon="trash-can"
                                    onPress={() => removeTask(task.id!)}
                                    disabled={!activeUser?.isAdmin}
                            >{""}</Button>)}
                        </View>
                    </Card.Content>
                </Card>
            ))}
            <Button mode="contained"
                    onPress={goToProfile}
                    style={styles.profileButton}
                    icon={() => (
                        <Avatar.Icon
                            size= {50}
                            icon="account"
                            color="red"
                            style={{ marginLeft: 15 }} // Adjust spacing as needed
                        />
                    )}
            >{""}</Button>
            {activeUser?.isAdmin && (
            <Button mode="contained"
                    onPress={handleAddTask}
                    style={styles.addButton}
                    icon={() => (
                        <Avatar.Icon
                            size= {50}
                            icon="plus"
                            color="red"
                            style={{ marginLeft: 15 }} // Adjust spacing as needed
                        />
                    )}
                    disabled={!activeUser?.isAdmin}
            >{""}
            </Button>)}

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
    taskTitle: {
        flex: 1,
    },
    profileButton: {
        position: "absolute",
        bottom: 16,
        left: 16,
        width: 50,
    },
    addButton: {
        position: "absolute",
        bottom: 16,
        right: 16,
        width: 50,
    },
});