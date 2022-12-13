import { View } from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";

import Sort from "../../@types/Sort";

import createStyles from "./styles";
import { MagnifyingGlass } from "phosphor-react-native";

interface Props {
    filterPlaceholder?: string;
    order?: "asc" | "desc";
    sort?: Sort;
}

export default function Filter() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <View style={styles.filter}>
                <MagnifyingGlass color={colors.font} size={24} />
            </View>
        </View>
    );
}
