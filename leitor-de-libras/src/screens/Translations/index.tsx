import { useState } from "react";
import {
    FlatList,
    View,
    RefreshControl
} from "react-native";
import {
    Archive,
    CloudCheck,
    DotsThreeVertical,
    Download,
    Export,
    HandWaving,
    MagnifyingGlass,
    PlusCircle,
    Trash
} from "phosphor-react-native";
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

import FILES from "../../constants/recordings";

type Props = NativeStackScreenProps<RootStackParamList, "Translations">;

export default function Translations({ navigation }: Props) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<Order>("asc");

    const OPTIONS: OptionProps[] = [{
        icon: props => <PlusCircle { ...props } />,
        label: lang.translations.options.create
    }, {
        icon: props => <Trash { ...props } />,
        label: lang.translations.options.delete
    }, {
        icon: props => <Download { ...props } />,
        label: lang.translations.options.import
    }, {
        icon: props => <Export { ...props } />,
        label: lang.translations.options.export
    }, {
        icon: props => <Archive { ...props } />,
        label: lang.translations.options.archive
    }, {
        icon: props => <CloudCheck { ...props } />,
        label: lang.translations.options.load
    }];

    return (
        <>
            <Header
                title={lang.translations.title}
                rightOptions={[{
                    icon: props => <MagnifyingGlass { ...props } />
                }, {
                    icon: props => <DotsThreeVertical { ...props } />
                }]}
            />
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={(
                        <>
                            <View>
                                <FlatList
                                    style={styles.optionsContainer}
                                    contentContainerStyle={styles.options}
                                    data={OPTIONS}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <Option {...item} key={index} />
                                    )}
                                />
                            </View>
                            <View style={styles.top}>
                                <Filter
                                    filter={search}
                                    filterPlaceholder={lang.translations.filter}
                                    order={order}
                                    onFilterChange={src => setSearch(src)}
                                    onOrderChange={order => setOrder(order)}
                                />
                            </View>
                        </>
                    )}
                    numColumns={3}
                    columnWrapperStyle={styles.files}
                    ListHeaderComponentStyle={{ padding: 0 }}
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
                            contentContainerStyle={{ marginHorizontal: 20 }}
                        />
                    ) : (
                        <Empty
                            icon={props => <HandWaving {...props} />}
                            title={lang.translations.empty_files.title}
                            desc={lang.translations.empty_files.desc}
                            contentContainerStyle={{ marginHorizontal: 20 }}
                            options={[{
                                label: lang.translations.empty_files.create_option,
                                highlight: true,
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
