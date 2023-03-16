import {
    View,
    ViewStyle,
    TextInput,
    TextInputProps
} from "react-native";

import { useColors } from "../../contexts/colors";
import Font from "../Font";

import createStyles from "./styles";

interface InputProps extends TextInputProps {
    label?: string;
    transparent?: boolean;
    containerStyle?: ViewStyle;
}

export default function Input({ label, transparent, containerStyle, ...rest }: InputProps) {
    const colors = useColors();
    const styles = createStyles({ colors, transparent, editable: !!rest.editable });

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Font family="rubik" style={styles.label}>{label}</Font>}
            <TextInput placeholderTextColor={colors.desc} {...rest} style={[styles.input, Array.isArray(rest.style) ? [...rest.style] : rest.style]} />
        </View>
    );
}
