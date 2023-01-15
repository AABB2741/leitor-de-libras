import {
    View,
    TouchableOpacity
} from "react-native";
import { Archive,
    Books,
    HardDrives,
    PlusCircle,
    Translate
} from "phosphor-react-native";

import { useLang } from "../../../contexts/lang";
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
}

export default function WhatToDo() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const colors = useColors();
    const lang = useLang();
    const styles = createStyles({ colors });

    const WHAT_TO_DO: WhatToDo[] = [{
        icon: ({ color, size }) => <PlusCircle color={color} size={size} />,
        label: lang.dashboard.what_to_do.create
    }, {
        icon: ({ color, size }) => <Translate color={color} size={size} />,
        label: lang.dashboard.what_to_do.view_translations,
        onPress: () => navigation.navigate("Translations")
    }, {
        icon: ({ color, size }) => <HardDrives color={color} size={size} />,
        label: lang.dashboard.what_to_do.clear
    }, {
        icon: ({ color, size }) => <Archive color={color} size={size} />,
        label: lang.dashboard.what_to_do.archived
    }, {
        icon: ({ color, size }) => <Books color={color} size={size} />,
        label: lang.dashboard.what_to_do.learn
    }];

    return (
        <Category
            verticalSpacing={false}
            data={WHAT_TO_DO}
            renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.container} onPress={item.onPress} key={index}>
                    <View style={styles.iconContainer}>
                        {item.icon({ color: colors.font, size: 20 })}
                    </View>
                    <Font preset="subtitle" style={styles.label} numberOfLines={2}>{item.label}</Font>
                </TouchableOpacity>
            )}
        />
    );
}
