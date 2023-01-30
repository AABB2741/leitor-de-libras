import {
    useEffect,
    useState
} from "react";
import {
    View
} from "react-native";
import { WifiX } from "phosphor-react-native";

import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

import log from "../../../utils/log";

import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";

import Font from "../../../components/Font";

import createStyles from "./styles";

type NetState = "cellular" | "disconnected" | null;

export default function NetworkState() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [networkState, setNetworkState] = useState<NetState>("cellular");
    const infos = useNetInfo();

    useEffect(() => {
        if (!infos.isConnected) {
            
        }
    }, [infos]);
    
    return  (
        <View style={styles.container}>
            <WifiX color={colors.font} size={16} />
            {networkState && <Font preset="text" style={styles.text}>{lang.dashboard[networkState].replace("%s", lang.appName)}</Font>}
        </View>
    );
}
