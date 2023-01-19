import { StatusBar, StatusBarStyle, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColors } from "../contexts/colors";
import { useSettings } from "../contexts/settings";

import AppRoutes from "./app.routes";
import LoginRoutes from "./login.routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    const colors = useColors();
    const { settings } = useSettings();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={"transparent"} translucent />
            <Stack.Navigator
                initialRouteName="LoginRoutes"
                screenOptions={{
                    headerShown: false,
                    animation: settings.display.performance.reduce_animations ? "none" : "slide_from_bottom"
                }}
            >
                <Stack.Screen name="AppRoutes" component={AppRoutes} />
                <Stack.Screen name="LoginRoutes" component={LoginRoutes} />
            </Stack.Navigator>
        </View>
    );
}
