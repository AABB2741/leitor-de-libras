import { useLang } from "../../../contexts/lang";
import { useSettings } from "../../../contexts/settings";

import Toggle from "../../../components/Toggle";

import styles from "./styles";

export default function Performance() {
    const lang = useLang();
    const { settings, saveSettings } = useSettings();

    return (
        <Toggle
            label={lang.settings.display.performance.reduce_animations}
            value={settings.display.performance.reduce_animations}
            onValueChange={reduce_animations => saveSettings({ display: {performance: { reduce_animations }} })}
        />
    );
}
