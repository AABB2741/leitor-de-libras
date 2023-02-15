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
    disableVerticalSpacing?: boolean;
}

// Colocar margin-right de 10 pixels para cada elemento da lista
export default function Category<T>({ title, pressable, disableVerticalSpacing = true, ...rest }: CategoryProps<T>) {
    const colors = useColors();

    return (
        <View style={!disableVerticalSpacing && {marginTop: 20}}>
            <TouchableOpacity style={styles.top}>
                <Font family="ubuntu" style={[styles.title, !disableVerticalSpacing && { marginBottom: 10 }]} numberOfLines={1}>{title}</Font>
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
