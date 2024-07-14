import React, {useState, useEffect, useContext} from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ITask } from "@/src/domain/ITask";
import dayjs from "dayjs";
import {ExpoRouter} from "expo-router/types/expo-router";
import Uuid from "expo-modules-core/src/uuid";
import {TaskContext} from "@/src/app/_layout";




export default function TaskForm() {
    const router = useRouter();
    const { activeTask, setActiveTask } = useContext(TaskContext);
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState(activeTask?.title || "");
    const [description, setDescription] = useState(activeTask?.description || "");
    const [location, setLocation] = useState(activeTask?.location || "");
    const [date, setDate] = useState(activeTask ? dayjs(activeTask.date) : dayjs());

    useEffect(() => {
        if (id && activeTask) {
            setTitle(activeTask.title);
            setDescription(activeTask.description);
            setLocation(activeTask.location);
            setDate(dayjs(activeTask.date));
        }
    }, [id, activeTask]);

    const handleSave = () => {
        const task: ITask = {
            id: activeTask?.id || Uuid.v4(),
            title,
            description,
            location,
            date,
            completed: activeTask?.completed || false,
        };
        //saveTask(task);
        setActiveTask!(null);
        router.push("/taskList");
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput
                label="Location"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
            />


            <TextInput
                label="Date"
                value={date.format("YYYY-MM-DD")}
                //onChangeText={(text) => setDate(dayjs(text))}
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSave}>
                Save
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        marginVertical: 8,
    },
});