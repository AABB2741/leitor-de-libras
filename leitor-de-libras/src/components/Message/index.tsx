import {
    View,
    Modal,
    ModalProps,
    StatusBar
} from "react-native";

import { useColors } from "../../contexts/colors";

import createStyles from "./styles";

interface MessageProps extends ModalProps {
    title?: string;
    text?: string;
}

export default function Message({ title, text, ...rest }: MessageProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <>
            {rest.visible && <StatusBar backgroundColor="#fff" />}
            <Modal
                animationType="fade"
                presentationStyle="overFullScreen"
                transparent
                { ...rest }
            >
                <View style={styles.container}>

                </View>
            </Modal>
        </>
    );
}
