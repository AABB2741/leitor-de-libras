import { ArrowLeft } from "phosphor-react-native";
import {
    View,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useColors } from "../../contexts/Colors";

import Font from "../Font";

import createStyles from "./styles";

interface IconProps {
    color?: string;
    size?: number;
}

export interface HeaderOptionProps extends TouchableOpacityProps {
    icon: ({ color, size }: IconProps) => React.ReactNode;
}

interface Props {
    hideBackButton?: boolean;
    title?: string;
    leftOptions?: HeaderOptionProps[];
    rightOptions?: HeaderOptionProps[];
}

export default function Header({ hideBackButton, title, leftOptions, rightOptions }: Props) {
    const navigation = useNavigation();

    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <View style={[styles.headerLeft, (!navigation.canGoBack() && !leftOptions?.length && !rightOptions?.length) && styles.headerPadding]}>
                { (!hideBackButton && navigation.canGoBack()) && (
                    <TouchableOpacity style={styles.headerOption} onPress={navigation.goBack}>
                        <ArrowLeft size={24} color={colors.font} />
                    </TouchableOpacity>
                ) }
                { leftOptions?.map(({ icon, ...rest }, i) => (
                    <TouchableOpacity { ...rest } style={styles.headerOption} key={i}>
                        { icon({ color: colors.font, size: 24 }) }
                    </TouchableOpacity>
                )) }
                <Font preset="subtitle" style={styles.title} numberOfLines={1}>{title}</Font>
                { rightOptions?.map(({ icon, ...rest }, i) => (
                    <TouchableOpacity { ...rest } style={styles.headerOption} key={i}>
                        { icon({ color: colors.font, size: 24 }) }
                    </TouchableOpacity>
                )) }
            </View>
            <View style={styles.headerRight}></View>
        </View>
    );
}
