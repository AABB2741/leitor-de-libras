import { ArrowLeft } from "phosphor-react-native";
import {
    View,
    TouchableOpacity
} from "react-native";
import { useColors } from "../../contexts/Colors";
import Font from "../Font";
import createStyles from "./styles";

export interface HeaderOptionProps {
    icon: React.ReactNode;
    disabled?: boolean;
    onPress?: () => void;
}
export type HeaderOption = HeaderOptionProps;

interface Props {
    hideBackButton?: boolean;
    title?: string;
    leftOptions?: HeaderOption[];
    rightOptions?: HeaderOption[];
}

export default function Header({ hideBackButton, title, leftOptions, rightOptions }: Props) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <View style={styles.container}>
            <View style={styles.headerLeft}>
                { !hideBackButton && (
                    <TouchableOpacity style={styles.headerOption}>
                        <ArrowLeft size={24} color={colors.font} />
                    </TouchableOpacity>
                ) }
                <Font preset="subtitle" style={styles.title}>{title}</Font>
            </View>
            <View style={styles.headerRight}></View>
        </View>
    );
}
