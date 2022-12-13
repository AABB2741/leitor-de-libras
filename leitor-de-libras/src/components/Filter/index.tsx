import { TouchableOpacity, View } from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import { ArrowDown, ArrowUp, MagnifyingGlass } from "phosphor-react-native";

import Sort from "../../@types/Sort";
import Order from "../../@types/Order";
import Input from "../Input";

import createStyles from "./styles";

interface Props {
    filterPlaceholder?: string;
    sort?: Sort;
    order?: Order;
    onSortChange?: () => Sort;
    onOrderChange?: (order: Order) => void;
}

export default function Filter({ filterPlaceholder, order, onOrderChange }: Props) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <View style={styles.filter}>
                <MagnifyingGlass color={colors.font} size={24} />
                <Input style={styles.filterInput} placeholder={filterPlaceholder ?? lang.general.filter} />
            </View>
            <View style={styles.sort}>
                <TouchableOpacity onPress={() => onOrderChange?.(order == "desc" ? "asc" : "desc")}>
                    { order == "desc" ? <ArrowDown color={colors.font} size={24} /> : <ArrowUp color={colors.font} size={24} /> }
                </TouchableOpacity>
            </View>
        </View>
    );
}
