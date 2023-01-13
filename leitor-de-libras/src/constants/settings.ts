import { LangName } from "../lang/getLang";
import { ThemeName } from "../theme/getTheme"

interface SettingsProps {
    display: {
        appearance: {
            theme: ThemeName,
            default_dark_mode: ThemeName,
            custom_fonts: boolean;
        },
        lang: LangName;
    }
}

const SETTINGS: SettingsProps = {
    display: {
        appearance: {
            theme: "auto",
            default_dark_mode: "dark",
            custom_fonts: true
        },
        lang: "auto"
    }
}

export default SETTINGS;
