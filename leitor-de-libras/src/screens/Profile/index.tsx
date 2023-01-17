import { useState } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import {
    SignOut,
    UserCircleMinus
} from "phosphor-react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import { useUser } from "../../contexts/user";

import Empty from "../../components/Empty";
import Input from "../../components/Input";
import Font from "../../components/Font";
import FixedCategory from "../../components/FixedCategory";

import createStyles from "./styles";

interface ProfileProps {
    navigation: BottomTabNavigationProp<RootStackParamList, "Profile">;
}

export default function Profile({  }: ProfileProps) {
    const lang = useLang();
    const { user, signed } = useUser();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [test, setTest] = useState("");
    
    if (!user || !signed) {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Empty
                    icon={props => <UserCircleMinus {...props} />}
                    title={lang.profile.not_signed.title}
                    desc={lang.profile.not_signed.desc}
                    options={[{
                        label: lang.general.login,
                        highlight: true
                    }, {
                        label: lang.general.signup
                    }]}
                />
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Image style={styles.avatar} source={user.avatar} />
                <View style={styles.userInfos}>
                    <Font preset="subtitle" style={styles.userName}>{user.name}</Font>
                    <Font preset="desc" style={styles.userEmail}>{user.email}</Font>
                </View>
                <TouchableOpacity>
                    <SignOut color={colors.critic} size={24} />
                </TouchableOpacity>
            </View>
            <FixedCategory title={lang.profile.personal_data.title}>
                <Input
                    noTopPadding
                    label={lang.profile.personal_data.username}
                    placeholder={lang.profile.personal_data.username}
                    value={user.name}
                />
                <Input
                    label={lang.profile.personal_data.email}
                    placeholder={lang.profile.personal_data.email}
                    value={user.email}
                />
                <Input
                    label={lang.profile.personal_data.about_me}
                    placeholder={lang.profile.personal_data.about_me}
                    multiline
                    numberOfLines={3}
                />
            </FixedCategory>
        </ScrollView>
    );
}
