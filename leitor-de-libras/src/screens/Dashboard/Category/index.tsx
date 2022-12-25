import { CaretRight } from "phosphor-react-native";
import {
    View,
    Pressable as TouchableOpacity,
    FlatList,
    FlatListProps
} from "react-native";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/Colors";
import styles from "./styles";

interface Props<T> extends FlatListProps<T> {
    title?: string;
    pressable?: boolean;
}

export default function Category<T>({ title, ...rest }: Props<T>) {
    const colors = useColors();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.top}>
                <Font preset="subtitle" style={styles.title} numberOfLines={1}>{title}</Font>
                <CaretRight size={14} color={colors.font} />
            </TouchableOpacity>
            <FlatList
                {...rest}
                horizontal
            />
        </View>
    );
}
