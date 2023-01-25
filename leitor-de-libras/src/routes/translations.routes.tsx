import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Translations from "../screens/Translations";
import Watch from "../screens/Watch";

const Stack = createNativeStackNavigator<TranslationsParamList>();

export default function TranslationsRoutes() {
    return (
        <Stack.Navigator initialRouteName="Translations" screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
            <Stack.Screen name="Translations" component={Translations} />
            <Stack.Screen name="Watch" component={Watch} />
        </Stack.Navigator>
    );
}
