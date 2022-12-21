import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Books, House, Translate, Camera as CameraIcon } from "phosphor-react-native";
import { useColors } from "../contexts/Colors";

import Dashboard from "../screens/Dashboard";
import Translations from "../screens/Translations";
import Camera from "../screens/Camera";
import Learn from "../screens/Learn";
import Profile from "../screens/Profile";
import { Image } from "react-native";

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function AppRoutes() {
    const colors = useColors();

    return (
        <Tab.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false, tabBarStyle: {
            backgroundColor: colors.header,
            borderTopWidth: 0
        } }}>
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size }) => focused ? <House weight="fill" size={size} color={colors.accent} /> : <House size={size} color={colors.font} />
                }}
            />
            <Tab.Screen
                name="Translations"
                component={Translations}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size }) => focused ? <Translate weight="fill" size={size} color={colors.accent} /> : <Translate size={size} color={colors.font} />
                }}
            />
            <Tab.Screen
                name="Camera"
                component={Camera}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size }) => focused ? <CameraIcon weight="fill" size={size} color={colors.accent} /> : <CameraIcon size={size} color={colors.font} />
                }}
            />
            <Tab.Screen
                name="Learn"
                component={Learn}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size }) => focused ? <Books weight="fill" size={size} color={colors.accent} /> : <Books size={size} color={colors.font} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size }) => <Image source={require("../../assets/profile-picture.jpg")} style={{
                        width: size,
                        height: size,
                        borderRadius: size,
                        borderWidth: 2,
                        borderColor: focused ? colors.accent : "transparent"
                    }} />
                }}
            />
        </Tab.Navigator>
    );
}
