import { useCallback, useState } from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    Image
} from "react-native";

import { Globe } from "phosphor-react-native";
import * as Storage from "../../../services/Storage";

import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";

import Font from "../../Font";

import FixedCategory from "../../FixedCategory";
import Input from "../../Input";
import Button from "../../Button";

import createStyles from "./styles";
import { Location } from "../";

interface LoginProps {
    setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

export default function Login({ setLocation }: LoginProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Font family="black" style={styles.title}>{lang.login.title}</Font>
                <Font style={styles.desc}>{lang.login.desc}</Font>
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
                        onPress={() => setLocation("ResetPassword")}
                        labelStyle={{ fontSize: 12 }}
                    />
                    <Button
                        highlight
                        label={lang.general.login}
                        style={{ marginTop: 20 }}
                    />
                    <Button
                        label={lang.general.signup}
                        onPress={() => setLocation("SignUp")}
                    />
                </FixedCategory>
            </ScrollView>
            <View style={styles.options}>
                <TouchableOpacity style={styles.lang}>
                    <Globe color={colors.font} size={24} />
                    <Font family="ubuntu" style={{ marginLeft: 10 }}>{lang.locale}</Font>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Storage.mergeItem("@introduction", {
                        skip_login: true
                    }).then(() => {
                        // setRoute("AppRoutes");
                    });
                }}>
                    <Font family="ubuntu" style={styles.ignoreLabel}>{lang.login.ignore}</Font>
                </TouchableOpacity>
            </View>
        </View>
    );
}
