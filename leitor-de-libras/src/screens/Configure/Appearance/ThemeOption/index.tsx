import {
    View,
    Pressable
} from "react-native";
import { IconProps } from "phosphor-react-native";
import { useLang } from "../../../../contexts/lang";
import { useColors } from "../../../../contexts/colors";

import Font from "../../../../components/Font";
import Indicator from "../../../../components/Picker/Indicator";

import { ThemeName, ThemeProps } from "../../../../theme/getTheme";

import createStyles from "./styles";
import { useSettings } from "../../../../contexts/settings";

interface ThemeOptionProps {
    theme: ThemeName;
    icon: ({ color, size, weight }: IconProps) => React.ReactNode;
    sample: ThemeProps;
    name: string;
    example: string;
}

export default function ThemeOption({ theme, icon, sample, name, example }: ThemeOptionProps) {
    const { settings, saveSettings } = useSettings();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors, sample });

    return (
        <Pressable style={styles.container} onPress={settings.display.appearance.theme == theme ? (() => null) : () => saveSettings({display: {appearance: { theme }}})}>
            <View style={styles.presentation}>
                <View style={styles.infos}>
                    {icon({ color: colors.font, size: 20, weight: "fill" })}
                    <Font preset="button" style={styles.name}>{name}</Font>
                </View>
                <Indicator
                    value={settings.display.appearance.theme == theme}
                />
            </View>
            <View style={styles.preview}>
                <View style={styles.previewHeader}>
                    <View style={styles.previewIcon}>
                        {icon({ color: sample.accent, size: 16, weight: "regular" })}
                    </View>
                    <View style={styles.previewTitleContainer}>
                        <Font preset="title" style={styles.previewTitle}>{lang.settings.display.appearance.theme.hello_world}</Font>
                    </View>
                </View>
                <View style={styles.previewExampleContainer}>
                    <Font preset="text" style={styles.previewExample}>
                        {example}
                    </Font>
                </View>
            </View>
        </Pressable>
    );
}
