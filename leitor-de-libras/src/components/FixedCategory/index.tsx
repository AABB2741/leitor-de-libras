import {
    View,
    ViewProps
} from "react-native";
import { useColors } from "../../contexts/colors";

import Font from "../Font";

import styles from "./styles";

interface FixedCategoryProps extends ViewProps {
    title?: string;
    desc?: string;
    children?: React.ReactNode;
    disableVerticalSpacing?: boolean;
    headerPadding?: number;
    contentPadding?: number;
}

export default function FixedCategory({ title, desc, children, headerPadding, contentPadding, disableVerticalSpacing, ...rest }: FixedCategoryProps) {
    const colors = useColors();

    return (
        <View {...rest} style={[!disableVerticalSpacing && { marginTop: 20 }, rest.style]}>
            <View style={[{ padding: headerPadding }, !!headerPadding && { paddingBottom: 10 }]}>
                {title && <Font preset="subtitle" style={{ fontSize: 16 }}>{title}</Font>}
                {desc && <Font preset="desc" style={{ color: colors.desc, marginTop: 5 }}>{desc}</Font>}
            </View>
            <View style={[styles.content, !!contentPadding && { padding: contentPadding, paddingTop: 0 }]}>
                {children}
            </View>
        </View>
    );
}
