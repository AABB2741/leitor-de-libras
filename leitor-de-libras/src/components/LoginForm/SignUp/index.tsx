import { useState } from "react";
import {
    View,
    ScrollView
} from "react-native";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import Font from "../../Font";
import FixedCategory from "../../FixedCategory";
import Input from "../../Input";
import Button from "../../Button";

import createStyles from "./styles";

export default function SignUp() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [warning, setWarning] = useState<string | null>("Boa noite, brasileiros!");
    const [loading, setLoading] = useState(false);
    
    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Font family="black" style={styles.title}>{lang.sign_up.title}</Font>
                <Font style={styles.desc}>{lang.sign_up.desc}</Font>
                <FixedCategory title={lang.sign_up.title}>
                    <Input
                        placeholder={lang.profile.personal_data.username}
                        label={lang.profile.personal_data.username}
                        editable={!loading}
                    />
                    <Input
                        placeholder={lang.profile.personal_data.email}
                        label={lang.profile.personal_data.email_placeholder}
                        editable={!loading}
                    />
                    <Input
                        placeholder={lang.profile.personal_data.password}
                        label={lang.profile.personal_data.password_placeholder}
                        editable={!loading}
                    />
                </FixedCategory>
                {warning && <Font style={styles.warning}>{warning}</Font>}
                <Button
                    highlight
                    label={lang.sign_up.confirm}
                    onPress={() => setLoading(true)}
                    loading={loading}
                />
                <Button
                    accentColor={colors.accent}
                    label={lang.sign_up.cancel}
                    disabled={loading}
                />
            </ScrollView>
        </View>
    );
}
