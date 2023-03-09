import { useState } from "react";
import {
    Modal,
    ModalProps,
    StatusBar,
    View
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useUser } from "../../contexts/user";

import Login from "./Login";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";

import styles from "./styles";

const Stack = createNativeStackNavigator<LoginParamList>();

export type Location = "Login" | "SignUp" | "ResetPassword";

interface LoginFormProps extends ModalProps {
    screen?: Location;
}

export default function LoginForm({ screen = "Login", ...rest }: LoginFormProps) {
    const { signed } = useUser();

    const [location, setLocation] = useState(screen);

    // Evita que vários modais de login estejam abertos em telas diferentes. Este IF faz com que nada seja exibido caso o usuário já esteja logado
    if (signed)
        return null;

    return (
        <Modal {...rest} statusBarTranslucent animationType="slide" onRequestClose={!rest.onRequestClose || location !== "Login" ? (() => setLocation("Login")) : rest.onRequestClose}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                {location === "Login" && <Login setLocation={setLocation} />}
                {location === "SignUp" && <SignUp />}
                {location === "ResetPassword" && <ResetPassword />}
            </View>
        </Modal>
    );
}
