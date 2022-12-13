import { useState } from "react";
import {
    View
} from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import Order from "../../@types/Order";

import Filter from "../../components/Filter";
import Header from "../../components/Header";
import Font from "../../components/Font";


import createStyles from "./styles";

export default function Translations() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [order, setOrder] = useState<Order>("asc");

    return (
        <>
            <Header title={lang.translations.title} />
            <View style={styles.container}>
                <Font preset="title" style={styles.title}>{lang.translations.title}</Font>
                <Filter filterPlaceholder={lang.translations.filter} order={order} onOrderChange={order => setOrder(order)} />
            </View>
        </>
    );
}
