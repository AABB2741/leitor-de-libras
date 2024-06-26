import {
    useCallback,
    useEffect,
    useState
} from "react";
import {
    BackHandler,
    View,
    FlatList,
    TouchableOpacity
} from "react-native";
import {
    ChatCircleDots,
    Chats,
    MagnifyingGlass
} from "phosphor-react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import * as Storage from "../../services/Storage";

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
import Loading from "../../components/Loading";
import Font from "../../components/Font";

interface ConversationsProps {
    navigation: BottomTabNavigationProp<TalkParamList, "Conversations">;
}

export default function Conversations({ navigation }: ConversationsProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [createGuestName, setCreateGuestName] = useState("");
    const [createTitle, setCreateTitle] = useState("");
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [conversations, setConversations] = useState<MeetProps[] | null>(null);
    const [createLoading, setCreateLoading] = useState(false);
    const [occupied, setOccupied] = useState<"create" | boolean>(false);

    async function loadConversations() {
        log("Obtendo lista de conversas", { color: "fgGray" });
        Storage.getItem("@talk:conversations").then(data => {
            if (!data) {
                setConversations([]);
            } else setConversations(data);
        });
    }

    useEffect(() => {
        loadConversations();
    }, []);

    useFocusEffect(useCallback(() => {
        function handleBack() {
            log("Saindo do APP em \"Talk\"", { color: "fgRed" });
            BackHandler.exitApp();
            return true;
        }

        const sub = BackHandler.addEventListener("hardwareBackPress", handleBack);
        return sub.remove;
    }, []));

    async function handleCreateMeet() {
        const title = createTitle.trim();
        const guestName = createGuestName.trim();

        if (!title && !guestName)
            return false;

        setCreateLoading(true);
        const res = await Storage.pushItem("@talk:conversations", {
            title,
            guestName,
            date: new Date()
        });
        setCreateLoading(false);
        await loadConversations();

        navigation.navigate("Chat", { id: res.id });
        return true;
    }

    async function handleDeleteMeet(id: string): Promise<boolean> {
        //TODO: Continuar função para excluir item
        log("Excluindo mensagens", { color: "fgGray" });
        await Storage.removeItem("@talk:messages", m => m.conversationId === id);

        log("Excluindo conversa", { color: "fgGray" });
        const res = await Storage.removeItem("@talk:conversations", c => c.id === id);
        if(!res)
            return false;

        await loadConversations();
        return true;
    }

    if (conversations === null)
        return (
            <View style={styles.loading}>
                <Loading />
            </View>
        );

    return (
        <View style={styles.container}>
            <Popup
                title={lang.conversations.create.title}
                type="confirm"
                visible={createModalVisible}
                // TODO: Terminar esse carregamento
                loading={!!occupied}
                onRespondConfirm={async response => {
                    if (response) {
                        const res = await handleCreateMeet();

                        if (res) {
                            setCreateGuestName("");
                            setCreateTitle("");
                            setCreateModalVisible(false);
                        }

                        setCreateLoading(false);
                    } else setCreateModalVisible(false);
                }}
                onRequestClose={() => setCreateModalVisible(false)}
            >
                <Input
                    label={lang.conversations.create.name.label}
                    placeholder={lang.conversations.create.name.placeholder}
                    value={createGuestName}
                    onChangeText={name => setCreateGuestName(name)}
                />
                <Input
                    label={lang.conversations.create.meet_name.label}
                    placeholder={lang.conversations.create.meet_name.placeholder}
                    value={createTitle}
                    onChangeText={title => setCreateTitle(title)}
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
                data={[...conversations].slice().reverse()}
                ListHeaderComponent={(
                    <TouchableOpacity style={styles.create} onPress={() => setCreateModalVisible(true)}>
                        <ChatCircleDots color={colors.check} size={18} />
                        <Font family="ubuntu" style={styles.createLabel}>{lang.conversations.create.title}</Font>
                    </TouchableOpacity>
                )}
                renderItem={({ item }) => (
                    <Meet {...item} handleDeleteMeet={handleDeleteMeet} key={item.id} />
                )}
                style={conversations.length === 0 && { display: "none" }}
            // snapToAlignment --> testar depois
            />
            <Empty
                visible={conversations.length === 0}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                title={lang.conversations.empty.title}
                desc={lang.conversations.empty.desc.replace("%s", lang.conversations.title)}
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
