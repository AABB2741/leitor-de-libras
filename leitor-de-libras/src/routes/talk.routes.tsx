import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversations from "../screens/Conversations";

const Stack = createNativeStackNavigator<TalkParamList>();

export default function TalkRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Conversations" component={Conversations} />
        </Stack.Navigator>
    );
}
