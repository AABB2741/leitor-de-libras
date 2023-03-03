import {
    Modal,
    ModalProps,
    View
} from "react-native";
import { useColors } from "../../../contexts/colors";

import createStyles from "./styles";

interface VideoConfirmProps extends ModalProps {

}

export default function VideoConfirm({ ...rest }) {
    const colors = useColors();
    const styles = createStyles({ colors });

    return (
        <Modal { ...rest } animationType="fade">
            <View style={{ padding: 10, backgroundColor: 'red' }} />
        </Modal>
    );
}
