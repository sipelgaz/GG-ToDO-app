import { Stack } from "expo-router";
import {
    IconButton,
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
} from "react-native-paper";
import { Colors } from "../constants/Colors";
import { useColorScheme, View } from 'react-native';
import {createContext, useState} from "react";
import {IUser} from "@/src/domain/IUser";
import {ITask} from "@/src/domain/ITask";
import Uuid from "expo-modules-core/src/uuid";
import dayjs from "dayjs";

const customLightTheme = { ...MD3LightTheme, colors: Colors.light };
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };

export const UserContext = createContext<{
    activeUser: IUser | null;
    setActiveUser: ((user: IUser | null) => void) | null
}>({activeUser: null, setActiveUser: null});

export const ActiveTaskContext = createContext<{
    activeTask: ITask | null;
    setActiveTask: ((task: ITask | null) => void) | null;
}>({activeTask: null, setActiveTask: null});

export const TasksContext = createContext<{
    tasks: ITask[];
    setTasks:React.Dispatch<React.SetStateAction<ITask[]>>;
}>({tasks: [], setTasks: () => null});

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


export default function RootLayout() {
    const colorScheme = useColorScheme();

    const paperTheme = colorScheme === "dark" ? customDarkTheme : customLightTheme; // Use the custom theme based on the color scheme
    const [activeUser, setActiveUser] = useState(null as IUser | null);
    const [activeTask, setActiveTask] = useState<ITask | null>(null);
    const [tasks, setTasks] = useState<ITask[]>([]);



    return (
        <UserContext.Provider value={{ activeUser, setActiveUser }}>
            <TasksContext.Provider value={{ tasks, setTasks }}>
                <ActiveTaskContext.Provider value={{ activeTask, setActiveTask }}>
                    <PaperProvider theme={paperTheme}>
                        <Stack>
                            <Stack.Screen name="index" options={{ headerShown: false}} />
                            <Stack.Screen name="profile"  options={{ headerShown: false, title: "Profile"}} />
                            <Stack.Screen name="taskList" options={{ headerShown: false }}  />
                            <Stack.Screen name="taskForm" options={{ headerShown: false, title: "Task Form" }} />
                        </Stack>
                    </PaperProvider>
                </ActiveTaskContext.Provider>
            </TasksContext.Provider>
        </UserContext.Provider>
    );
}
