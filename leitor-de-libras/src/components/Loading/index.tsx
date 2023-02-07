import { ViewProps } from "react-native";
import * as Animatable from "react-native-animatable";
import { useColors } from "../../contexts/colors";

import createStyles from "./styles";

interface LoadingProps extends ViewProps {
    size?: number;
}

export default function Loading({ size = 36, style, ...rest }: LoadingProps) {
    const colors = useColors();
    const styles = createStyles({ colors, size });

    return (
        <Animatable.View
            {...rest}
            animation="rotate"
            iterationCount="infinite"
            duration={1000}
            easing="linear"
            style={[styles.loading, Array.isArray(style) ? [...style] : style]}
        />
    );
}
