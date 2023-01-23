import { useEffect, useState } from "react";
import { StatusBar, StatusBarStyle, View } from "react-native";
import * as Storage from "../services/Storage";

import { useUser } from "../contexts/user";
import { useColors } from "../contexts/colors";
import { useSettings } from "../contexts/settings";

import AppRoutes from "./app.routes";
import LoginRoutes from "./login.routes";

export default function Routes() {
    const colors = useColors();
    const { settings } = useSettings();
    const { user, signed } = useUser();

    const [route, setRoute] = useState<null | "AppRoutes" | "LoginRoutes">(null);

    useEffect(() => {
        if (!signed) {
            Storage.getItem("@welcome").then(data => {
                
            })
            Storage.setItem("@welcome", { skip_login: true })
        }
    }, [user, signed]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            {(route === "LoginRoutes") && <LoginRoutes />}
            {(route === "AppRoutes") && <AppRoutes />}
            <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={"transparent"} translucent />
            {/* <Stack.Navigator
                initialRouteName="LoginRoutes"
                screenOptions={{
                    headerShown: false,
                    animation: settings.display.performance.reduce_animations ? "none" : "slide_from_bottom"
                }}
            >
                <Stack.Screen name="AppRoutes" component={AppRoutes} />
                <Stack.Screen name="LoginRoutes" component={LoginRoutes} />
            </Stack.Navigator> */}
        </View>
    );
}
