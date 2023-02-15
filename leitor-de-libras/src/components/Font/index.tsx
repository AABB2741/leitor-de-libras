import {
    Text,
    TextProps,
    TextStyle
} from "react-native";
import { useColors } from "../../contexts/colors";
import { useSettings } from "../../contexts/settings";

import createStyles from "./styles";

type Family = "black" | "medium" | "regular" | "rubik" | "ubuntu";

interface Fonts extends TextStyle {
    name: Family;
    preventTranslate?: boolean;
}
const FONTS: Fonts[] = [{
    name: "ubuntu",
    fontFamily: "Ubuntu"
}, {
    name: "rubik",
    fontFamily: "Rubik"
}, {
    name: "regular",
    fontFamily: "Inter"
}, {
    name: "medium",
    fontFamily: "Inter-Medium"
}, {
    name: "black",
    fontFamily: "Inter-Black"
}]

interface FontProps extends TextProps {
    family?: Family;
}

export default function Font({ family, style, ...rest }: FontProps) {
    const { settings } = useSettings();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <Text {...rest} style={[styles.text, settings.display.appearance.custom_fonts && { ...FONTS.find(f => f.name == (family ?? "regular")) }, Array.isArray(style) ? [...style] : style]} />
    );
}
