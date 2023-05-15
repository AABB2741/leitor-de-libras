import { Image, ScrollView, View } from "react-native";
import { CameraCapturedPicture } from "expo-camera";

import Button from "../../../components/Button";
import { useLang } from "../../../contexts/lang";
import { useColors } from "../../../contexts/colors";

import Font from "../../../components/Font";

import createStyles from "./styles";

interface ImageConfirmProps {
    pictureSource: CameraCapturedPicture;
    setPictureSource: React.Dispatch<React.SetStateAction<CameraCapturedPicture | null>>;
}

export function ImageConfirm({ pictureSource }: ImageConfirmProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Font family="black" style={styles.title}>{lang.camera.picture_finished.title}</Font>
                <Image
                    source={pictureSource}
                    style={styles.image}
                />
                <View style={styles.options}>
                    <Button
                        label={lang.general.modal.cancel}
                    />
                    <Button
                        label={lang.general.modal.confirm}
                        highlight
                    />
                </View>
            </View>
        </ScrollView>
    );
}
