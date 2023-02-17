import {
    Image,
    ImageSourcePropType,
    ScrollView,
    TouchableOpacity,
    TouchableOpacityProps,
    View
} from "react-native";
import { useColors } from "../../contexts/colors";
import Button from "../Button";

import Font from "../Font";

import createStyles from "./styles";

interface OptionProps extends TouchableOpacityProps {
    label?: string;
    highlight?: boolean;
}

interface MessageProps {
    title?: string;
    text?: string;
    image?: ImageSourcePropType;
    options?: OptionProps[]
}

export default function Message({ title, text, image, options }: MessageProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.top}>
                    {title && <Font family="black" style={styles.title}>{title}</Font>}
                    {text && <Font style={styles.text}>{text}</Font>}
                </View>
                {image && <Image source={image} style={styles.image} />}
            </ScrollView>
            <View style={styles.options}>
                {options?.map((o, index) => <Button {...o} key={index} />)}
            </View>
        </View>
    );
}
