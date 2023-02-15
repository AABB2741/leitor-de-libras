import {
    TouchableOpacity,
    TouchableOpacityProps,
    TextStyle
} from "react-native";
import { useColors } from "../../contexts/colors";

import Font from "../Font";
import Loading from "../Loading";

import createStyles from "./styles";

interface ButtonProps extends TouchableOpacityProps {
    label?: string;
    highlight?: boolean;
    accentColor?: string,
    style?: TouchableOpacityProps["style"],
    labelStyle?: TextStyle;
    loading?: boolean;
}

export default function Button({ children, label, highlight, accentColor, style, labelStyle, loading, disabled, ...rest }: ButtonProps) {
    const colors = useColors();
    const styles = createStyles({ colors, accentColor, disabled: loading || disabled });

    return (
        <TouchableOpacity { ...rest } disabled={disabled || loading} style={[styles.container, highlight && styles.highlight, style]}>
            {loading && <Loading size={14} style={styles.loading} />}
            <Font family="ubuntu" style={[styles.label, highlight && styles.labelHighlight, labelStyle]}>{children ?? label}</Font>
        </TouchableOpacity>  
    );
}
