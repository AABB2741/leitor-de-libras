import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    Books,
    House,
    Translate,
    UserCircle,
    Plus
} from "phosphor-react-native";
import { useColors } from "../contexts/Colors";
import { LinearGradient } from "expo-linear-gradient";

import DashboardRoutes from "./dashboard.routes";
import Translations from "../screens/Translations";
import Camera from "../screens/Camera";
import Learn from "../screens/Learn";
import Profile from "../screens/Profile";
import { Image, View } from "react-native";
import { useUser } from "../contexts/User";

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function AppRoutes() {
    const user = useUser();
    const colors = useColors();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Tab.Navigator initialRouteName="Dashboard" screenOptions={{
                headerShown: false, tabBarShowLabel: false, tabBarStyle: {
                    backgroundColor: colors.header,
                    borderTopWidth: 0,
                    shadowColor: "transparent"
                }
            }}>
                <Tab.Screen
                    name="Dashboard"
                    component={DashboardRoutes}
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
                        tabBarIcon: ({ focused }) => focused ? (
                            <LinearGradient colors={[ colors.accent2, colors.accent ]} locations={[0, 1]} style={{ padding: 12, marginBottom: 32, borderRadius: 28 }}>
                                <Plus size={32} color={colors.font2} />
                            </LinearGradient>
                        ) : (
                            <View style={{ padding: 12, backgroundColor: colors.accent2, marginBottom: 32, borderRadius: 28 }}>
                                <Plus size={32} color={colors.font2} />
                            </View>
                        )
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
        </View>
    );
}
