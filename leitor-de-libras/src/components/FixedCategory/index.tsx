import {
    View,
    ViewProps
} from "react-native";
import { useColors } from "../../contexts/colors";

import Font from "../Font";

import styles from "./styles";

interface FixedCategoryProps {
    title?: string;
    desc?: string;
    children?: React.ReactNode;
    disableVerticalSpacing?: boolean;
}

export default function FixedCategory({ title, desc, children, disableVerticalSpacing}: FixedCategoryProps) {
    const colors = useColors();

    return (
        <View style={!disableVerticalSpacing && { marginTop: 20 }}>
            {title && <Font preset="subtitle" style={{ fontSize: 16 }}>{title}</Font>}
            {desc && <Font preset="desc" style={{ color: colors.desc, marginTop: 5 }}>{desc}</Font>}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}
