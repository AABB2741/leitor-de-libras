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

import Frame from "./Frame";
import Loading from "../../components/Loading";
import { useColors } from "../../contexts/colors";

import createStyles from "./styles";
import CONVERSATIONS from "../../constants/conversations";

interface ChatProps {
    navigation: NativeStackNavigationProp<TalkParamList, "Chat">;
    route: RouteProp<TalkParamList, "Chat">;
}

export default function Chat({ navigation, route }: ChatProps) {
    const colors = useColors();
    const styles = createStyles({ colors });

    const [chatInfos, setChatInfos] = useState<ConversationProps | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setChatInfos(CONVERSATIONS.find(c => c.id === route.params.id) ?? null);
        }, 2500);
    }, []);

    if (chatInfos === null) {
        return (
            <View style={styles.loading}>
                <Loading />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Frame />
        </View>
    );
}
