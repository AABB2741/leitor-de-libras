import {
    View,
    Pressable,
    Modal,
    ModalProps,
    StatusBar
} from "react-native";
import * as Animatable from "react-native-animatable";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import Button from "../Button";
import Font from "../Font";

import createStyles from "./styles";

export type MessageOption = "ok" | "confirm" | "boolean";

interface MessageProps extends ModalProps {
    type?: MessageOption;
    title?: string;
    text?: string;
    caution?: boolean;
    children?: React.ReactNode;
    onRespondOk?: () => void;
    onRespondConfirm?: (response: boolean) => void;
    onRespondBoolean?: (repsonse: boolean) => void;
}

export default function Message({ type = "ok", title, text, caution, children, onRespondOk, onRespondConfirm, onRespondBoolean, ...rest }: MessageProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <>
            {rest.visible && <StatusBar backgroundColor="#fff" />}
            <Modal
                presentationStyle="overFullScreen"
                transparent
                { ...rest }
            >
                <Pressable style={styles.background} onPress={rest.onRequestClose} />
                <View style={styles.container}>
                    <Animatable.View style={styles.content} animation="zoomIn" duration={300}>
                        <View>
                            {title && <Font preset="subtitle" style={styles.title}>{title}</Font>}
                            {text && <Font preset="text" style={styles.text}>{text}</Font>}
                        </View>
                        {children}
                        <View style={styles.options}>
                            {type === "ok" && (
                                <Button
                                    label={lang.general.modal.ok}
                                    style={{ flex: 1 }}
                                    onPress={onRespondOk ?? rest.onRequestClose}
                                    accentColor={caution ? colors.critic : colors.accent}
                                />
                            )}
                            {type === "boolean" && (
                                <>
                                    <Button
                                        label={lang.general.modal.no}
                                        onPress={() => onRespondBoolean?.(false)}
                                        accentColor={caution ? colors.critic : colors.accent}
                                    />
                                    <Button
                                        label={lang.general.modal.yes}
                                        highlight onPress={() => onRespondBoolean?.(true)}
                                        accentColor={caution ? colors.critic : colors.accent}
                                    />
                                </>
                            )}
                        </View>
                    </Animatable.View>
                </View>
            </Modal>
        </>
    );
}
