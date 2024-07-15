import React, {useState, useEffect, useContext} from "react";
import { View, StyleSheet, Text } from "react-native";
import {TextInput, Button, Avatar, Card} from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ITask } from "@/src/domain/ITask";
import dayjs from "dayjs";
import {ExpoRouter} from "expo-router/types/expo-router";
import Uuid from "expo-modules-core/src/uuid";
import {ActiveTaskContext, UserContext} from "@/src/app/_layout";
import {fetchWeather} from "@/src/services/weatherService";




export default function TaskForm() {
    const router = useRouter();
    const { activeTask, setActiveTask } = useContext(ActiveTaskContext);
    const { activeUser, setActiveUser } = useContext(UserContext);
    const { id } = useLocalSearchParams();
    const [title, setTitle] = useState(activeTask?.title || "");
    const [description, setDescription] = useState(activeTask?.description || "");
    const [location, setLocation] = useState(activeTask?.location || "Tallinn, Estonia");
    const [date, setDate] = useState(activeTask ? dayjs(activeTask.date) : dayjs());
    const [weather, setWeather] = useState(null as any);

    useEffect(() => {
        if (id && activeTask) {
            setTitle(activeTask.title);
            setDescription(activeTask.description);
            setLocation(activeTask.location);
            setDate(dayjs(activeTask.date));
        }
    }, [id, activeTask]);

    useEffect(() => {
        const getWeather = async () => {
            const weatherData = await fetchWeather(location);
            console.log(weatherData)
            setWeather(weatherData);
        };
        getWeather();
    }, [location]);

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
        router.back();
    };

    const handleDelete = () => {
        if (!activeUser?.isAdmin) {
            alert("Only admins can delete tasks.");
            return;
        }
        // deleteTask(activeTask.id);
        setActiveTask!(null);
        router.push("/taskList");
    };

    const handleMarkCompleted = () => {
        if (!activeUser?.isAdmin) {
            alert("Only admins can mark tasks as completed.");
            return;
        }
        const task: ITask = {
            ...activeTask!,
            completed: true,
        };
        // saveTask(task);
        setActiveTask!(null);
        router.push("/taskList");
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button
                    mode="contained"
                    onPress={handleBack}
                    icon={() => (
                        <Avatar.Icon
                            size={30}
                            icon="arrow-left"
                            style={{ marginLeft: 0 }}
                        />
                    )}
                >
                    Back
                </Button>
            </View>
            <TextInput
                label="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                editable={activeUser?.isAdmin}
            />
            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                editable={activeUser?.isAdmin}
            />
            <TextInput
                label="Location"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
                editable={activeUser?.isAdmin}
            />

            <TextInput
                label="Date"
                value={date.format("YYYY-MM-DD")}
                //onChangeText={(text) => setDate(dayjs(text))}
                style={styles.input}
                editable={activeUser?.isAdmin}
            />
            {weather && (
                <View style={styles.weatherContainer}>
                    <Text>Temperature in {weather.address}: {weather.currentConditions.temp}°C</Text>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={handleDelete}
                    disabled={!activeUser?.isAdmin}
                    style={styles.deleteButton}
                >
                    Delete
                </Button>
                <Button
                    mode="contained"
                    onPress={handleSave}
                    disabled={!activeUser?.isAdmin}
                    style={styles.saveButton}
                >
                    Save
                </Button>
            </View>
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
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 16,
        zIndex: 1,
    },
    input: {
        marginVertical: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    deleteButton: {
        flex: 1,
        marginRight: 8,
        backgroundColor: "red",
    },
    saveButton: {
        flex: 1,
        marginLeft: 8,
        backgroundColor: "green",
    },
    weatherContainer: {
        marginVertical: 16,
    },

});