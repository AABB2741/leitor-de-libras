import {
    useEffect,
    useState
} from "react";

import { StatusBar, StatusBarStyle } from "react-native";

import log from "../utils/log";
import * as Storage from "../services/Storage";
import { useUser } from "../contexts/user";
import { useColors } from "../contexts/colors";

import LoginForm from "../components/LoginForm";
import AppRoutes from "./app.routes";

export default function Routes() {
    const [loginFormVisible, setLoginFormVisible] = useState<null | boolean>(null);
    const { signed } = useUser();
    const colors = useColors();

    useEffect(() => {
        log("Verificando se o usuário pulou etapa de login", { color: "fgGray" });
        Storage.getItem("@introduction").then(data => {
            if (data?.skip_login) {
                setLoginFormVisible(false);
            } else setLoginFormVisible(true);
        });
    }, []);

    if (loginFormVisible === null && !signed)
        return null;

    return (
        <>
            <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={"transparent"} translucent />
            {/* <LoginForm visible={!!loginFormVisible && !signed} /> */}
            <AppRoutes />
        </>
    );
}

// import React, {
//     useEffect,
//     useState,
//     createContext,
//     useContext
// } from "react";
// import { StatusBar, StatusBarStyle } from "react-native";
// import * as Storage from "../services/Storage";

// import { useUser } from "../contexts/user";
// import { useColors } from "../contexts/colors";

// import AppRoutes from "./app.routes";
// import LoginRoutes from "./login.routes";

// type Routes = "AppRoutes" | "LoginRoutes";
// interface RoutesProviderValues {
//     route: null | Routes;
//     setRoute: React.Dispatch<React.SetStateAction<null | Routes>>;
// }

// const RoutesContext = createContext<RoutesProviderValues>({} as RoutesProviderValues);

// export default function RoutesProvider() {
//     const { signed } = useUser();
//     const colors = useColors();
//     const [route, setRoute] = useState<null | Routes>(null);

//     useEffect(() => {
//         if (!signed) {
//             Storage.getItem("@welcome").then(data => {
//                 if (!data?.skip_login) {
//                     setRoute("LoginRoutes");
//                 } else setRoute("AppRoutes");
//             });
//         } else setRoute("AppRoutes");
//     }, []);

//     return (
//         <RoutesContext.Provider value={{ route, setRoute }}>
//             <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={"transparent"} translucent />
//             {(route === "AppRoutes") && <AppRoutes />}
//             {(route === "LoginRoutes") && <LoginRoutes />}
//         </RoutesContext.Provider>
//     );
// }

// export const useRoutes = () => useContext(RoutesContext);

// import { useEffect, useState } from "react";
// import { StatusBar, StatusBarStyle, View } from "react-native";
// import * as Storage from "../services/Storage";

// import { useUser } from "../contexts/user";
// import { useColors } from "../contexts/colors";
// import { useSettings } from "../contexts/settings";

// import AppRoutes from "./app.routes";
// import LoginRoutes from "./login.routes";

// export default function Routes() {
//     const colors = useColors();
//     const { settings } = useSettings();
//     const { user, signed } = useUser();

//     const [route, setRoute] = useState<null | "AppRoutes" | "LoginRoutes">(null);

//     useEffect(() => {
//         if (!signed) {
//             Storage.getItem("@welcome").then(data => {
//                 if (!data?.skip_login) {
//                     setRoute("LoginRoutes");
//                 }
//             })
//         } else {
//             setRoute("AppRoutes");
//         }
//     }, []);
    
//     return (
//         <View style={{ flex: 1, backgroundColor: colors.background }}>
//             {(route === "LoginRoutes") && <LoginRoutes />}
//             {(route === "AppRoutes") && <AppRoutes />}
//             <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={"transparent"} translucent />
//             {/* <Stack.Navigator
//                 initialRouteName="LoginRoutes"
//                 screenOptions={{
//                     headerShown: false,
//                     animation: settings.display.performance.reduce_animations ? "none" : "slide_from_bottom"
//                 }}
//             >
//                 <Stack.Screen name="AppRoutes" component={AppRoutes} />
//                 <Stack.Screen name="LoginRoutes" component={LoginRoutes} />
//             </Stack.Navigator> */}
//         </View>
//     );
// }
