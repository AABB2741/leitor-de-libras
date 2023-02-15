import {
    View,
    ScrollView
} from "react-native";

import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import Font from "../../Font";

import createStyles from "./styles";

export default function ResetPassword() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Font family="black" style={styles.title}>{lang.reset_password.title}</Font>
                <Font style={styles.desc}>{lang.reset_password.desc}</Font>
            </ScrollView>
        </View>
    );
}
