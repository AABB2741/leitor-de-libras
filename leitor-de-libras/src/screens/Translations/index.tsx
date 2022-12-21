import { useState } from "react";
import {
    FlatList,
    View,
    TouchableOpacity,
    RefreshControl
} from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Order from "../../@types/Order";
import Option, { Props as OptionProps } from "./Option";

import Header from "../../components/Header";
import Empty from "../../components/Empty";
import File from "./File";
import Filter from "../../components/Filter";
import Font from "../../components/Font";

import normalize from "../../utils/normalize";
import createStyles from "./styles";
import { FileProps } from "./File";

import FILES from "../../constants/recordings";
import { Archive, CircleWavyQuestion, CloudCheck, Download, Export, HandWaving, List, MagnifyingGlass, Plus, PlusCircle, Trash } from "phosphor-react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Translations">;

export default function Translations({ navigation }: Props) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<Order>("asc");

    const OPTIONS: OptionProps[] = [{
        icon: ({ color, size }) => <PlusCircle color={color} size={size} />,
        label: lang.translations.options.create
    }, {
        icon: ({ color, size }) => <Trash color={color} size={size} />,
        label: lang.translations.options.delete
    }, {
        icon: ({ color, size }) => <Download color={color} size={size} />,
        label: lang.translations.options.import
    }, {
        icon: ({ color, size }) => <Export color={color} size={size} />,
        label: lang.translations.options.export
    }, {
        icon: ({ color, size }) => <Archive color={color} size={size} />,
        label: lang.translations.options.archive
    }, {
        icon: ({ color, size }) => <CloudCheck color={color} size={size} />,
        label: lang.translations.options.load
    }];

    return (
        <>
            <Header title={lang.translations.title} />
            <View>
                <FlatList
                    style={styles.optionsContainer}
                    contentContainerStyle={styles.options}
                    data={OPTIONS}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <Option { ...item } key={index} />
                    )}
                />
            </View>
            <View style={styles.top}>
                <View style={styles.presentation}>
                    <Font preset="title" >{lang.translations.title}</Font>
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
                    renderItem={({ item, index }) => <File {...item} key={index} />}
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
                                accent: true,
                                onPress: () => navigation.navigate("Camera")
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
