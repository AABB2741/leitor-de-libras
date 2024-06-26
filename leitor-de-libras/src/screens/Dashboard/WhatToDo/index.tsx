import {
    View,
    TouchableOpacity
} from "react-native";
import {
    Archive,
    Chats,
    HardDrives,
    IconProps,
    PlusCircle,
    SignIn,
    Translate
} from "phosphor-react-native";

import { useLang } from "../../../contexts/lang";
import { useUser } from "../../../contexts/user";
import { useNavigation } from "@react-navigation/native";

import Category from "../../../components/Category";

import createStyles from "./styles";
import { useColors } from "../../../contexts/colors";
import Font from "../../../components/Font";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface WhatToDo {
    icon: ({ color, size }: IconProps) => React.ReactNode;
    label: string;
    onPress?: () => void;
    disabled?: boolean;
}

export default function WhatToDo() {
    const navigation = useNavigation<NativeStackNavigationProp<AppScreens>>();
    
    const { signed } = useUser();
    const colors = useColors();
    const lang = useLang();
    const styles = createStyles({ colors });

    const WHAT_TO_DO: WhatToDo[] = [{
        icon: props => <PlusCircle {...props} />,
        label: lang.dashboard.what_to_do.create
    }, {
        icon: props => <Chats {...props} />,
        label: lang.conversations.title,
        onPress: () => navigation.navigate("TalkRoutes")
    }, {
        icon: props => <SignIn {...props} />,
        label: lang.general.login,
        disabled: signed !== false
        //onPress: () => setRoute("LoginRoutes") // rootNavigation.navigate("LoginRoutes")
    }, {
        icon: props => <Translate {...props} />,
        label: lang.dashboard.what_to_do.view_translations,
        onPress: () => navigation.navigate("TranslationsRoutes")
    }, {
        icon: props => <HardDrives {...props} />,
        label: lang.dashboard.what_to_do.clear
    }, {
        icon: props => <Archive {...props} />,
        label: lang.dashboard.what_to_do.archived
    }];

    return (
        <Category
            disableVerticalSpacing
            data={WHAT_TO_DO}
            renderItem={({ item, index }) => (
                <TouchableOpacity style={[styles.container, item.disabled && { display: "none" }]} onPress={item.onPress} key={index}>
                    <View style={styles.iconContainer}>
                        {item.icon({ color: colors.font, size: 20 })}
                    </View>
                    <Font family="ubuntu" style={styles.label} numberOfLines={2}>{item.label}</Font>
                </TouchableOpacity>
            )}
        />
    );
}
