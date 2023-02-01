import { LangName } from "../lang/getLang";
import { ThemeName } from "../theme/getTheme"

export interface SettingsProps {
    display: {
        appearance: {
            theme: ThemeName,
            default_dark_mode: ThemeName,
            custom_fonts: boolean;
            connection_alerts: boolean;
        },
        lang: LangName;
        performance: {
            reduce_animations: boolean;
        }
    }
}

const SETTINGS: SettingsProps = {
    display: {
        appearance: {
            theme: "auto",
            default_dark_mode: "dark",
            custom_fonts: true,
            connection_alerts: true   
        },
        lang: "auto",
        performance: {
            reduce_animations: false
        }
    }
}

export default SETTINGS;
