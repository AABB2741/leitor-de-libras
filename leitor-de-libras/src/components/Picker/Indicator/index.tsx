import {
    View,
    Pressable
} from "react-native";
import { useColors } from "../../../contexts/colors";

import createStyles from "./styles";

export interface IndicatorProps {
    value?: boolean;
    disabled?: boolean;
    activeColor?: string;
    inactiveColor?: string;
    disabledColor?: string;
    size?: number;
    onPress?: (newValue: boolean) => void;
}

export default function Indicator({ value, disabled, activeColor, inactiveColor, disabledColor, size, onPress }: IndicatorProps) {
    const colors = useColors();
    const styles = createStyles({
        value: value ? true : false,
        disabled,
        activeColor: activeColor ?? colors.accent,
        inactiveColor: inactiveColor ?? colors.font,
        disabledColor: disabledColor ?? colors.disabled,
        size
    });

    return (
        <Pressable style={styles.border} onPress={() => onPress?.(!value)}>
            <View style={styles.fill} />
        </Pressable>
    );
}
