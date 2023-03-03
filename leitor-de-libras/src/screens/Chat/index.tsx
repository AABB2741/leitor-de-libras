import {
    useEffect,
    useState
} from "react";
import {
    FlatList,
    Keyboard,
    View,
} from "react-native";
import Constants from "expo-constants";

import * as Tts from "../../services/Tts";
import * as Storage from "../../services/Storage";

import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import { useSettings } from "../../contexts/settings";

import Frame from "./Frame";
import Loading from "../../components/Loading";
import Split from "./Split";
import Popup from "../../components/Popup";

import createStyles from "./styles";
import log from "../../utils/log";

interface ChatProps {
    navigation: NativeStackNavigationProp<TalkParamList, "Chat">;
    route: RouteProp<TalkParamList, "Chat">;
}

export default function Chat({ navigation, route }: ChatProps) {
    const lang = useLang();
    const { settings } = useSettings();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [mode, setMode] = useState<"split" | "normal">("split");
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [chatInfos, setChatInfos] = useState<MeetProps | null>(null);
    const [messages, setMessages] = useState<Msg[] | null>(null);
    const [inverted, setInverted] = useState(false);
    const [occupied, setOccupied] = useState<null | boolean | "loading" | "saving">("loading");
    const [leftConfirm, setLeftConfirm] = useState(false);

    useEffect(() => {
        log("Obtendo conversas do bate-papo " + route.params.id, { color: "fgGray" });

        // Acessa o armazenamento para procurar informações da conversa (nome, id, etc.)
        Storage.findItem("@talk:conversations", c => c.id === route.params.id).then(conversations => {
            if (!conversations)
                return navigation.navigate("Conversations");

            setChatInfos(conversations);
        }).then(() => {
            // Acessa o armazenamento para buscar as mensagens dessa conversa
            Storage.findItem("@talk:messages", m => m.conversationId === route.params.id).then(messages => {
                setMessages(messages?.messages ?? []);
                setOccupied(null);
            });
        });

        // Função para saber quando o teclado está ou não ativo
        Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        })
    }, []);

    // Função que recebe o texto e autor da mensagem e salva no estado da aplicação
    function handleSendMessage({ from, message }: Omit<Msg, "date">) {
        if (!message.trim())
            return;

        if (settings.accessibility.litalks.tts_on_msg) {
            Tts.speak(message);
        }

        const newMessages = messages ? [...messages] : [];
        newMessages.push({
            date: new Date(),
            from,
            message: message.trim()
        });
        setMessages(newMessages);
    }

    // Função que acessa o banco de dados e salva todas as mensagens dessa conversa
    async function handleSaveMessages() {
        setOccupied("saving");

        await Storage.updateItem("@talk:messages", m => m.conversationId === route.params.id, {
            conversationId: route.params.id,
            messages: messages ?? []
        });

        setOccupied(null);
    }

    // Função para exibir mensagem de confirmação para sair do chat
    function handleRequestLeft() {
        if (!messages?.length)
            return navigation.goBack();

        setLeftConfirm(true);
    }

    if (chatInfos === null || messages === null) {
        return (
            <View style={styles.loading}>
                <Loading />
            </View>
        );
    }
    
    if (mode === "normal") {
        return (
            <View style={styles.container}>
                <Popup
                    title={lang.conversations.left_chat_confirm.title}
                    text={lang.conversations.left_chat_confirm.text}
                    visible={leftConfirm}
                    type="boolean"
                    onRespondBoolean={response => {
                        if (!response)
                            return setLeftConfirm(false);

                        navigation.goBack();
                    }}
                />
                <Split
                    mode={mode}
                    setMode={setMode}
                    inverted={inverted}
                    setInverted={setInverted}
                    handleSaveMessages={handleSaveMessages}
                    occupied={occupied}
                    onRequestLeft={handleRequestLeft}
                />
                {inverted && (
                    <Frame
                        guest
                        guestName={chatInfos.guestName || lang.conversations.chat.guest}
                        handleSendMessage={handleSendMessage}
                        messages={messages}
                        mode={mode}
                    />
                )}
                {!inverted && (
                    <Frame
                        guestName={chatInfos.guestName || lang.conversations.chat.guest}
                        handleSendMessage={handleSendMessage}
                        messages={messages}
                        mode={mode}
                    />
                )}
            </View>
        );
    }
    
    return (
        <>
                <Popup
                    title={lang.conversations.left_chat_confirm.title}
                    text={lang.conversations.left_chat_confirm.text}
                    visible={leftConfirm}
                    type="boolean"
                    onRespondBoolean={response => {
                        if (!response)
                            return setLeftConfirm(false);

                        navigation.goBack();
                    }}
                />
            <View style={[
                styles.container,
                { borderColor: inverted ? colors.background : colors.msg.guest_background },
                inverted && { transform: [{ rotate: "180deg" }], borderBottomWidth: Constants.statusBarHeight},
                !inverted && { borderTopWidth: Constants.statusBarHeight }
            ]}>
                <Frame
                    inverted={inverted}
                    handleSendMessage={handleSendMessage}
                    messages={messages}
                    guest
                    guestName={chatInfos.guestName || lang.conversations.chat.guest}
                    keyboardVisible={keyboardVisible}
                />
                <Split
                    mode={mode}
                    setMode={setMode}
                    inverted={inverted}
                    setInverted={setInverted}
                    keyboardVisible={keyboardVisible}
                    handleSaveMessages={handleSaveMessages}
                    occupied={occupied}
                    onRequestLeft={handleRequestLeft}
                />
                <Frame
                    guestName={chatInfos.guestName || lang.conversations.chat.guest}
                    inverted={inverted}
                    handleSendMessage={handleSendMessage}
                    messages={messages}
                    keyboardVisible={keyboardVisible}
                />
            </View>
        </>
    );
}
