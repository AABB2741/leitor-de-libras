import * as Animatable from "react-native-animatable";
import { useColors } from "../../contexts/colors";

import createStyles from "./styles";

interface LoadingProps {
    size?: number;
}

export default function Loading({ size = 36 }: LoadingProps) {
    const colors = useColors();
    const styles = createStyles({ colors, size });

    return (
        <Animatable.View
            animation="rotate"
            iterationCount="infinite"
            duration={1000}
            easing="linear"
            style={styles.loading}
        />
    );
}
