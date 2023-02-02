import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversations from "../screens/Conversations";
import Chat from "../screens/Chat";

const Stack = createNativeStackNavigator<TalkParamList>();

export default function TalkRoutes() {
    return (
        <Stack.Navigator initialRouteName="Conversations" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Conversations" component={Conversations} />
            <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
    );
}
