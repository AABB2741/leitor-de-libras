import {
    View,
    Image,
    ImageSourcePropType
} from "react-native";
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
        </View>
    );
}
