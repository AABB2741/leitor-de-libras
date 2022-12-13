import { View } from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";
import { MagnifyingGlass } from "phosphor-react-native";

import Sort from "../../@types/Sort";
import Input from "../Input";

import createStyles from "./styles";

interface Props {
    filterPlaceholder?: string;
    order?: "asc" | "desc";
    sort?: Sort;
}

export default function Filter({ filterPlaceholder }: Props) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <View style={styles.filter}>
                <MagnifyingGlass color={colors.font} size={24} />
                <Input style={styles.filterInput} placeholder={filterPlaceholder ?? lang.general.filter} />
            </View>
        </View>
    );
}
