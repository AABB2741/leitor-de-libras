import { useColors } from "../contexts/colors";
import { StatusBar, StatusBarStyle } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppRoutes from "./app.routes";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
    const colors = useColors();

    return (
        <>
            <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={"transparent"} translucent />
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="App" component={AppRoutes} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </>
    );
}
