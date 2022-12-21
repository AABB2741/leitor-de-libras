import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Books, House, Translate, Camera as CameraIcon, UserCirclePlus, UserCircle } from "phosphor-react-native";
import { useColors } from "../contexts/Colors";

import Dashboard from "../screens/Dashboard";
import Translations from "../screens/Translations";
import Camera from "../screens/Camera";
import Learn from "../screens/Learn";
import Profile from "../screens/Profile";
import { Image } from "react-native";
import { useUser } from "../contexts/User";

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function AppRoutes() {
    const user = useUser();
    const colors = useColors();

    return (
        <Tab.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: {
            backgroundColor: colors.header,
            borderTopWidth: 0,
            shadowColor: "transparent"
        } }}>
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarIcon: ({ focused, size }) => focused ? <House weight="fill" size={size} color={colors.accent} /> : <House size={size} color={colors.font} />
                }}
            />
            <Tab.Screen
                name="Translations"
                component={Translations}
                options={{
                    tabBarIcon: ({ focused, size }) => focused ? <Translate weight="fill" size={size} color={colors.accent} /> : <Translate size={size} color={colors.font} />
                }}
            />
            <Tab.Screen
                name="Camera"
                component={Camera}
                options={{
                    tabBarIcon: ({ focused, size }) => focused ? <CameraIcon weight="fill" size={size} color={colors.accent} /> : <CameraIcon size={size} color={colors.font} />
                }}
            />
            <Tab.Screen
                name="Learn"
                component={Learn}
                options={{
                    tabBarIcon: ({ focused, size }) => focused ? <Books weight="fill" size={size} color={colors.accent} /> : <Books size={size} color={colors.font} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, size }) => user.signed ? (
                        <Image source={user.avatar} style={{
                            width: size,
                            height: size,
                            borderRadius: size,
                            borderWidth: 2,
                            borderColor: focused ? colors.accent : "transparent"
                        }} />
                    ) : (
                        <UserCircle color={focused ? colors.accent : colors.font} weight={focused ? "fill" : "regular"} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
