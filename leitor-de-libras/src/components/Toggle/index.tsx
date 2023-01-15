import {
    Pressable
} from "react-native";
import {
    ToggleLeft,
    ToggleRight
} from "phosphor-react-native";

import { useColors } from "../../contexts/colors";

import Font from "../Font";

import createStyles from "./styles";

interface ToggleProps {
    label?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    disabled?: boolean;
}

export default function Toggle({ label, value, disabled, onValueChange }: ToggleProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <Pressable style={styles.container} disabled={disabled} onPress={() => onValueChange?.(!value)}>
            <Font preset="button" style={styles.label}>{label}</Font>
            {value ? <ToggleRight size={26} color={colors.accent} weight="fill" /> : <ToggleLeft size={26} color={colors.font} />}
        </Pressable>
    )
}
