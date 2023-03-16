import { useState } from "react";
import {
    KeyboardAvoidingView,
    View,
    ScrollView
} from "react-native";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";
import { useUser } from "../../../contexts/user";
import { Location } from "../";

import Font from "../../Font";
import FixedCategory from "../../FixedCategory";
import Input from "../../Input";
import Button from "../../Button";

import createStyles from "./styles";

interface SignUpProps {
    setCanClose: React.Dispatch<React.SetStateAction<boolean>>;
    setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

export default function SignUp({ setCanClose, setLocation }: SignUpProps) {
    const { signUp } = useUser();
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [warning, setWarning] = useState<ResponseCode | "password_not_match" | null>(null);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    async function handleSignUp() {
        if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim())
            return setWarning("empty_fields");
        
        if (!email.includes("@"))
            return setWarning("invalid_email");

        if (password.length < 8)
            return setWarning("invalid_password_length");

        if (password !== confirmPassword)
            return setWarning("password_not_match");

        setCanClose(false);
        setLoading(true);
        setWarning(null);

        const response = await signUp(name, email, password);

        switch (response) {
            case "ok":
                
                break;
            default:
                setWarning(response);
        }

        setCanClose(true);
        setLoading(false);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.wrapper}>
                <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                    <Font family="black" style={styles.title}>{lang.sign_up.title}</Font>
                    <Font style={styles.desc}>{lang.sign_up.desc}</Font>
                    <FixedCategory title={lang.sign_up.title}>
                        <Input
                            placeholder={lang.profile.personal_data.username}
                            label={lang.profile.personal_data.username}
                            editable={!loading}
                            value={name}
                            onChangeText={name => setName(name)}
                        />
                        <Input
                            placeholder={lang.profile.personal_data.email_placeholder}
                            label={lang.profile.personal_data.email}
                            editable={!loading}
                            value={email}
                            onChangeText={email => setEmail(email)}
                            keyboardType="email-address"
                        />
                        <Input
                            placeholder={lang.profile.personal_data.password_placeholder}
                            label={lang.profile.personal_data.password}
                            editable={!loading}
                            secureTextEntry
                            value={password}
                            onChangeText={password => setPassword(password)}
                        />
                        <Input
                            placeholder={lang.profile.personal_data.password_confirm_placeholder}
                            label={lang.profile.personal_data.password_confirm}
                            editable={!loading}
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                        />
                    </FixedCategory>
                    {warning && <Font style={styles.warning}>{lang.general.err_codes[warning] ?? warning}</Font>}
                    <Button
                        highlight
                        label={loading ? lang.sign_up.loading : lang.sign_up.confirm}
                        loading={loading}
                        onPress={handleSignUp}
                    />
                    <Button
                        accentColor={colors.accent}
                        label={lang.sign_up.cancel}
                        disabled={loading}
                        onPress={() => setLocation("Login")}
                    />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
