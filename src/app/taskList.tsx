import React, {createContext, useContext, useEffect, useState} from "react";
import { View, StyleSheet} from "react-native";
import {Card, Checkbox, Button, Title, Avatar} from "react-native-paper";
import {useRouter} from "expo-router";
import {ITask} from "@/src/domain/ITask";
import dayjs from 'dayjs';
import {IUser} from "@/src/domain/IUser";
import {ActiveTaskContext, TasksContext, UserContext} from "@/src/app/_layout";
import Uuid from "expo-modules-core/src/uuid";

const initialTaskList:ITask[] = [
    {
        id: Uuid.v4(),
        title: 'Complete project',
        description: 'Finish the task by the deadline',
        location: 'Tallinn, Estonia',
        date: dayjs().add(7,"day"), // Initialize with a Day.js date,
        completed: false,
    },
    {
        id: Uuid.v4(),
        title: 'Prepare coffee',
        description: 'Need coffee?',
        location: 'Klaipeda, Lithuania',
        date: dayjs().add(2, "day"), // Initialize with a Day.js date
        completed: false,
    },
    {
        id: Uuid.v4(),
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
    const { activeTask, setActiveTask } = useContext(ActiveTaskContext);
    const { tasks, setTasks } = useContext(TasksContext);
    const [showAllTasks, setShowAllTasks] = useState(false);

    const goToProfile = () => {
        router.push('profile');
    };

    const toggleTaskCompletion = (id: string) => {
            setTasks!((prevTasks:ITask[]) =>
                prevTasks.map((task) =>
                    task.id === id ? {...task, completed: !task.completed} : task
                )
            );

    };

    const removeTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const handleAddTask = () => {
        setActiveTask!(null);
        router.push('/taskForm');
    };

    const handleEditTask = (task: ITask) => {
        setActiveTask!(task);
        router.push(`/taskForm`);
    };

    const filteredTasks = showAllTasks ? tasks : tasks.filter(task => !task.completed);

    useEffect(() => {
        // Sort tasks by date
        const sortedTasks = sortTasksByDate(initialTaskList);

        // Filter tasks based on your criteria, e.g., incomplete tasks
        const filteredTasks = sortedTasks.filter(task => !task.completed);

        // Update state with sorted and filtered tasks
        setTasks!(filteredTasks);
    }, []);

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => setShowAllTasks(!showAllTasks)}
                style={styles.toggleButton}
            >
                {showAllTasks ? "Show Incomplete Tasks" : "Show All Tasks"}
            </Button>
            {filteredTasks.map((task) => (
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
        marginTop: 30,
        paddingTop: 60,
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
    toggleButton: {
        marginBottom: 16,
    },
});