import AppRoutes from "./app.routes";
import { useColors } from "../contexts/Colors";
import { StatusBar, StatusBarStyle } from "react-native";

export default function Routes() {
    const colors = useColors();

    return (
        <>
            <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={colors.statusBar.background} />
            <AppRoutes />
        </>
    );
}
