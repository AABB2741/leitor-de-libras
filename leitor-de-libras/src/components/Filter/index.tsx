import { useState } from "react";
import {
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import { MagnifyingGlass, SortAscending, SortDescending, X } from "phosphor-react-native";

import Sort from "../../@types/Sort";
import Order from "../../@types/Order";
import Input from "../Input";

import createStyles from "./styles";
import Select from "../Select";

interface FilterProps extends ViewStyle {
    filter?: string;
    filterPlaceholder?: string;
    filterClearHidden?: boolean;
    filterAutoSubmit?: boolean;
    sort?: Sort;
    order?: Order;
    contentContainerStyle?: ViewStyle;
    onFilterChange?: (filter: string) => void;
    onSortChange?: (sort: Sort) => void;
    onOrderChange?: (order: Order) => void;
}

export default function Filter({ filter, filterPlaceholder, filterClearHidden, filterAutoSubmit, order, onFilterChange, onOrderChange, contentContainerStyle }: FilterProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [filterState, setFilterState] = useState(filter ?? "");
    
    if (filter && !filterState) {
        onFilterChange?.("");
    }

    return (
        <View style={[styles.container, contentContainerStyle]}>
            <View style={styles.filter}>
                {(filterState && !filterClearHidden) ? (
                    <TouchableOpacity onPress={() => {
                        onFilterChange?.("")
                        setFilterState("");
                    }}>
                        <X color={colors.font} size={24} />
                    </TouchableOpacity>
                ) : (
                    <MagnifyingGlass color={colors.font} size={24} />
                )}
                <Input
                    style={styles.filterInput}
                    placeholder={filterPlaceholder ?? lang.general.filter}
                    value={filterState}
                    onChangeText={text => filterAutoSubmit ? onFilterChange?.(text) : setFilterState(text)}
                    onSubmitEditing={() => onFilterChange?.(filterState)}
                />
            </View>
            <View style={styles.sort}>
                <Select
                    label="Data"
                    value="Vasco"
                    options={[]}
                    disableStyles
                />
                <TouchableOpacity onPress={() => onOrderChange?.(order == "desc" ? "asc" : "desc")} style={styles.order}>
                    { order == "desc" ? <SortAscending color={colors.font} size={24} /> : <SortDescending color={colors.font} size={24} /> }
                </TouchableOpacity>
            </View>
        </View>
    );
}
