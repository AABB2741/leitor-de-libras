import AppRoutes from "./app.routes";
import { useColors } from "../contexts/colors";
import { StatusBar, StatusBarStyle } from "react-native";

import Constants from "expo-constants";

export default function Routes() {
    const colors = useColors();
    console.log("Renderizando Routes");
    return (
        <>
            <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={colors.statusBar.background} />
            <AppRoutes />
        </>
    );
}
