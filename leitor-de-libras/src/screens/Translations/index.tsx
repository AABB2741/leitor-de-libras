import { useState } from "react";
import {
    FlatList,
    View
} from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import Order from "../../@types/Order";

import File from "./File";
import Filter from "../../components/Filter";
import Header from "../../components/Header";
import Font from "../../components/Font";

import normalize from "../../utils/normalize";
import createStyles from "./styles";
import { FileProps } from "./File";

const FILES: FileProps[] = [{
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Tradução de teste 1. Boa noite!",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2020/01/02 01:01:01")
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date()
}, {
    thumbnail: require("../../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste tessfasfs da tradução",
    date: new Date()
}]

export default function Translations() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<Order>("asc");

    return (
        <>
            <Header title={lang.translations.title} />
            <View style={styles.container}>
                <View style={styles.top}>
                    <Font preset="title" style={styles.title}>{lang.translations.title}</Font>
                    <Filter
                        filter={search}
                        filterPlaceholder={lang.translations.filter}
                        order={order}
                        onFilterChange={src => setSearch(src)}
                        onOrderChange={order => setOrder(order)}
                    />
                </View>
                <FlatList
                    numColumns={3}
                    columnWrapperStyle={styles.files}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    data={FILES.filter(f => normalize(f.title, true).includes(normalize(search, true)))}
                    renderItem={({ item, index }) => <File { ...item } key={index} />}
                />
            </View>
        </>
    );
}
