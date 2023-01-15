import {
    View,
    TouchableOpacity
} from "react-native";
import { Archive,
    Books,
    HardDrives,
    PlusCircle,
    Translate,
    UserCirclePlus
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
    icon: ({ color, size }: { color: string, size: number }) => React.ReactNode;
    label: string;
    onPress?: () => void;
    disabled?: boolean;
}

export default function WhatToDo() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const user = useUser();
    const colors = useColors();
    const lang = useLang();
    const styles = createStyles({ colors });

    const WHAT_TO_DO: WhatToDo[] = [{
        icon: props => <PlusCircle {...props} />,
        label: lang.dashboard.what_to_do.create
    }, {
        icon: props => <UserCirclePlus {...props} />,
        label: lang.general.login,
        disabled: user.signed
    }, {
        icon: props => <Translate {...props} />,
        label: lang.dashboard.what_to_do.view_translations,
        onPress: () => navigation.navigate("Translations")
    }, {
        icon: props => <HardDrives {...props} />,
        label: lang.dashboard.what_to_do.clear
    }, {
        icon: props => <Archive {...props} />,
        label: lang.dashboard.what_to_do.archived
    }, {
        icon: props => <Books {...props} />,
        label: lang.dashboard.what_to_do.learn
    }];

    return (
        <Category
            disableVerticalSpacing
            data={WHAT_TO_DO}
            renderItem={({ item, index }) => (
                <TouchableOpacity style={[styles.container, item.disabled && {display: "none"}]} onPress={item.onPress} key={index}>
                    <View style={styles.iconContainer}>
                        {item.icon({ color: colors.font, size: 20 })}
                    </View>
                    <Font preset="subtitle" style={styles.label} numberOfLines={2}>{item.label}</Font>
                </TouchableOpacity>
            )}
        />
    );
}
