import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColors } from "../contexts/Colors";

import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
import Customize from "../screens/Customize";

const Stack = createNativeStackNavigator<DashboardParamList>();

export default function DashboardRoutes() {
    const colors = useColors();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Dashboard} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="Customize" component={Customize} />
            </Stack.Navigator>
        </View>
    )
}
