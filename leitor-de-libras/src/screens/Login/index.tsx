import { BackHandler, ScrollView, TouchableOpacity, View } from "react-native";
import { useLang } from "../../contexts/lang";
import { useColors } from "../../contexts/colors";
import { Globe } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Font from "../../components/Font";

import createStyles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

interface LoginProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}

export default function Login({ navigation }: LoginProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    useFocusEffect(useCallback(() => {
        function handleBack() {
            navigation.navigate("App");
            return true;
        }

        const sub = BackHandler.addEventListener("hardwareBackPress", handleBack);
        return () => sub.remove();
    }, []));


    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Font preset="title" style={styles.title}>{lang.login.title}</Font>
                <Font preset="desc" style={styles.desc}>{lang.login.desc}</Font>
            </ScrollView>
            <View style={styles.options}>
                <TouchableOpacity style={styles.lang}>
                    <Globe color={colors.font} size={24} />
                    <Font preset="button" style={{ marginLeft: 10 }}>{lang.locale}</Font>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("App")}>
                    <Font preset="button" style={styles.ignoreLabel}>{lang.login.ignore}</Font>
                </TouchableOpacity>
            </View>
        </>
    );
}
