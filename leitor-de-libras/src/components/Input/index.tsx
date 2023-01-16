import { X } from "phosphor-react-native";
import {
    View,
    TextInput,
    TextInputProps,
    TouchableOpacity
} from "react-native";
import { useColors } from "../../contexts/colors";
import { useSettings } from "../../contexts/settings";

import Font from "../Font";

import createStyles from "./styles";

interface InputProps extends TextInputProps {
    label?: string;
    transparent?: boolean;
    hideClearButton?: boolean;
    noTopPadding?: boolean;
    onRequestClear?: () => void;
}

export default function Input({ label, style, transparent, hideClearButton, noTopPadding, onRequestClear, value, ...rest }: InputProps) {
    const { settings } = useSettings();
    const colors = useColors();
    const styles = createStyles({ colors, transparent, noTopPadding, value, custom_fonts: settings.display.appearance.custom_fonts });

    return (
        <View style={styles.container}>
            {label && (
                <Font preset="input" style={styles.label}>{label}</Font>
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
