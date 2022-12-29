import {
    View,
    Image,
    ImageSourcePropType
} from "react-native";
import Font from "../../../components/Font";
import { useColors } from "../../../contexts/Colors";
import { useLang } from "../../../contexts/Lang";
import * as Animatable from "react-native-animatable";

import moment from "moment";

import createStyles from "./styles";

export interface FileProps {
    thumbnail: ImageSourcePropType;
    title: string;
    date: Date;
    length: number;
    index: number;
}

export default function File({ thumbnail, title, length, date, index }: FileProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    moment.updateLocale(lang.locale, {
        relativeTime: {
            ...lang.general.unity
        }
    });

    return (
        <Animatable.View style={styles.container} animation="fadeInUp" delay={index * 50}>
            <Image style={styles.thumbnail} source={thumbnail} />
            <Font preset="text" style={styles.title} numberOfLines={1}>{title}</Font>
            <Font preset="text" style={styles.date} numberOfLines={1}>{`15min ∙ ${moment(date).fromNow()}`}</Font>
        </Animatable.View>
    );
}
