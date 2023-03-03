import {
    View
} from "react-native";

import { useLang } from "../../../contexts/lang";
import { useSettings } from "../../../contexts/settings";

import Toggle from "../../../components/Toggle";

import styles from "./styles";

export default function LiTalks() {
    const lang = useLang();
    const { settings, saveSettings } = useSettings();

    return (
        <View style={styles.container}>
            <Toggle
                label={lang.settings.accessibility.litalks.tts_on_msg}
                value={settings.accessibility.litalks.tts_on_msg}
                onValueChange={tts_on_msg => saveSettings({ accessibility: { litalks: { tts_on_msg } } })}
            />
            <Toggle
                label={lang.settings.accessibility.litalks.tts_say_name}
                value={settings.accessibility.litalks.tts_say_name}
                onValueChange={tts_say_name => saveSettings({ accessibility: { litalks: { tts_say_name } } })}
            />
        </View>
    );
}
