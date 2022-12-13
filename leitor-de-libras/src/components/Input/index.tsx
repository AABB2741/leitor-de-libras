import {
    TextInput,
    TextInputProps
} from "react-native";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

interface Props extends TextInputProps {
    
}

export default function Input({ style, ...rest }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <TextInput style={[ styles.input, style ]} placeholderTextColor={colors.desc} {...rest} />
    );
}
