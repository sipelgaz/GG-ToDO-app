import { Stack } from "expo-router";
import {
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
} from "react-native-paper";
import { Colors } from "../constants/Colors";
import { useColorScheme } from 'react-native';
import {createContext, useState} from "react";
import {IUser} from "@/src/domain/IUser";
import {ITask} from "@/src/domain/ITask";

const customLightTheme = { ...MD3LightTheme, colors: Colors.light };
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };

export const UserContext = createContext<{
    activeUser: IUser | null;
    setActiveUser: ((user: IUser | null) => void) | null
}>({activeUser: null, setActiveUser: null});

export const TaskContext = createContext<{
    activeTask: ITask | null;
    setActiveTask: ((task: ITask | null) => void) | null
}>({activeTask: null, setActiveTask: null});

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const paperTheme = colorScheme === "dark" ? customDarkTheme : customLightTheme; // Use the custom theme based on the color scheme
    const [activeUser, setActiveUser] = useState(null as IUser | null);
    const [activeTask, setActiveTask] = useState<ITask | null>(null);


    return (
        <UserContext.Provider value={{ activeUser, setActiveUser }}>
            <TaskContext.Provider value={{ activeTask, setActiveTask }}>
                <PaperProvider theme={paperTheme}>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: true}} />
                        <Stack.Screen name="profile"  options={{ headerShown: true, title: "Profile"}} />
                        <Stack.Screen name="taskList" options={{ headerShown: true }}  />
                        <Stack.Screen name="taskForm" options={{ headerShown: true, title: "Task Form" }} />
                    </Stack>
                </PaperProvider>
            </TaskContext.Provider>
        </UserContext.Provider>
    );
}
