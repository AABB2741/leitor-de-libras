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

import Message from "../Message";

interface LinkProps extends TouchableOpacityProps {
    url: string;
    noSupportMessage?: string;
}

export default function Link({ url, noSupportMessage, ...rest }: LinkProps) {
    const lang = useLang();
    const [isLinkingSupported, setIsLinkSupported] = useState<boolean | null>(null);
    const [warningVisible, setWarningVisible] = useState(false);

    useEffect(() => {
        Linking.canOpenURL(url).then(supported => {
            setIsLinkSupported(false);
            log("Suportado: " + supported);
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
            <Message
                text={noSupportMessage ?? lang.general.resource_not_available}
                visible={warningVisible}
                onRequestClose={() => setWarningVisible(false)}
            />
            <TouchableOpacity onPress={handlePress} { ...rest } />
        </>
    );
}
