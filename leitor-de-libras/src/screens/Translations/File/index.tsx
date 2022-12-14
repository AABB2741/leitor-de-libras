import {
    View,
    Image,
    ImageSourcePropType
} from "react-native";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/Colors";
import { useLang } from "../../../contexts/Lang";

import moment from "moment";

import createStyles from "./styles";

export interface FileProps {
    thumbnail: ImageSourcePropType;
    title: string;
    date: Date;
    length: number;
}

export default function File({ thumbnail, title, length, date }: FileProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    moment.updateLocale(lang.locale, {
        relativeTime: {
            ...lang.general.unity
        }
    });

    return (
        <View style={styles.container}>
            <Image style={styles.thumbnail} source={thumbnail} />
            <Font preset="text" style={styles.title} numberOfLines={1}>{title}</Font>
            <Font preset="text" style={styles.date} numberOfLines={1}>{`15min ∙ ${moment(date).fromNow()}`}</Font>
        </View>
    );
}
