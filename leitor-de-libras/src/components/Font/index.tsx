import {
    Text,
    TextProps,
    TextStyle
} from "react-native";
import FontName from "../../@types/FontName";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

interface Fonts extends TextStyle {
    name: FontName;
}

const FONTS: Fonts[] = [{
    name: "title",
    fontFamily: "Inter-Bold",
    fontWeight: "300"
}, {
    name: "button",
    fontFamily: "Exo-2"
}, {
    name: "subtitle",
    fontFamily: "Ubuntu"
}];

interface Props extends TextProps {
    preset: FontName;
}

export default function Font({ preset, style, ...rest }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <Text style={[{ ...FONTS.find(f => f.name == preset) }, styles.text, style]} {...rest} />
    );
}
