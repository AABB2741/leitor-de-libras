import {
    Modal,
    ModalProps
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import SignUp from "./SignUp";
import ResetPassword from "./ResetPassword";

const Stack = createNativeStackNavigator<LoginParamList>();

interface LoginFormProps extends ModalProps {

}

export default function LoginForm({ ...rest }: LoginFormProps) {
    return (
        <Modal {...rest}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </Stack.Navigator>
        </Modal>
    );
}
