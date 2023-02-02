import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Conversations from "../screens/Conversations";
import Chat from "../screens/Chat";
import { useColors } from "../contexts/colors";

const Stack = createNativeStackNavigator<TalkParamList>();

export default function TalkRoutes() {
    const colors = useColors();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Stack.Navigator initialRouteName="Conversations" screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
                <Stack.Screen name="Conversations" component={Conversations} />
                <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
        </View>
    );
}
