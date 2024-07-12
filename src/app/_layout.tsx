import { Stack } from "expo-router";
import {
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
} from "react-native-paper";
import { Colors } from "../constants/Colors";
import { useColorScheme } from 'react-native';

const customLightTheme = { ...MD3LightTheme, colors: Colors.light };
const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };


export default function RootLayout() {
    const colorScheme = useColorScheme();

    const paperTheme = colorScheme === "dark" ? customDarkTheme : customLightTheme; // Use the custom theme based on the color scheme
    return (
        <PaperProvider theme={paperTheme}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: true}} />
                <Stack.Screen name="profile" options={{ headerShown: true}} />
                <Stack.Screen name="taskList" options={{ headerShown: true}} />
            </Stack>
        </PaperProvider>

    );
}
