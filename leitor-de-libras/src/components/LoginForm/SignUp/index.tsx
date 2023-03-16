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

    const [warning, setWarning] = useState<ResponseCode | null>(null);
    const [loading, setLoading] = useState(true);
    
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
                        placeholder={lang.profile.personal_data.email_placeholder}
                        label={lang.profile.personal_data.email}
                        editable={!loading}
                    />
                    <Input
                        placeholder={lang.profile.personal_data.password_placeholder}
                        label={lang.profile.personal_data.password}
                        editable={!loading}
                    />
                    <Input
                        placeholder={lang.profile.personal_data.password_confirm_placeholder}
                        label={lang.profile.personal_data.password_confirm}
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
