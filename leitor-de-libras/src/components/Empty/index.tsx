import { MagnifyingGlassMinus } from "phosphor-react-native";
import {
    View,
    ViewStyle,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import Button from "../Button";

import Font from "../Font";

import createStyles from "./styles";

interface OptionProps extends TouchableOpacityProps {
    label?: string;
    highlight?: boolean;
}

interface IconProps {
    color?: string;
    size?: number;
}

interface EmptyProps {
    icon?: ({ color, size }: IconProps) => React.ReactNode;
    title?: string;
    desc?: string;
    options?: OptionProps[];
    contentContainerStyle?: ViewStyle;
}

export default function Empty({ icon, title, desc, options, contentContainerStyle }: EmptyProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={[styles.container, contentContainerStyle]}>
            {icon ? icon({ color: colors.desc3, size: 24 }) : <MagnifyingGlassMinus color={colors.desc3} weight="fill" size={36} />}
            <Font preset="subtitle" style={styles.title}>{title ?? lang.empty.title}</Font>
            <Font preset="desc" style={styles.desc}>{desc ?? lang.empty.desc}</Font>
            <View style={styles.options}>
                {options?.map(({ highlight, label, ...rest }, i) => (
                    <Button
                        highlight={highlight}
                        label={label}
                        key={i}
                        { ...rest }
                    />
                ))}
            </View>
        </View>
    );
}
