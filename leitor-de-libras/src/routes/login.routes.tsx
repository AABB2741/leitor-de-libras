import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

import { useColors } from "../contexts/colors";

import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ResetPassword from "../screens/ResetPassword";

const Stack = createNativeStackNavigator<LoginParamList>();

interface LoginRoutesProps {
    route: RouteProp<RootStackParamList, "LoginRoutes">;
}

export default function LoginRoutes({ route }: LoginRoutesProps) {
    const colors = useColors();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
        </View>
    )
}
