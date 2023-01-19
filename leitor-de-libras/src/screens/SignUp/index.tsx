import {
    View,
    ScrollView
} from "react-native";
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";

import Font from "../../components/Font";

import createStyles from "./styles";

export default function SignUp() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Font preset="title" style={styles.title}>{lang.sign_up.title}</Font>
                <Font preset="desc" style={styles.desc}>{lang.sign_up.desc}</Font>
            </ScrollView>
        </View>
    );
}