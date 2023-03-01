import { SpeakerHigh } from "phosphor-react-native";
import {
    TouchableOpacity,
    View
} from "react-native";

import Font from "../../../components/Font";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import createStyles from "./styles";

interface MsgBoxProps extends Msg {
    pov: "owner" | "guest";
}

export default function MsgBox({ message, from, date, pov }: MsgBoxProps) {
    const invert = from !== pov;

    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors, from, invert });

    const d = new Date(date);

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TouchableOpacity style={[styles.speak, invert && { display: "none" }]}>
                    <SpeakerHigh color={colors.desc3} size={18} />
                </TouchableOpacity>
                <Font style={styles.text}>{message}</Font>
                <TouchableOpacity style={[styles.speak, !invert && { display: "none" }]}>
                    <SpeakerHigh color={colors.desc3} size={18} />
                </TouchableOpacity>
            </View>
            <Font style={styles.date}>{lang.general.formats.time.replace("hh", `${d.getHours().toString().padStart(2, "0")}`).replace("mm", d.getMinutes().toString().padStart(2, "0"))}</Font>
        </View>
    );
}
