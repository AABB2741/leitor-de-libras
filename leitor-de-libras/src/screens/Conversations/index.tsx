import {
    useCallback,
    useState
} from "react";
import {
    BackHandler,
    View,
    FlatList
} from "react-native";
import {
    Chats,
    MagnifyingGlass
} from "phosphor-react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";

import { useLang } from "../../contexts/lang";
import { useColors } from "../../contexts/colors";
import Header from "../../components/Header";
import Empty from "../../components/Empty";
import Meet from "./Meet";
import Popup from "../../components/Popup";

import log from "../../utils/log";
import CONVERSATIONS from "../../constants/conversations";

import createStyles from "./styles";
import Input from "../../components/Input";

interface ConversationsProps {
    navigation: BottomTabNavigationProp<AppScreens, "TalkRoutes">;
}

export default function Conversations({ }: ConversationsProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [createModalVisible, setCreateModalVisible] = useState(false);

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
            <Popup
                title={lang.conversations.create.title}
                type="confirm"
                visible={createModalVisible}
                onRespondConfirm={response => {
                    setCreateModalVisible(false);
                }}
            >
                <Input
                    label={lang.conversations.create.name.label}
                    placeholder={lang.conversations.create.name.placeholder}
                />
                <Input
                    label={lang.conversations.create.meet_name.label}
                    placeholder={lang.conversations.create.meet_name.placeholder}
                />
            </Popup>
            <Header
                title={lang.conversations.title}
                hideBackButton
                rightOptions={[{
                    icon: props => <MagnifyingGlass {...props} />
                }]}
            />
            <FlatList
                data={CONVERSATIONS}
                renderItem={({ item }) => (
                    <Meet {...item} key={item.id} />
                )}
            />
            <Empty
                contentContainerStyle={{ paddingHorizontal: 20 }}
                title={lang.conversations.empty.title}
                desc={lang.conversations.empty.desc}
                icon={props => <Chats {...props} weight="duotone" />}
                options={[{
                    label: lang.conversations.empty.try,
                    highlight: true,
                    onPress: () => setCreateModalVisible(true)
                }, {
                    label: lang.conversations.empty.learn_more
                }]}
            />
        </View>
    );
}
