import {
    ModalProps
} from "react-native";
import Dialog from "../Dialog";

interface LoginFormProps extends ModalProps {
    visible?: boolean;
}

export default function LoginForm({ visible, ...rest }: LoginFormProps) {
    return <Dialog visible={visible} title="Fazer login" {...rest} />;
}
