import {
    useCallback,
    useEffect,
    useState
} from "react";
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Linking
} from "react-native";

import { useLang } from "../../contexts/lang";
import log from "../../utils/log";

import Popup from "../Popup";

interface LinkProps extends TouchableOpacityProps {
    url: string;
    noSupportMessage?: string;
}

export default function Link({ url, noSupportMessage, ...rest }: LinkProps) {
    const lang = useLang();
    const [isLinkingSupported, setIsLinkSupported] = useState<boolean | null>(null);
    const [warningVisible, setWarningVisible] = useState(false);

    useEffect(() => {
        log("Verificando suporte de Linking do dispositivo", { color: "fgGray" });
        Linking.canOpenURL(url).then(supported => {
            log(supported ? "Linking está disponível" : "Linking não está disponível", { tab: true, color: supported ? "fgGreen" : "fgRed" })
            setIsLinkSupported(supported);
        });
    }, [url]);

    async function handlePress() {
        if (isLinkingSupported) {
            await Linking.openURL(url);
        } else setWarningVisible(true);
    }

    if (isLinkingSupported === null)
        return null;

    return (
        <>
            <Popup
                title={lang.general.resource_not_available}
                text={noSupportMessage}
                visible={warningVisible}
                onRequestClose={() => setWarningVisible(false)}
            />
            <TouchableOpacity onPress={handlePress} { ...rest } />
        </>
    );
}
