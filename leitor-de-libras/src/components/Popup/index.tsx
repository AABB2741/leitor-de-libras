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
import { useSettings } from "../../contexts/settings";

import Button from "../Button";
import Font from "../Font";

import createStyles from "./styles";

export type PopupOption = "ok" | "confirm" | "boolean";

interface PopupProps extends ModalProps {
    type?: PopupOption;
    title?: string;
    text?: string;
    caution?: boolean;
    children?: React.ReactNode;
    loading?: boolean;
    onRespondOk?: () => void;
    onRespondConfirm?: (response: boolean) => void;
    onRespondBoolean?: (repsonse: boolean) => void;
}

export default function Popup({ type = "ok", title, text, caution, children, loading, onRespondOk, onRespondConfirm, onRespondBoolean, ...rest }: PopupProps) {
    const lang = useLang();
    const { settings } = useSettings();
    const colors = useColors();
    const styles = createStyles({ colors });
    
    return (
        <>
            {rest.visible && <StatusBar barStyle="light-content" />}
            <Modal
                presentationStyle="overFullScreen"
                transparent
                statusBarTranslucent
                {...rest}
            >
                <Pressable style={styles.background} onPress={rest.onRequestClose} />
                <View style={styles.container}>
                    <Animatable.View style={styles.content} animation={settings.display.performance.reduce_animations ? undefined : "zoomIn"} duration={300}>
                        <View>
                            {title && <Font preset="subtitle" style={styles.title}>{title}</Font>}
                            {text && <Font preset="text" style={styles.text}>{text}</Font>}
                        </View>
                        <View>
                            {children}
                        </View>
                        <View style={styles.options}>
                            {type === "ok" && (
                                <Button
                                    loading={loading}
                                    label={lang.general.modal.ok}
                                    style={{ flex: 1, justifyContent: "center" }}
                                    onPress={onRespondOk ?? rest.onRequestClose}
                                    accentColor={caution ? colors.critic : colors.accent}
                                />
                            )}
                            {type === "boolean" && (
                                <>
                                    <Button
                                        disabled={loading}
                                        label={lang.general.modal.no}
                                        onPress={() => onRespondBoolean?.(false)}
                                        accentColor={caution ? colors.critic : colors.accent}
                                    />
                                    <Button
                                        loading={loading}
                                        label={lang.general.modal.yes}
                                        highlight onPress={() => onRespondBoolean?.(true)}
                                        accentColor={caution ? colors.critic : colors.accent}
                                    />
                                </>
                            )}
                            {type === "confirm" && (
                                <>
                                    <Button
                                        disabled={loading}
                                        label={lang.general.modal.cancel}
                                        onPress={() => onRespondConfirm?.(false)}
                                        accentColor={caution ? colors.critic : colors.accent}
                                    />
                                    <Button
                                        loading={loading}
                                        label={lang.general.modal.confirm}
                                        highlight onPress={() => onRespondConfirm?.(true)}
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
