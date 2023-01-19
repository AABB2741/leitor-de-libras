import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColors } from "../contexts/colors";
import { useSettings } from "../contexts/settings";

import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
import Customize from "../screens/Customize";
import Configure from "../screens/Configure";

const Stack = createNativeStackNavigator<DashboardParamList>();

export default function DashboardRoutes() {
    const {settings} = useSettings();
    const colors = useColors();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: settings.display.performance.reduce_animations ? "none" : "slide_from_right" }}>
                <Stack.Screen name="Home" component={Dashboard} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Configure" component={Configure} />
                <Stack.Screen name="Customize" component={Customize} />
            </Stack.Navigator>
        </View>
    );
}
