import {
    View,
    Pressable
} from "react-native";
import { useLang } from "../../../../contexts/Lang";
import { useColors } from "../../../../contexts/Colors";

import Theme from "../../../../@types/Theme";

import Font from "../../../../components/Font";

import createStyles from "./styles";

interface Props {
    icon: ({ color, size, weight }: { color: string, size: number, weight: "regular" | "fill" }) => React.ReactNode;
    sample: Theme;
    name: string;
    example: string;
}

export default function ThemeOption({ icon, sample, name, example }: Props) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors, sample });

    return (
        <Pressable style={styles.container}>
            <View style={styles.presentation}>
                <View style={styles.infos}>
                    {icon({ color: colors.font, size: 20, weight: "fill" })}
                    <Font preset="subtitle" style={styles.name}>{name}</Font>
                </View>
            </View>
            <View style={styles.preview}>
                <View style={styles.previewHeader}>
                    <View style={styles.previewIcon}>
                        {icon({ color: sample.font, size: 16, weight: "regular" })}
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
