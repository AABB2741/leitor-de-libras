import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../screens/Dashboard";
import Translations from "../screens/Translations";
import Camera from "../screens/Camera";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Translations" component={Translations} />
            <Stack.Screen name="Camera" component={Camera} />
        </Stack.Navigator>
    );
}
