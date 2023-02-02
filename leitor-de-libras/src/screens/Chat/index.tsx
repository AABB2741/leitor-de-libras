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

    useEffect(() => {
        log("Obtendo conversas do bate-papo #" + route.params.id, {});
        setTimeout(() => {
            setChatInfos(CONVERSATIONS.find(c => c.id === route.params.id) ?? null);
            setMessages(MESSAGES);
        }, 2500);
    }, []);

    if (chatInfos === null || messages === null) {
        return (
            <View style={styles.loading}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Frame
                messages={messages}
            />
        </View>
    );
}
