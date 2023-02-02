import {
    View
} from "react-native";

import Font from "../../../components/Font";
import { useColors } from "../../../contexts/colors";

import createStyles from "./styles";

interface MsgBoxProps extends Msg {
    invert?: boolean;
}

export default function MsgBox({ message, from, date, invert }: MsgBoxProps) {
    const colors = useColors();
    const styles = createStyles({ colors, from, invert });

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Font preset="text" style={styles.text}>{message}</Font>
            </View>
            <Font preset="desc" style={styles.date}>16:12</Font>
        </View>
    );
}
