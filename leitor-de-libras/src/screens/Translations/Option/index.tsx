import {
    TouchableOpacity
} from "react-native";

import createStyles from "./styles";
import { useColors } from "../../../contexts/colors";

import Font from "../../../components/Font";

interface IconProps {
    readonly color: string;
    readonly size: number;
}

export interface OptionProps {
    icon: ({ color, size }: IconProps) => React.ReactNode;
    label: string;
    onPress?: () => void;
}

export default function Option({ icon, label }: OptionProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <TouchableOpacity style={styles.container}>
            { icon({ color: colors.font, size: 16 }) }
            <Font preset="subtitle" style={styles.label}>{label}</Font>
        </TouchableOpacity>
    );
}
