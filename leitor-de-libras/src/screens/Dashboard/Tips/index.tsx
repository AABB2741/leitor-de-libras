import {
    ArrowSquareOut,
    Heart,
    ShareNetwork,
    Shuffle
} from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import createStyles from "./styles";

type TipMode = "curiosity" | "tip";

export default function Tips() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <View>
                <Font preset="desc-bold" style={styles.content}>{lang.dashboard.tips.curiosity} <Font preset="desc">Libras não se resume a escrever palavras, mas usa outros parâmetros, como expressões faciais e gestos.</Font></Font>
            </View>
            <View style={styles.options}>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button}>
                        <Shuffle size={24} color={colors.font} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Heart size={24} color={colors.font} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <ShareNetwork size={24} color={colors.font} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.visit}>
                    <Font preset="button" style={styles.visitLabel}>{lang.dashboard.tips.learn_more}</Font>
                    <ArrowSquareOut size={16} color={colors.accent} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
