import {
    Modal,
    ModalProps,
    TouchableOpacity,
    View
} from "react-native";
import { Video, AVPlaybackSource, AVPlaybackStatus, ResizeMode } from "expo-av";

import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";

import Font from "../../../components/Font";

import createStyles from "./styles";

interface VideoConfirmProps extends ModalProps {
    source: AVPlaybackSource;
    setVideoConfirmVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VideoConfirm({ source, setVideoConfirmVisible, ...rest }: VideoConfirmProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <Modal { ...rest } onRequestClose={() => setVideoConfirmVisible(false)} animationType="fade">
            <View style={styles.container}>
                <Video
                    style={styles.video}
                    source={source}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                />
                <Font family="black" style={styles.title}>{lang.camera.recording_finished.text}</Font>
                <View style={styles.options}>
                    <TouchableOpacity onPress={() => setVideoConfirmVisible(false)}>
                        <Font family="ubuntu" style={styles.optionLabel}>{lang.camera.recording_finished.discard}</Font>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Font family="ubuntu" style={styles.optionLabel}>{lang.camera.recording_finished.ok}</Font>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
