import {
    Text,
    TextProps,
    TextStyle
} from "react-native";
import { useColors } from "../../contexts/colors";
import { useSettings } from "../../contexts/settings";

import createStyles from "./styles";

type FontName = "title" | "subtitle" | "text" | "desc" | "desc-bold" | "input" | "button" | "heavy";

interface Fonts extends TextStyle {
    name: FontName;
    preventTranslate?: boolean;
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
    name: "input",
    fontFamily: "Rubik"
}, {
    name: "text",
    fontFamily: "Inter-Regular"
}, {
    name: "button",
    fontFamily: "Exo-2"
}, {
    name: "subtitle",
    fontFamily: "Ubuntu"
}, {
    name: "heavy",
    fontFamily: "Fira-Sans"
}];

interface FontProps extends TextProps {
    preset: FontName;
}

export default function Font({ preset, style, ...rest }: FontProps) {
    const { settings } = useSettings();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <Text {...rest} style={[styles.text, settings.display.appearance.custom_fonts && { ...FONTS.find(f => f.name == preset) }, Array.isArray(style) ? [...style] : style]} />
    );
}
