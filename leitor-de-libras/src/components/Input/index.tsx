import { X } from "phosphor-react-native";
import {
    View,
    TextInput,
    TextInputProps,
    TouchableOpacity
} from "react-native";
import { useColors } from "../../contexts/Colors";
import Font from "../Font";

import createStyles from "./styles";

interface InputProps extends TextInputProps {
    label?: string;
    transparent?: boolean;
    hideClearButton?: boolean;
    onRequestClear?: () => void;
}

export default function Input({ label, style, transparent, hideClearButton, onRequestClear, value, ...rest }: InputProps) {
    const colors = useColors();
    const styles = createStyles({ colors, transparent, value });

    return (
        <View style={styles.container}>
            {label && (
                <Font preset="subtitle" style={styles.label}>{label}</Font>
            )}
            <View style={styles.content}>
                <TextInput style={[ styles.input, style ]} placeholderTextColor={colors.desc} value={value} {...rest} />
                {(!hideClearButton && value && onRequestClear) && (
                    <TouchableOpacity style={styles.clear} onPress={onRequestClear}>
                        <X color={colors.font} size={18} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
