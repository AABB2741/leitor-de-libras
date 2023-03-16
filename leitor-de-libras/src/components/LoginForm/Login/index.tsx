import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    Image
} from "react-native";

import { Globe } from "phosphor-react-native";
import * as Storage from "../../../services/Storage";

import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";
import { useUser } from "../../../contexts/user";

import Font from "../../Font";
import Popup, { PopupProps } from "../../Popup";
import FixedCategory from "../../FixedCategory";
import Input from "../../Input";
import Button from "../../Button";

import createStyles from "./styles";
import { Location } from "../";

interface LoginProps {
    setLocation: React.Dispatch<React.SetStateAction<Location>>;
    setCanClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setLocation, setCanClose }: LoginProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });
    const { signed, login } = useUser();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState<ResponseCode | "invalid_email" | null>(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<PopupProps | null>(null);

    async function handleLogin() {
        setWarning(null);

        if (!email.trim() || !password.trim())
            return setWarning("empty_fields");

        if (!email.includes("@"))
            return setWarning("invalid_email");

        setLoading(true);
        setCanClose(false);
        const response = await login(email.trim(), password.trim());

        switch (response) {
            case "ok":
                setLoading(false);
                setCanClose(true);
                setLocation("SetProfilePicture");
                return;
            default:
                setWarning(response);
        }

        setLoading(false);
        setCanClose(true);
    }
    
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            {alert && <Popup {...alert} />}
            <View style={styles.wrapper}>
                <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                    <Font family="black" style={styles.title}>{lang.login.title}</Font>
                    <Font style={styles.desc}>{lang.login.desc}</Font>
                    <Image source={colors.themeName === "light" ? require("../../../../assets/imgs/login-light.png") : require("../../../../assets/imgs/login.png")} style={styles.image} />
                    <FixedCategory title={lang.general.login}>
                        <Input
                            label={lang.profile.personal_data.email}
                            placeholder={lang.profile.personal_data.email_placeholder}
                            keyboardType="email-address"
                            onChangeText={email => setEmail(email)}
                            value={email}
                            editable={!loading}
                        />
                        <Input
                            label={lang.profile.personal_data.password}
                            placeholder={lang.profile.personal_data.password_placeholder}
                            secureTextEntry
                            onChangeText={password => setPassword(password)}
                            value={password}
                            editable={!loading}
                            onSubmitEditing={handleLogin}
                        />
                        {warning && <Font style={styles.warning}>{lang.general.err_codes[warning] ?? warning}</Font>}
                        <Button
                            accentColor={colors.accent2}
                            label={lang.profile.personal_data.password_forgot}
                            onPress={() => setLocation("ResetPassword")}
                            labelStyle={{ fontSize: 12 }}
                            disabled={loading}
                        />
                        <Button
                            highlight
                            label={lang.general.login}
                            style={{ marginTop: 20 }}
                            loading={loading}
                            onPress={handleLogin}
                        />
                        <Button
                            label={lang.general.signup}
                            onPress={() => setLocation("SignUp")}
                            disabled={loading}
                        />
                    </FixedCategory>
                </ScrollView>
                <View style={styles.options}>
                    <TouchableOpacity disabled={loading} style={styles.lang}>
                        <Globe color={colors.font} size={24} />
                        <Font family="ubuntu" style={{ marginLeft: 10 }}>{lang.locale}</Font>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={loading} onPress={() => {
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
        </KeyboardAvoidingView>
    );
}
