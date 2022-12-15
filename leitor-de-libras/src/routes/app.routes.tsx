import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Translations from "../screens/Translations";
import Camera from "../screens/Camera";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRoutes() {
    return (
        <Stack.Navigator initialRouteName="Translations" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Translations" component={Translations} />
            <Stack.Screen name="Camera" component={Camera} />
        </Stack.Navigator>
    );
}
