import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
    BackHandler,
    View
} from "react-native";

import { useLang } from "../../contexts/lang";
import { useColors } from "../../contexts/colors";

import Header from "../../components/Header";
import Empty from "../../components/Empty";

import log from "../../utils/log";

import createStyles from "./styles";
import { Chats, MagnifyingGlass } from "phosphor-react-native";

interface ConversationsProps {
    navigation: BottomTabNavigationProp<AppScreens, "Talk">;
}

export default function Conversations({  }: ConversationsProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    useFocusEffect(useCallback(() => {
        function handleBack() {
            log("Saindo do APP em \"Talk\"", { color: "fgRed" });
            BackHandler.exitApp();
            return true;
        }

        const sub = BackHandler.addEventListener("hardwareBackPress", handleBack);
        return sub.remove;
    }, []))

    return (
        <View style={styles.container}>
            <Header
                title={lang.conversations.title}
                hideBackButton
                rightOptions={[{
                    icon: props => <MagnifyingGlass { ...props } />
                }]}
            />
            <Empty
                contentContainerStyle={{ paddingHorizontal: 20 }}
                title={lang.conversations.empty.title}
                desc={lang.conversations.empty.desc}
                icon={props => <Chats {...props} weight="duotone" />}
                options={[{
                    label: lang.conversations.empty.try,
                    highlight: true
                }, {
                    label: lang.conversations.empty.learn_more
                }]}
            />
        </View>
    );
}
