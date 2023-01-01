import {
    Text,
    TextProps,
    TextStyle
} from "react-native";
import { useColors } from "../../contexts/Colors";

import createStyles from "./styles";

type FontName = "title" | "subtitle" | "text" | "desc" | "desc-bold" | "input" | "button"

interface Fonts extends TextStyle {
    name: FontName;
}

const FONTS: Fonts[] = [{
    name: "title",
    fontFamily: "Montserrat-Bold",
    fontSize: 18
}, {
    name: "desc",
    fontFamily: "PT-Sans"
}, {
    name: "desc-bold",
    fontFamily: "PT-Sans-Bold"
}, {
    name: "text",
    fontFamily: "Inter-Regular"
}, {
    name: "button",
    fontFamily: "Exo-2"
}, {
    name: "subtitle",
    fontFamily: "Ubuntu"
}];

interface FontProps extends TextProps {
    preset: FontName;
}

export default function Font({ preset, style, ...rest }: FontProps) {
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <Text {...rest} style={[styles.text, { ...FONTS.find(f => f.name == preset) }, Array.isArray(style) ? [...style] : style]} />
    );
}
