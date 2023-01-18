import {
    BackHandler,
    ScrollView,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import { useLang } from "../../contexts/lang";
import { useColors } from "../../contexts/colors";
import { Globe } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Font from "../../components/Font";

import createStyles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import FixedCategory from "../../components/FixedCategory";
import Input from "../../components/Input";
import Button from "../../components/Button";

interface LoginProps {
    navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
}

export default function Login({ navigation }: LoginProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                <Image source={require("../../../assets/imgs/login.png")} style={styles.image} />
                <FixedCategory title={lang.general.login}>
                    <Input
                        noTopPadding
                        label={lang.profile.personal_data.email}
                        placeholder={lang.profile.personal_data.email_placeholder}
                        onChangeText={email => setEmail(email)}
                        onRequestClear={() => setEmail("")}
                        value={email}
                    />
                    <Input
                        label={lang.profile.personal_data.password}
                        placeholder={lang.profile.personal_data.password_placeholder}
                        secureTextEntry
                        onChangeText={password => setPassword(password)}
                        onRequestClear={() => setPassword("")}
                        value={password}
                    />
                    <Button
                        accentColor={colors.accent2}
                        label={lang.profile.personal_data.password_forgot}
                    />
                    <Button
                        highlight
                        label={lang.general.login}
                        style={{ marginTop: 20 }}
                    />
                    <Button
                        label={lang.general.signup}
                    />
                </FixedCategory>
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
