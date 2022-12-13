import {
    View,
    Image,
    ImageSourcePropType
} from "react-native";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/Colors";

import createStyles from "./styles";

export interface FileProps {
    thumbnail: ImageSourcePropType;
    title: string;
    date: Date;
}

export default function File({ thumbnail, title, date }: FileProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <Image style={styles.thumbnail} source={thumbnail} />
            <Font preset="text" style={styles.title} numberOfLines={1}>{title}</Font>
            <Font preset="text" style={styles.date} numberOfLines={1}>{`${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")} ∙ ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`}</Font>
        </View>
    );
}
