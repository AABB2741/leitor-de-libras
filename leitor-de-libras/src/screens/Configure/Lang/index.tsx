import {
    View
} from "react-native";
import FixedCategory from "../../../components/FixedCategory";
import Picker from "../../../components/Picker";
import { useLang } from "../../../contexts/lang";
import { useSettings } from "../../../contexts/settings";

import styles from "./styles";

import getLang, { LangName, LANGS } from "../../../lang/getLang";

export default function Lang() {
    const { settings, saveSettings } = useSettings();
    const lang = useLang();

    return (
        <View style={styles.container}>
            <FixedCategory
                title={lang.settings.display.lang.lang.title}
                desc={lang.settings.display.lang.lang.desc}
                disableVerticalSpacing
            >
                <Picker
                    options={[{
                        label: lang.settings.display.lang.lang.auto.replace("%s", lang.langName),
                        value: "auto",
                        default: true
                    }, ...LANGS.map(l => ({
                        label: l.lang.langName,
                        value: l.name
                    }))]}
                    value={settings.display.lang}
                    onValueChange={lang => saveSettings({ display: { lang } } as { display: { lang: LangName } })}
                />
            </FixedCategory>
            <FixedCategory
                title={lang.settings.display.lang.auto_translate.title}
                desc={lang.settings.display.lang.auto_translate.desc}
            />
        </View>
    );
}
