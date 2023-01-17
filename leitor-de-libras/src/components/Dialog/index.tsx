import {
    Modal,
    ModalProps,
    View,
    ScrollView,
    TouchableOpacity
} from "react-native";
import { X } from "phosphor-react-native";

import { useColors } from "../../contexts/colors";

import createStyles from "./styles";
import Font from "../Font";

interface DialogProps extends ModalProps {
    title?: string;
    desc?: string;
    children?: React.ReactNode;
}

export default function Dialog({ title, desc, children, ...rest }: DialogProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <Modal {...rest} animationType="slide" transparent >
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={rest.onRequestClose}>    
                    <X style={styles.close} color={colors.font} size={24} />
                </TouchableOpacity>
                <Font preset="title" style={styles.title}>{title}</Font>
                <Font preset="desc" style={styles.desc}>{desc}</Font>
            </ScrollView>
        </Modal>
    );
}
