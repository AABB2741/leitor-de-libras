import {
    useEffect,
    useState
} from "react";
import {
    View,
    FlatList
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

    const [chatInfos, setChatInfos] = useState<ConversationProps | null>(null);
    const [messages, setMessages] = useState<Msg[] | null>(null);
    const [inverted, setInverted] = useState(false);

    useEffect(() => {
        log("Obtendo conversas do bate-papo #" + route.params.id, {});
        setChatInfos(CONVERSATIONS.find(c => c.id === route.params.id) ?? null);
        setMessages(MESSAGES);
    }, []);

    function handleSendMessage({ from, message }: Omit<Omit<Msg, "chatId">, "date">) {
        const newMessages = messages ? [...messages] : [];
        newMessages.push({
            chatId: route.params.id,
            date: new Date(),
            from,
            message
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

    return (
        <>
            <View style={styles.statusBarFix} />
            <View style={[styles.container, inverted && { transform: [{ rotate: "180deg" }] }]}>
                <Frame
                    inverted={inverted}
                    handleSendMessage={handleSendMessage}
                    messages={messages}
                    guest
                />
                <Split
                    mode="split"
                    inverted={inverted}
                    setInverted={setInverted}
                />
                <Frame
                    inverted={inverted}
                    handleSendMessage={handleSendMessage}
                    messages={messages}
                />
            </View>
        </>
    );
}
