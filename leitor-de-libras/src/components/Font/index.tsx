import {
    Text,
    TextProps,
    TextStyle
} from "react-native";
import { useColors } from "../../contexts/colors";
import { useSettings } from "../../contexts/settings";

import createStyles from "./styles";

type FontName = "title" | "subtitle" | "text" | "bold" | "desc" | "desc-bold" | "input" | "label" | "button" | "heavy";

interface Fonts extends TextStyle {
    name: FontName;
    preventTranslate?: boolean;
}

// const FONTS: Fonts[] = [{
//     name: "title",
//     fontSize: 18,
//     fontFamily: "Inter-Bold"
// }, {
//     name: "desc",
//     fontFamily: "Inter-Regular"
// }, {
//     name: "desc-bold",
//     fontFamily: "Inter-Medium"
// }, {
//     name: "input",
//     fontFamily: "Inter-Regular"
// }, {
//     name: "text",
//     fontFamily: "Inter-Regular"
// }, {
//     name: "button",
//     fontFamily: "Inter-Medium"
// }, {
//     name: "subtitle",
//     fontFamily: "Inter-Medium"
// }, {
//     name: "heavy",
//     fontFamily: "Inter-Bold"
// }];

const FONTS: Fonts[] = [{
    name: "title",
    fontFamily: "Inter-Black",
    fontSize: 18
}, {
    name: "desc",
    fontFamily: "Inter-Regular"
}, {
    name: "desc-bold",
    fontFamily: "Inter-Medium"
}, {
    name: "input",
    fontFamily: "Rubik"
}, {
    name: "label",
    fontFamily: "Rubik-Bold"
}, {
    name: "text",
    fontFamily: "Inter-Regular"
}, {
    name: "bold",
    fontFamily: "Inter-Bold"
}, {
    name: "button",
    fontFamily: "Ubuntu"
}, {
    name: "subtitle",
    fontFamily: "Ubuntu"
}, {
    name: "heavy",
    fontFamily: "Inter-Black"
}];


interface FontProps extends TextProps {
    preset?: FontName;
}

export default function Font({ preset, style, ...rest }: FontProps) {
    const { settings } = useSettings();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <Text {...rest} style={[styles.text, settings.display.appearance.custom_fonts && { ...FONTS.find(f => f.name == (preset ?? "text")) }, Array.isArray(style) ? [...style] : style]} />
    );
}
