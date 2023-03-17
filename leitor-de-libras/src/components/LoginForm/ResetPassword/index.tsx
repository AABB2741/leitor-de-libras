import { useState } from "react";
import {
    KeyboardAvoidingView,
    View,
    ScrollView
} from "react-native";
import { Location } from "../";

import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import Font from "../../Font";
import FixedCategory from "../../FixedCategory";
import Input from "../../Input";
import Button from "../../Button";

import createStyles from "./styles";

interface ResetPasswordProps {
    setCanClose: React.Dispatch<React.SetStateAction<boolean>>;
    setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

function censureEmail(email: string) {
    // Obter o nome de usuário e o domínio do e-mail
    const [nome, dominio] = email.split('@');

    // Substituir os caracteres do nome por asteriscos, deixando apenas a primeira e última letra
    const nomeCensurado = nome.charAt(0) + nome.slice(1, -1).replace(/./g, '*') + nome.charAt(nome.length - 1);

    // Juntar o nome censurado e o domínio para formar o e-mail censurado
    const emailCensurado = nomeCensurado + '@' + dominio;

    // Retornar o e-mail censurado
    return emailCensurado;
}

function changePassword(email: string): Promise<ResponseCode> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("ok");
        }, 3000);
    });
}

function cancel(email: string): Promise<ResponseCode> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("ok");
        }, 3000);
    });
}

function checkCode(email: string, code: string): Promise<ResponseCode> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (code === "123456") {
                resolve("ok");
            } else resolve("invalid_code");
        }, 3000)
    })
}

export default function ResetPassword({ setCanClose, setLocation }: ResetPasswordProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [warning, setWarning] = useState<ResponseCode | null>(null);
    const [codeWarning, setCodeWarning] = useState<ResponseCode | null>(null);

    async function handleChangePassword() {
        if (!email.trim())
            return setWarning("empty_fields");

        if (!email.includes("@"))
            return setWarning("invalid_email");

        setWarning(null);
        setLoading(true);
        setCanClose(false);

        const response = await changePassword(email);
        if (response === "ok") {
            setSent(true);
        } else setWarning(response);

        setLoading(false);
    }

    async function handleCancel() {
        setLoading(true);

        const response = await cancel(email);

        if (response === "ok") {
            setSent(false);
        }

        setLoading(false);
        setCanClose(true);
    }

    async function handleCheckCode() {
        if (!code.trim())
            return setCodeWarning("empty_fields");

        setCodeWarning(null);
        setConfirmLoading(true);
        const response = await checkCode(email, code);

        if (response === "ok") {

        } else setCodeWarning(response);

        setConfirmLoading(false);
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <View style={styles.wrapper}>
                <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                    <Font family="black" style={styles.title}>{lang.reset_password.title}</Font>
                    <Font style={styles.desc}>{lang.reset_password.desc}</Font>
                    <FixedCategory title={lang.reset_password.send_email.title}>
                        <Input
                            placeholder={lang.reset_password.send_email.email_placeholder}
                            label={lang.reset_password.send_email.email}
                            editable={!loading && !sent}
                            value={email}
                            onChangeText={email => setEmail(email)}
                            onSubmitEditing={handleChangePassword}
                            keyboardType="email-address"
                        />
                        {warning && <Font style={styles.warning}>{lang.general.err_codes[warning] ?? warning}</Font>}
                        <Button
                            label={lang.reset_password.send_email.confirm}
                            onPress={handleChangePassword}
                            loading={loading && !sent}
                            disabled={sent}
                            highlight
                        />
                        <Button
                            label={lang.reset_password.send_email.return}
                            style={{ display: sent ? "none" : "flex" }}
                            disabled={loading}
                            onPress={() => setLocation("Login")}
                        />
                    </FixedCategory>
                    <FixedCategory title={lang.reset_password.confirm_code.title} style={{ display: sent ? "flex" : "none" }}>
                        <Input
                            label={lang.reset_password.confirm_code.email_check.replace("%s", censureEmail(email))}
                            placeholder={lang.reset_password.confirm_code.check_code}
                            keyboardType="numeric"
                            maxLength={6}
                            value={code}
                            onChangeText={code => setCode(code)}
                            editable={!loading && !confirmLoading}
                            onSubmitEditing={handleCheckCode}
                        />
                        {codeWarning && <Font style={styles.warning}>{lang.general.err_codes[codeWarning] ?? codeWarning}</Font>}
                        <Button
                            label={lang.reset_password.confirm_code.confirm}
                            onPress={handleCheckCode}
                            highlight
                            disabled={loading || code.length !== 6}
                            loading={confirmLoading}
                        />
                        <Button
                            label={lang.reset_password.confirm_code.cancel}
                            onPress={handleCancel}
                            loading={loading}
                            disabled={confirmLoading}
                        />
                    </FixedCategory>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
