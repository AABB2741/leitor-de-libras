import {
    TouchableOpacity,
    View
} from "react-native";
import {
    ArrowLeft,
    ArrowsClockwise,
    ArrowsDownUp,
    FloppyDisk,
    Square,
    SquareHalfBottom
} from "phosphor-react-native";

import { useColors } from "../../../contexts/colors";

import createStyles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

interface SplitProps {
    mode: "split" | "normal";
    inverted: boolean;
    keyboardVisible?: boolean;
    setMode: React.Dispatch<React.SetStateAction<"split" | "normal">>
    setInverted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Split({ mode, inverted, keyboardVisible, setMode, setInverted }: SplitProps) {
    const colors = useColors();
    const styles = createStyles({ colors, mode });

    const navigation = useNavigation<NativeStackNavigationProp<TalkParamList, "Chat">>();
    
    if (keyboardVisible)
        return null;

    return (
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity style={styles.option} onPress={navigation.canGoBack() ? navigation.goBack : () => navigation.navigate("Conversations")}>
                    <ArrowLeft color={colors.font} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <FloppyDisk color={colors.font} size={24} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.switch, { backgroundColor: inverted ? colors.accent2 : colors.accent }]} onPress={() => setInverted(!inverted)}>
                {mode === "normal" ? (
                    <ArrowsClockwise
                        size={24}
                        color={colors.font2}
                    />
                ) : (
                    <ArrowsDownUp
                        size={24}
                        color={colors.font2}
                    />
                )}
            </TouchableOpacity>
            <View style={styles.options}>
                <TouchableOpacity style={styles.option} onPress={() => setMode("normal")}>
                    <Square
                        weight={mode === "normal" ? "fill" : "regular"}
                        color={mode === "normal" ? colors.accent2 : colors.font}
                        size={24}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => setMode("split")}>
                    <SquareHalfBottom
                        weight={mode === "split" ? "fill" : "regular"}
                        color={mode === "split" ? colors.accent2 : colors.font}
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}
