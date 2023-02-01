import { useCallback, useState } from "react";
import {
    BackHandler,
    ScrollView,
    TouchableOpacity,
    View,
    Image
} from "react-native";
import {
    useFocusEffect
} from "@react-navigation/native";

import { Globe } from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Storage from "../../../services/Storage";

import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";

import Font from "../../Font";

import FixedCategory from "../../FixedCategory";
import Input from "../../Input";
import Button from "../../Button";

import createStyles from "./styles";

interface LoginProps {
    navigation: NativeStackNavigationProp<LoginParamList, "Login">;
}

export default function Login({ navigation }: LoginProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useFocusEffect(useCallback(() => {
        function handleBack() {
            return true;
        }

        const sub = BackHandler.addEventListener("hardwareBackPress", handleBack);
        return sub.remove;
    }, []));


    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Font preset="title" style={styles.title}>{lang.login.title}</Font>
                <Font preset="desc" style={styles.desc}>{lang.login.desc}</Font>
                <Image source={colors.themeName === "light" ? require("../../../../assets/imgs/login-light.png") : require("../../../../assets/imgs/login.png")} style={styles.image} />
                <FixedCategory title={lang.general.login}>
                    <Input
                        label={lang.profile.personal_data.email}
                        placeholder={lang.profile.personal_data.email_placeholder}
                        onChangeText={email => setEmail(email)}
                        value={email}
                    />
                    <Input
                        label={lang.profile.personal_data.password}
                        placeholder={lang.profile.personal_data.password_placeholder}
                        secureTextEntry
                        onChangeText={password => setPassword(password)}
                        value={password}
                    />
                    <Button
                        accentColor={colors.accent2}
                        label={lang.profile.personal_data.password_forgot}
                        onPress={() => navigation.navigate("ResetPassword")}
                        labelStyle={{ fontSize: 12 }}
                    />
                    <Button
                        highlight
                        label={lang.general.login}
                        style={{ marginTop: 20 }}
                    />
                    <Button
                        label={lang.general.signup}
                        onPress={() => navigation.navigate("SignUp")}
                    />
                </FixedCategory>
            </ScrollView>
            <View style={styles.options}>
                <TouchableOpacity style={styles.lang}>
                    <Globe color={colors.font} size={24} />
                    <Font preset="button" style={{ marginLeft: 10 }}>{lang.locale}</Font>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Storage.mergeItem("@welcome", {
                        skip_login: true
                    }).then(() => {
                        // setRoute("AppRoutes");
                    });
                }}>
                    <Font preset="button" style={styles.ignoreLabel}>{lang.login.ignore}</Font>
                </TouchableOpacity>
            </View>
        </View>
    );
}
