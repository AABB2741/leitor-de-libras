import {
    View,
    Pressable
} from "react-native";
import { useColors } from "../../../contexts/Colors";

import createStyles from "./styles";

interface IndicatorProps {
    value?: boolean;
    activeColor?: string;
    inactiveColor?: string;
    size?: number;
    onPress?: (newValue: boolean) => void;
}

export default function Indicator({ value, activeColor, inactiveColor, size, onPress }: IndicatorProps) {
    console.log(`Ativo: ${value}`);

    const colors = useColors();
    const styles = createStyles({
        value: value ? true : false,
        activeColor: activeColor ?? colors.accent,
        inactiveColor: inactiveColor ?? colors.font,
        size
    });

    return (
        <Pressable style={styles.border} onPress={() => onPress?.(!value)}>
            <View style={styles.fill} />
        </Pressable>
    );
}
