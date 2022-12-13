import { MagnifyingGlassMinus } from "phosphor-react-native";
import {
    View,
    ViewStyle,
    TouchableOpacity
} from "react-native";
import { useColors } from "../../contexts/Colors";
import { useLang } from "../../contexts/Lang";

import Font from "../Font";

import Theme from "../../@types/Theme";

import createStyles from "./styles";
import IconWeight from "../../@types/IconWeight";

interface OptionProps {
    label?: string;
    accent?: boolean;
    onPress?: () => void;
}

interface IconProps {
    color?: string;
    size?: number;
    weight?: IconWeight;
}

interface Props {
    icon?: ({ color, size }: IconProps) => React.ReactNode;
    title?: string;
    desc?: string;
    options?: OptionProps[];
    contentContainerStyle?: ViewStyle;
}

export default function Empty({ icon, title, desc, options, contentContainerStyle }: Props) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <View style={[styles.container, contentContainerStyle]}>
            { icon ? icon({ color: colors.desc3, weight: "duotone", size: 36}) : <MagnifyingGlassMinus color={colors.desc3} weight="fill" size={36} /> }
            <Font preset="subtitle" style={styles.title}>{title ?? lang.empty.title}</Font>
            <Font preset="desc" style={styles.desc}>{desc ?? lang.empty.desc}</Font>
            <View style={styles.options}>
                {options?.map((o, i) => (
                    <TouchableOpacity style={[styles.option, o.accent && { backgroundColor: colors.accent }]} key={i}>
                        <Font preset="button" style={[styles.optionLabel, { color: o.accent ? colors.font2 : colors.accent }]}>{o.label}</Font>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
