import {
    View,
    ViewProps
} from "react-native";
import { useColors } from "../../contexts/Colors";

import Font from "../Font";

import styles from "./styles";

interface FixedCategoryProps extends ViewProps {
    title?: string;
    desc?: string;
}

export default function FixedCategory({ title, desc, children, ...rest }: FixedCategoryProps) {
    const colors = useColors();

    return (
        <View {...rest}>
            {title && <Font preset="subtitle" style={{ fontSize: 16 }}>{title}</Font>}
            {desc && <Font preset="desc" style={{ color: colors.desc, marginTop: 5 }}>{desc}</Font>}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}
