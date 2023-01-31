import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import {
    Books,
    House,
    Translate,
    UserCircle,
    Plus,
    Chats
} from "phosphor-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useUser } from "../contexts/user";
import { useColors } from "../contexts/colors";

import DashboardRoutes from "./dashboard.routes";
import TranslationsRoutes from "./translations.routes";
import Camera from "../screens/Camera";
import TalkRoutes from "./talk.routes";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator<AppScreens>();

export default function AppRoutes() {
    const { user, signed } = useUser();
    const colors = useColors();

    return (
        <>
            <Tab.Navigator initialRouteName="DashboardRoutes" screenOptions={{
                headerShown: false, tabBarShowLabel: false, tabBarStyle: {
                    backgroundColor: colors.header,
                    borderTopWidth: 0,
                    shadowColor: "transparent"
                }
            }}>
                <Tab.Screen
                    name="DashboardRoutes"
                    component={DashboardRoutes}
                    options={{
                        tabBarIcon: ({ focused, size }) => focused ? <House weight="fill" size={size} color={colors.accent} /> : <House size={size} color={colors.font} />
                    }}
                />
                <Tab.Screen
                    name="TranslationsRoutes"
                    component={TranslationsRoutes}
                    options={{
                        tabBarIcon: ({ focused, size }) => focused ? <Translate weight="fill" size={size} color={colors.accent} /> : <Translate size={size} color={colors.font} />
                    }}
                />
                <Tab.Screen
                    name="Camera"
                    component={Camera}
                    options={{
                        tabBarIcon: ({ focused }) => focused ? (
                            <LinearGradient colors={[ colors.accent2, colors.accent ]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ padding: 12, marginBottom: 26, borderRadius: 28 }}>
                                <Plus size={32} color={colors.font2} />
                            </LinearGradient>
                        ) : (
                            <View style={{ padding: 12, backgroundColor: colors.accent2, marginBottom: 26, borderRadius: 28 }}>
                                <Plus size={32} color={colors.font2} />
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Talk"
                    component={TalkRoutes}
                    options={{
                        tabBarIcon: ({ focused, size }) => focused ? <Chats weight="fill" size={size} color={colors.accent} /> : <Chats size={size} color={colors.font} />
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused, size }) => signed ? (
                            <Image source={user?.avatar} style={{
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
        </>
    );
}
