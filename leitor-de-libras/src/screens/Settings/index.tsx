import { useState } from "react";
import {
    View,
    ScrollView
} from "react-native";
import { GearSix, MagnifyingGlass } from "phosphor-react-native";

import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";

import Font from "../../components/Font";
import Header from "../../components/Header";

import createStyles from "./styles";

export default function Settings() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [headerY, setHeaderY] = useState(0);
    const [opacity, setOpacity] = useState(0);

    return (
        <ScrollView
            style={styles.container}
            stickyHeaderIndices={[1]}
            onScroll={e => {
                const { y } = e.nativeEvent.contentOffset;
                setOpacity(y / headerY);
            }}
        >
            <View style={styles.presentation} onLayout={e => setHeaderY(e.nativeEvent.layout.height)}>
                <GearSix size={36} weight="fill" color={colors.font} />
                <Font preset="title" style={styles.title}>{lang.settings.title}</Font>
            </View>
            <Header
                title={lang.settings.title}
                opacity={opacity}
                rightOptions={[{
                    icon: ({ color, size }) => <MagnifyingGlass color={color} size={size} />
                }]}
            />
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
            <Font preset="desc">Teste</Font>
        </ScrollView>
    );
}
