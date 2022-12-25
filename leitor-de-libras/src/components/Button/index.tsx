import {
    TouchableOpacity,
    TouchableOpacityProps,
    TextStyle
} from "react-native";
import { useColors } from "../../contexts/Colors";
import Font from "../Font";

import createStyles from "./styles";

interface Props {
    children?: string;
    label?: string;
    highlight?: boolean;
    accentColor?: string,
    style?: TouchableOpacityProps["style"],
    labelStyle?: TextStyle;
}

export default function Button({ children, label, highlight, accentColor, style, labelStyle }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors, accentColor });

    return (
        <TouchableOpacity style={[styles.container, highlight && styles.highlight, style]}>
            <Font preset="button" style={[styles.label, highlight && styles.labelHighlight, labelStyle]}>{children ?? label}</Font>
        </TouchableOpacity>  
    );
}
