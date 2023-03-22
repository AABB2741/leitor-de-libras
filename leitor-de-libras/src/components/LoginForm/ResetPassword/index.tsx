import { useState } from "react";
import {
    KeyboardAvoidingView,
    View,
    ScrollView
} from "react-native";
import axios from "axios";
import { Location } from "../";
import api from "../../../constants/api.json";

import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import Font from "../../Font";
import FixedCategory from "../../FixedCategory";
import Input from "../../Input";
import Button from "../../Button";

import createStyles from "./styles";
import log from "../../../utils/log";

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
    const [checked, setChecked] = useState(false);

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [warning, setWarning] = useState<ResponseCode | null>(null);
    const [codeWarning, setCodeWarning] = useState<ResponseCode | null>(null);

    async function requestRecoveryCode() {
        if (!email.trim())
            return setWarning("empty_fields");

        if (!email.includes("@"))
            return setWarning("invalid_email");

        setWarning(null);
        setLoading(true);
        setCanClose(false);

        try {
            const response = await axios.post(`${api.address}/user/requestRecoveryCode`, {
                email
            }, { timeout: 15000 });
            
            if (response.status === 200 || response.status === 201) {
                setSent(true);
            }
        } catch (e) {
            const err = e as any;
            log("Erro ao solicitar criação de código: " + err, { color: "fgRed" });
            console.log(err?.response?.data);

            switch (err?.response?.status) {
                case 403:
                    setSent(true);
                    break;
                default:
                    setWarning(err?.response?.data?.code ?? "unknown_err");
            }
        } finally {
            setLoading(false);
        }
    }

    async function cancelRecoveryCode() {
        setLoading(true);

        try {
            await axios.delete(`${api.address}/user/deleteRecoveryCode/${email}`, { timeout: 15000 });
        } catch (e) {
            const err = e as any;
            log("Erro ao solicitar exclusão de código: " + err, { color: "fgRed" });

            if (err?.response?.status !== 404) {
                setWarning(err?.response?.data?.code ?? "unknown_err");
            }
        } finally {
            setLoading(false);
            setCanClose(true);
            setSent(false);
        }
    }

    async function checkRecoveryCode() {
        if (!code.trim())
            return setCodeWarning("empty_fields");

        setCodeWarning(null);
        setConfirmLoading(true);
        
        try {
            // TODO: Verificar código no back
        } catch (e) {

        } finally {
            setConfirmLoading(false);
        }
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
                            value={(sent || loading) ? email.replace(/./g, "*") : email}
                            onChangeText={email => setEmail(email)}
                            onSubmitEditing={requestRecoveryCode}
                            keyboardType="email-address"
                        />
                        {warning && <Font style={styles.warning}>{lang.general.err_codes[warning] ?? warning}</Font>}
                        <Button
                            label={lang.reset_password.send_email.confirm}
                            onPress={requestRecoveryCode}
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
                            editable={!loading && !confirmLoading && !checked}
                            onSubmitEditing={checkRecoveryCode}
                        />
                        {codeWarning && <Font style={styles.warning}>{lang.general.err_codes[codeWarning] ?? codeWarning}</Font>}
                        <Button
                            label={lang.reset_password.confirm_code.confirm}
                            onPress={checkRecoveryCode}
                            highlight
                            disabled={loading || code.length !== 6 || checked}
                            loading={confirmLoading}
                        />
                        <Button
                            label={lang.reset_password.confirm_code.cancel}
                            onPress={cancelRecoveryCode}
                            loading={loading}
                            disabled={confirmLoading || checked}
                        />
                    </FixedCategory>
                    <FixedCategory title={lang.reset_password.reset.title} style={{ display: checked ? "flex" : "none" }}>
                        {/* FIXME: Ver porque o input fica cinza escuro quando n tem editable */}
                        <Input
                            label={lang.reset_password.reset.new_pass}
                            placeholder={lang.reset_password.reset.new_pass_placeholder}
                            value={password}
                            onChangeText={password => setPassword(password)}
                            editable
                            secureTextEntry
                        />
                        <Input
                            label={lang.reset_password.reset.repeat_new_pass}
                            placeholder={lang.reset_password.reset.repeat_new_pass_placeholder}
                            value={confirmPassword}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            editable
                            secureTextEntry
                        />
                        <Button
                            label={lang.reset_password.reset.confirm}
                            highlight
                        />
                    </FixedCategory>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}
