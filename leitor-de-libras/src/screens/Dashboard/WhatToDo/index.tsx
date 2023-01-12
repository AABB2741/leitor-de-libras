import {
    TouchableOpacity
} from "react-native";
import { Archive,
    Books,
    Download,
    Export,
    HardDrives,
    PlusCircle,
    Translate,
    Trash
} from "phosphor-react-native";
import { useLang } from "../../../contexts/lang";

import Category from "../../../components/Category";

import createStyles from "./styles";
import { useColors } from "../../../contexts/colors";
import Font from "../../../components/Font";

interface WhatToDo {
    icon: ({ color, size }: { color: string, size: number }) => React.ReactNode;
    label: string;
}

export default function WhatToDo() {
    const colors = useColors();
    const lang = useLang();
    const styles = createStyles({ colors });

    const WHAT_TO_DO: WhatToDo[] = [{
        icon: ({ color, size }) => <PlusCircle color={color} size={size} />,
        label: lang.dashboard.what_to_do.create
    }, {
        icon: ({ color, size }) => <Translate color={color} size={size} />,
        label: lang.dashboard.what_to_do.view_translations
    }, {
        icon: ({ color, size }) => <HardDrives color={color} size={size} />,
        label: lang.dashboard.what_to_do.clear
    }, {
        icon: ({ color, size }) => <Archive color={color} size={size} />,
        label: lang.dashboard.what_to_do.archived
    }, {
        icon: ({ color, size }) => <Books color={color} size={size} />,
        label: lang.dashboard.what_to_do.learn
    }];

    return (
        <Category
            title={lang.dashboard.what_to_do.title}
            data={WHAT_TO_DO}
            renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.container} key={index}>
                    {item.icon({ color: colors.font, size: 28 })}
                    <Font preset="subtitle" style={styles.label} numberOfLines={2}>{item.label}</Font>
                </TouchableOpacity>
            )}
        />
    );
}
