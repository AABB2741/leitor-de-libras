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
import * as Storage from "../../services/Storage";
import Constants from "expo-constants";
import { v4 as uuid4 } from "uuid";

import log from "../../utils/log";
import Frame from "./Frame";
import Loading from "../../components/Loading";
import Split from "./Split";
import { useColors } from "../../contexts/colors";

import createStyles from "./styles";

interface ChatProps {
    navigation: NativeStackNavigationProp<TalkParamList, "Chat">;
    route: RouteProp<TalkParamList, "Chat">;
}

/**
 * 
 * TODO: Chat
 * [ ] Impedir que o usuário volte para a página anterior enquanto estiver ocupado (botão de voltar);
 */

export default function Chat({ navigation, route }: ChatProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    const [mode, setMode] = useState<"split" | "normal">("split");
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [chatInfos, setChatInfos] = useState<MeetProps | null>(null);
    const [messages, setMessages] = useState<Msg[] | null>(null);
    const [inverted, setInverted] = useState(false);
    const [occupied, setOccupied] = useState<null | boolean | "loading" | "saving">("loading");

    useEffect(() => {
        log("Obtendo conversas do bate-papo " + route.params.id, { color: "fgGray" });
        
        // Storage.getItem("@talk:conversations").then(conversations => {
        //     setChatInfos(conversations?.find(c => c.id === route.params.id) ?? null);
        // }).then(() => {
        //     Storage.getItem("@talk:messages").then(data => {
        //         if (!data || !data.length) {
        //             setOccupied(false);
        //             return setMessages([]);
        //         }

        //         const chat = data.find(c => c.conversationId === route.params.id);
        //         if (chat) {
        //             setMessages(chat.messages);
        //         } else setMessages([]);

        //         setOccupied(false);
        //     });
        // });

        Storage.findItem("@talk:conversations", c => c.id === route.params.id).then(conversations => {
            if (!conversations)
                return navigation.navigate("Conversations");

            setChatInfos(conversations);
        }).then(() => {
            Storage.findItem("@talk:messages", m => m.conversationId === route.params.id).then(messages => {
                setMessages(messages?.messages ?? []);
                setOccupied(null);
            });
        });

        Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        })
    }, []);

    function handleSendMessage({ from, message }: Omit<Msg, "date">) {
        if (!message.trim())
            return;

        const newMessages = messages ? [...messages] : [];
        newMessages.push({
            date: new Date(),
            from,
            message: message.trim()
        });
        setMessages(newMessages);
    }

    async function handleSaveMessages() {
        setOccupied("saving");

        const res = await Storage.updateItem("@talk:messages", m => m.conversationId === route.params.id, {
            conversationId: route.params.id,
            messages: messages ?? []
        });

        setOccupied(null);

        // TODO: Terminar função e corrigir erros

        // setOccupied("saving");
        
        // Storage.updateItem("@talk:messages", msg => msg.conversationId === route.params.id, {
        //     conversationId: route.params.id,
        //     messages
        // });
        // return new Promise<void>(resolve => {
        //     setTimeout(() => {
        //         resolve();
        //         setOccupied(null);
        //     }, 2500);
        // });
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
                    handleSaveMessages={handleSaveMessages}
                    occupied={occupied}
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
