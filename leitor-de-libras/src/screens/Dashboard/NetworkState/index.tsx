import {
    useEffect,
    useState
} from "react";
import {
    View
} from "react-native";
import { Plugs, WifiX } from "phosphor-react-native";

import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

import log from "../../../utils/log";

import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";
import { useSettings } from "../../../contexts/settings";

import Font from "../../../components/Font";

import createStyles from "./styles";

type NetState = "cellular" | "disconnected" | null;

export default function NetworkState() {
    const lang = useLang();
    const colors = useColors();
    const { settings } = useSettings();
    const styles = createStyles({ colors });

    const infos = useNetInfo();
    const [networkState, setNetworkState] = useState<NetState>(null);

    useEffect(() => {
        log("Atualizando informações de conexão");
        if (infos.isConnected) {
            if (infos.type === "cellular") {
                setNetworkState("cellular");
            } else setNetworkState(null);
        } else if (infos.isConnected === false) setNetworkState("disconnected");
    }, [infos]);

    if (networkState === null || infos.type === "unknown" || !settings.display.appearance.connection_alerts)
        return null;
    
    return  (
        <View style={[styles.container, networkState && styles[networkState]]}>
            {networkState === "disconnected" && <Plugs color={colors.font} size={16} />}
            {networkState === "cellular" && <WifiX color={colors.font} size={16} />}
            {networkState && <Font style={styles.text}>{lang.general.warning.replace("%s", lang.dashboard[networkState].replace("%s", lang.conversations.title))}</Font>}
        </View>
    );
}
