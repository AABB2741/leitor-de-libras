import {
    useEffect,
    useState
} from "react";
import {
    FlatList,
    Keyboard,
    View,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import log from "../../utils/log";
import Frame from "./Frame";
import Loading from "../../components/Loading";
import Split from "./Split";
import { useColors } from "../../contexts/colors";
import CONVERSATIONS, { MESSAGES } from "../../constants/conversations";

import createStyles from "./styles";

interface ChatProps {
    navigation: NativeStackNavigationProp<TalkParamList, "Chat">;
    route: RouteProp<TalkParamList, "Chat">;
}

export default function Chat({ navigation, route }: ChatProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    const [mode, setMode] = useState<"split" | "normal">("split");
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [chatInfos, setChatInfos] = useState<ConversationProps | null>(null);
    const [messages, setMessages] = useState<Msg[] | null>(null);
    const [inverted, setInverted] = useState(false);

    useEffect(() => {
        log("Obtendo conversas do bate-papo #" + route.params.id, {});
        setChatInfos(CONVERSATIONS.find(c => c.id === route.params.id) ?? null);
        setMessages(MESSAGES);

        Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        })
    }, []);

    function handleSendMessage({ from, message }: Omit<Omit<Msg, "chatId">, "date">) {
        if (!message.trim())
            return;

        const newMessages = messages ? [...messages] : [];
        newMessages.push({
            chatId: route.params.id,
            date: new Date(),
            from,
            message: message.trim()
        });
        setMessages(newMessages);
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
                <Split
                    mode={mode}
                    setMode={setMode}
                    inverted={inverted}
                    setInverted={setInverted}
                />
                {inverted && (
                    <Frame
                        guest
                        handleSendMessage={handleSendMessage}
                        messages={messages}
                        mode={mode}
                    />
                )}
                {!inverted && (
                    <Frame
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
            <View style={styles.statusBarFix} />
            <View style={[styles.container, inverted && { transform: [{ rotate: "180deg" }] }]}>
                <Frame
                    inverted={inverted}
                    handleSendMessage={handleSendMessage}
                    messages={messages}
                    guest
                    keyboardVisible={keyboardVisible}
                />
                <Split
                    mode={mode}
                    setMode={setMode}
                    inverted={inverted}
                    setInverted={setInverted}
                    keyboardVisible={keyboardVisible}
                />
                <Frame
                    inverted={inverted}
                    handleSendMessage={handleSendMessage}
                    messages={messages}
                    keyboardVisible={keyboardVisible}
                />
            </View>
        </>
    );
}
