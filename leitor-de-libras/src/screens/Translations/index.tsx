import {
    View
} from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";

import Font from "../../components/Font";

import Filter from "../../components/Filter";

import createStyles from "./styles";

export default function Translations() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <Font preset="title" style={styles.title}>{lang.translations.title}</Font>
            <Filter />
        </View>
    );
}
