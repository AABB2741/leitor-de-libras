
import {
    ScrollView,
    View
} from "react-native";
import { useColors } from "../../contexts/colors";

import Header from "../../components/Header";
import Font from "../../components/Font";

import createStyles from "./styles";

export default function Watch() {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <Header
                title="Tradução"
            />
            {/* <View></View>  -> Área do vídeo */}
            <ScrollView style={styles.scroll}>
                <Font preset="title" style={styles.title}>Título do vídeo</Font>
                <ScrollView
                    contentContainerStyle={styles.options}
                    horizontal
                ></ScrollView>
            </ScrollView>
        </View>
    );
}