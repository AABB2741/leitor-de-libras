import {
    TouchableOpacity
} from "react-native";
import { IconProps } from "phosphor-react-native";

import createStyles from "./styles";
import { useColors } from "../../../contexts/colors";

import Font from "../../../components/Font";

export interface OptionProps {
    icon: ({ color, size }: IconProps) => React.ReactNode;
    label: string;
    multiSelectDisabled?: boolean;
    requireSelect?: boolean;
    onPress?: () => void;
}

interface Props extends OptionProps {
    selectCount: number;
}

export default function Option({ icon, label, selectCount, requireSelect, multiSelectDisabled }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors });

    if (selectCount > 1 && multiSelectDisabled)
        return null;

    if (requireSelect && selectCount === 0)
        return null;

    return (
        <TouchableOpacity style={styles.container}>
            { icon({ color: colors.font, size: 16 }) }
            <Font family="ubuntu" style={styles.label}>{label}</Font>
        </TouchableOpacity>
    );
}
