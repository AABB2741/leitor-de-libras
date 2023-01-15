import { CaretRight } from "phosphor-react-native";
import {
    View,
    Pressable as TouchableOpacity,
    FlatList,
    FlatListProps
} from "react-native";
import Font from "../Font";
import { useColors } from "../../contexts/colors";

import styles from "./styles";

interface CategoryProps<T> extends FlatListProps<T> {
    title?: string;
    pressable?: boolean;
    verticalSpacing?: boolean;
}

// Colocar margin-right de 10 pixels para cada elemento da lista
export default function Category<T>({ title, pressable, verticalSpacing = true, ...rest }: CategoryProps<T>) {
    const colors = useColors();

    return (
        <View style={verticalSpacing && {marginTop: 20}}>
            <TouchableOpacity style={styles.top}>
                <Font preset="subtitle" style={[styles.title, verticalSpacing && { marginBottom: 10 }]} numberOfLines={1}>{title}</Font>
                {pressable && <CaretRight size={14} color={colors.font} />}
            </TouchableOpacity>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
                {...rest}
            />
        </View>
    );
}
