import {
    useCallback,
    useEffect,
    useState
} from "react";
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Linking,
    TextStyle
} from "react-native";
import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";

import Font from "../Font";
import Popup from "../Popup";

import log from "../../utils/log";

import createStyles from "./styles";
import { ArrowSquareOut } from "phosphor-react-native";

interface LinkProps extends TouchableOpacityProps {
    url: string;
    noSupportMessage?: string;
    children?: string;
    labelStyle?: TextStyle;
}

export default function Link({ url, noSupportMessage, children, labelStyle, ...rest }: LinkProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

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
            <TouchableOpacity onPress={handlePress} style={styles.container}>
                <Font family="ubuntu" style={[styles.label, Array.isArray(labelStyle) ? [...labelStyle] : labelStyle]}>{children}</Font>
                <ArrowSquareOut
                    size={14}
                    color={colors.accent}
                />
            </TouchableOpacity>
        </>
    );
}
