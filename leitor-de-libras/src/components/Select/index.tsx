import { useState } from "react";
import {
    TouchableOpacity
} from "react-native";
import { CaretDown } from "phosphor-react-native";
import { useColors } from "../../contexts/colors";

import Font from "../Font";

import createStyles from "./styles";

interface OptionProps {
    icon?: undefined;
    label?: string;
    value: string;
}

interface SelectProps {
    label?: string;
    labelIcon?: undefined;
    value: OptionProps["value"];
    options: OptionProps[];
    disableStyles?: boolean;
    disabled?: boolean;
    useCustomModal?: boolean;
    onValueChange?: (value: OptionProps["value"]) => void;
    onPress?: () => void;
    onRequestClose?: () => void;
}

export default function Select({ label, value, options, disableStyles, disabled, useCustomModal, onValueChange, onPress, onRequestClose }: SelectProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <TouchableOpacity disabled={disabled} style={!disableStyles && styles.container}>
            <Font family="ubuntu" style={styles.label}>{value ?? label}</Font>
            {!disableStyles && <CaretDown color={colors.font} size={12} style={styles.indicator} />}
        </TouchableOpacity>
    );
}
