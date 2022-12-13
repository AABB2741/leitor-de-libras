import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import { ArrowDown, ArrowUp, MagnifyingGlass, X } from "phosphor-react-native";

import Sort from "../../@types/Sort";
import Order from "../../@types/Order";
import Input from "../Input";

import createStyles from "./styles";
import Font from "../Font";

interface Props {
    filter?: string;
    filterPlaceholder?: string;
    filterClearHidden?: boolean;
    filterAutoSubmit?: boolean;
    sort?: Sort;
    order?: Order;
    onFilterChange?: (filter: string) => void;
    onSortChange?: (sort: Sort) => void;
    onOrderChange?: (order: Order) => void;
}

export default function Filter({ filter, filterPlaceholder, filterClearHidden, filterAutoSubmit, order, onFilterChange, onOrderChange }: Props) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [filterState, setFilterState] = useState(filter ?? "");
    
    if (filter && !filterState) {
        onFilterChange?.("");
    }

    return (
        <View style={styles.container}>
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
                <Font preset="button">Data</Font>
                <TouchableOpacity onPress={() => onOrderChange?.(order == "desc" ? "asc" : "desc")} style={styles.order}>
                    { order == "desc" ? <ArrowDown color={colors.font} size={24} /> : <ArrowUp color={colors.font} size={24} /> }
                </TouchableOpacity>
            </View>
        </View>
    );
}
