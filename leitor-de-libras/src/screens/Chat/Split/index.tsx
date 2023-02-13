import React from "react";
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
import { useNavigation } from "@react-navigation/native";

import Loading from "../../../components/Loading";

import { useColors } from "../../../contexts/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import createStyles from "./styles";

interface SplitProps {
    mode: "split" | "normal";
    inverted: boolean;
    keyboardVisible?: boolean;
    occupied: string | boolean | null;
    setMode: React.Dispatch<React.SetStateAction<"split" | "normal">>
    setInverted: React.Dispatch<React.SetStateAction<boolean>>;
    handleSaveMessages: () => Promise<void>;
}

export default function Split({ mode, inverted, keyboardVisible, occupied, setMode, setInverted, handleSaveMessages }: SplitProps) {
    const colors = useColors();
    const styles = createStyles({ colors, mode });

    const navigation = useNavigation<NativeStackNavigationProp<TalkParamList, "Chat">>();
    
    if (keyboardVisible)
        return null;

    return (
        <View style={styles.container}>
            <View style={styles.options}>
                <TouchableOpacity disabled={!!occupied} style={styles.option} onPress={navigation.canGoBack() ? navigation.goBack : () => navigation.navigate("Conversations")}>
                    <ArrowLeft color={occupied ? colors.disabled : colors.font} size={24} />
                </TouchableOpacity>
                <TouchableOpacity disabled={!!occupied} style={styles.option} onPress={handleSaveMessages}>
                    <FloppyDisk color={occupied ? colors.disabled : colors.font} size={24} />
                    {occupied === "saving" && <Loading size={12} style={styles.saving} />}
                </TouchableOpacity>
            </View>
            <TouchableOpacity disabled={!!occupied} style={[styles.switch, { backgroundColor: inverted ? colors.accent2 : colors.accent }]} onPress={() => setInverted(!inverted)}>
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
                <TouchableOpacity disabled={!!occupied} style={styles.option} onPress={() => setMode("normal")}>
                    <Square
                        weight={mode === "normal" ? "fill" : "regular"}
                        color={mode === "normal" ? colors.accent2 : colors.font}
                        size={24}
                    />
                </TouchableOpacity>
                <TouchableOpacity disabled={!!occupied} style={styles.option} onPress={() => setMode("split")}>
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
