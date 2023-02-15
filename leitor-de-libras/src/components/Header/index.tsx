import { CaretLeft, IconProps } from "phosphor-react-native";
import {
    View,
    ViewProps,
    TouchableOpacity,
    TouchableOpacityProps,
    Platform
} from "react-native";
import Constants from "expo-constants";

import { useNavigation } from "@react-navigation/native";
import { useColors } from "../../contexts/colors";

import Font from "../Font";

import createStyles from "./styles";

export interface HeaderOptionProps extends TouchableOpacityProps {
    icon: ({ color, size }: IconProps) => React.ReactNode;
}

interface HeaderProps extends ViewProps {
    hideBackButton?: boolean;
    title?: string;
    leftOptions?: HeaderOptionProps[];
    rightOptions?: HeaderOptionProps[];
    opacity?: number;
    disableTopSpacing?: boolean;
    statusBarFix?: boolean;
}

export default function Header({ hideBackButton, title, leftOptions, rightOptions, opacity, statusBarFix, ...rest }: HeaderProps) {
    const navigation = useNavigation();

    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <>
            <View style={[{ height: Constants.statusBarHeight, opacity }, { backgroundColor: colors.header }, (statusBarFix && Platform.OS === "android") && { backgroundColor: "#fff" }]} />
            <View {...rest} style={[styles.container, Array.isArray(rest.style) ? [ ...rest.style ] : rest.style]}>
                <View style={[styles.background, { opacity }]} />
                <View style={[styles.headerLeft, (!navigation.canGoBack() && !leftOptions?.length && !rightOptions?.length) && styles.headerPadding]}>
                    { (!hideBackButton && navigation.canGoBack()) && (
                        <TouchableOpacity style={styles.headerOption} onPress={navigation.goBack}>
                            <CaretLeft size={24} color={colors.font} />
                        </TouchableOpacity>
                    ) }
                    { leftOptions?.map(({ icon, ...rest }, i) => (
                        <TouchableOpacity { ...rest } style={styles.headerOption} key={i}>
                            { icon({ color: colors.font, size: 24 }) }
                        </TouchableOpacity>
                    )) }
                    <Font family="ubuntu" style={[styles.title, hideBackButton && { paddingLeft: 20 }, { opacity }]} numberOfLines={1}>{title}</Font>
                </View>
                <View style={styles.headerRight}>
                    { rightOptions?.map(({ icon, ...rest }, i) => (
                        <TouchableOpacity { ...rest } style={styles.headerOption} key={i}>
                            { icon({ color: colors.font, size: 24 }) }
                        </TouchableOpacity>
                    )) }
                </View>
            </View>
        </>
    );
}
