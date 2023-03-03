import { useState } from "react";
import {
    TouchableOpacity,
    View
} from "react-native";
import { SpeakerHigh, SpeakerNone } from "phosphor-react-native";
import * as Tts from "../../../services/Tts";

import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import Font from "../../../components/Font";

import createStyles from "./styles";

interface MsgBoxProps extends Msg {
    pov: "owner" | "guest";
    forceSpeaking?: boolean;
}

export default function MsgBox({ message, from, date, pov, forceSpeaking }: MsgBoxProps) {
    const invert = from !== pov;

    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors, from, invert });

    const [speaking, setSpeaking] = useState(forceSpeaking ?? false);

    const d = new Date(date);

    // TODO: Colocar para mudar o idioma de fala
    function handleSpeak() {
        Tts.speak(message, {
            onStart: () => setSpeaking(true),
            onDone: () => setSpeaking(false),
            onStopped: () => setSpeaking(false)
        });
    }

    function handleStopSpeaking() {
        Tts.stop();
        setSpeaking(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TouchableOpacity style={styles.speak} onPress={speaking ? handleStopSpeaking : handleSpeak}>
                    {speaking ? <SpeakerHigh color={colors.font} size={18} weight="fill" /> : <SpeakerNone color={colors.desc3} size={18} />}
                </TouchableOpacity>
                <Font style={styles.text}>{message}</Font>
            </View>
            <Font style={styles.date}>{lang.general.formats.time.replace("hh", `${d.getHours().toString().padStart(2, "0")}`).replace("mm", d.getMinutes().toString().padStart(2, "0"))}</Font>
        </View>
    );
}
