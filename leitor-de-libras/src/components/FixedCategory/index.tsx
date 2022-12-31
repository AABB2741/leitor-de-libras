import {
    View,
    ViewProps
} from "react-native";

import Font from "../Font";

import styles from "./styles";

interface Props extends ViewProps {
    title?: string,
}

export default function FixedCategory({ title, children, ...rest }: Props) {
    return (
        <View {...rest}>
            {title && <Font preset="subtitle">{title}</Font>}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}
