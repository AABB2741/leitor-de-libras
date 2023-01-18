import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColors } from "../contexts/colors";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ResetPassword from "../screens/ResetPassword";

const Stack = createNativeStackNavigator<LoginParamList>();

export default function LoginRoutes() {
    const colors = useColors();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
        </View>
    )
}
