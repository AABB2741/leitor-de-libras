import { useState } from "react";
import {
    FlatList,
    View,
    TouchableOpacity,
    RefreshControl
} from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import Order from "../../@types/Order";

import Header from "../../components/Header";
import Empty from "../../components/Empty";
import File from "./File";
import Filter from "../../components/Filter";
import Font from "../../components/Font";

import normalize from "../../utils/normalize";
import createStyles from "./styles";
import { FileProps } from "./File";

import FILES from "../../constants/recordings";
import { CircleWavyQuestion, HandWaving, MagnifyingGlass, Plus } from "phosphor-react-native";

export default function Translations() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<Order>("asc");

    return (
        <>
            <Header title={lang.translations.title} />
            <View style={styles.top}>
                <View style={styles.presentation}>
                    <Font
                        preset="title"
                        style={styles.title}
                    >{lang.translations.title}</Font>
                    <TouchableOpacity style={styles.create}>
                        <Plus color={colors.font2} size={16} />
                    </TouchableOpacity>
                </View>
                <Filter
                    filter={search}
                    filterPlaceholder={lang.translations.filter}
                    order={order}
                    onFilterChange={src => setSearch(src)}
                    onOrderChange={order => setOrder(order)}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    numColumns={3}
                    columnWrapperStyle={styles.files}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    data={FILES.filter(f => normalize(f.title, true).includes(normalize(search, true)))}
                    renderItem={({ item, index }) => <File { ...item } key={index} />}
                    refreshControl={(
                        <RefreshControl
                            refreshing={refreshing}
                        />
                    )}
                    ListEmptyComponent={search ? (
                            <Empty
                                icon={props => <MagnifyingGlass {...props} />}
                                title={lang.translations.empty_search.title}
                                desc={lang.translations.empty_search.desc}
                                contentContainerStyle={{ marginHorizontal: 10 }}
                            />
                        ) : (
                            <Empty
                                icon={props => <HandWaving {...props} />}
                                title={lang.translations.empty_files.title}
                                desc={lang.translations.empty_files.desc}
                                contentContainerStyle={{ marginHorizontal: 10 }}
                                options={[{
                                    label: lang.translations.empty_files.create_option,
                                    accent: true
                                }, {
                                    label: lang.translations.empty_files.send_option
                                }]}
                            />
                    )}
                >   
                </FlatList>
            </View>
        </>
    );
}
