import AppRoutes from "./app.routes";
import { useColors } from "../contexts/colors";
import { StatusBar, StatusBarStyle } from "react-native";

import LoginForm from "../components/LoginForm";

export default function Routes() {
    const colors = useColors();

    return (
        <>
            <StatusBar barStyle={colors.statusBar.foreground as StatusBarStyle} backgroundColor={"transparent"} translucent />
            <LoginForm />
            <AppRoutes />
        </>
    );
}
