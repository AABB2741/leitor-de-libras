import {
    View,
    TouchableOpacity
} from "react-native";
import { useColors } from "../../contexts/colors";

import Font from "../Font";
import Indicator from "./Indicator";

import createStyles from "./styles";

type OptionProps = {
    label?: string;
    value: string;
    default?: boolean;
}

interface PickerProps {
    options: OptionProps[];
    value?: string;
    disabled?: boolean;
    onValueChange?: (option: string) => void;
}

export default function Picker({ options, value, disabled, onValueChange }: PickerProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            {options.map(o => (
                <TouchableOpacity style={[styles.option, o.default && styles.defaultOption]} key={o.value} onPress={() => onValueChange?.(o.value)}>
                    <Indicator value={o.value === value} />
                    <Font preset="button" style={styles.optionLabel}>{o.label}</Font>
                </TouchableOpacity>
            ))}
        </View>
    );
}
