import {
    Image,
    ScrollView,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import {
    ClipboardText,
    CloudSlash,
    DownloadSimple,
    File,
    FileDotted,
    IconProps,
    Info,
    PencilSimple,
    ShareNetwork,
    Translate,
} from "phosphor-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Video } from "expo-av";
import * as SecureStore from "expo-secure-store";
import * as Storage from "../../services/Storage";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import { api } from "../../lib/api";

import Header from "../../components/Header";
import Font from "../../components/Font";

import createStyles from "./styles";
import { FileProps } from "../Translations/File";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Popup from "../../components/Popup";
import Button from "../../components/Button";
import Empty from "../../components/Empty";

type Option = {
    icon: (props: IconProps) => JSX.Element;
    label: string;
    onPress?: () => void;
    checkVisibility?: () => boolean;
};

interface WatchProps {
    navigation: NativeStackNavigationProp<TranslationsParamList, "Watch">;
    route: RouteProp<TranslationsParamList, "Watch">;
}

type UploadedFile = FileProps & { uploaded?: boolean };

export default function Watch({ navigation, route }: WatchProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const [outOfSync, setOutOfSync] = useState(false);
    const [error, setError] = useState<null | ResponseCode>(null);
    const [data, setData] = useState<null | UploadedFile>(null);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const [showFullTitle, setShowFullTitle] = useState(false);

    const { id } = route.params;

    async function loadFile() {
        const localFiles = (await Storage.getItem("translations")) ?? [];
        const localFile = localFiles.find((f) => f.id === id) ?? null;
        let file: UploadedFile | null = null;

        try {
            setError(null);
            const token = await SecureStore.getItemAsync("token");

            const { data } = await api.get<UploadedFile>("/watch", {
                headers: {
                    Authorization: token,
                    id: route.params.id,
                },
            });

            if (data.updatedAt !== localFile?.updatedAt) {
                setOutOfSync(true);
            }

            if (localFile) {
                file = { ...data, location: localFile.location, uploaded: true };
            } else file = { ...data, uploaded: true };
        } catch (err: any) {
            if (err.response.status === 401) {
                setError("invalid_token");
            }

            file = localFile;
        }

        if (!file) {
            setError("file_not_found");
        }

        setData(file);
    }

    async function pullServerFile() {
        setData(null);

        try {
            setError(null);
            const token = await SecureStore.getItemAsync("token");
            const localFile =
                (await Storage.getItem("translations"))?.find(
                    (f) => f.id === route.params.id,
                ) ?? null;

            const { data } = await api.get<FileProps>("/watch", {
                headers: {
                    Authorization: token,
                    id: route.params.id,
                },
            });

            const res = await Storage.updateItem(
                "translations",
                (f) => f.id === data.id,
                {
                    ...data,
                    location: localFile?.location ?? data.location,
                },
            );

            setData(res);
            setOutOfSync(false);
        } catch (err) {
            setError("unknown_err");
        }
    }

    async function pushServerFile() { }

    useEffect(() => {
        loadFile();
    }, []);

    if (error) {
        return (
            <View style={[styles.container, styles.loading]}>
                <Empty
                    title={lang.watch.error.title}
                    desc={lang.general.err_codes[error]}
                    icon={(props) => <FileDotted {...props} />}
                    options={[
                        {
                            label: lang.watch.error.try,
                            highlight: true,
                            onPress: loadFile,
                        },
                    ]}
                />
            </View>
        );
    }

    if (!data) {
        return (
            <View style={[styles.container, styles.loading]}>
                <Loading />
            </View>
        );
    }

    const mediaUrl = `${api.getUri()}/uploads/${data.imageName}`;

    if (fullScreen) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.fullScreen}
                onPress={() => setFullScreen(false)}
            >
                {data.type === "i" ? (
                    <Image
                        style={styles.fullScreen}
                        source={{
                            uri: data.location ?? mediaUrl,
                        }}
                    />
                ) : (
                    <Video source={{ uri: data.location ?? mediaUrl }} />
                )}
            </TouchableOpacity>
        );
    }

    const OPTIONS: Option[] = [
        {
            label: lang.watch.options.share,
            icon: (props) => <ShareNetwork {...props} />,
            checkVisibility: () => !!data.uploaded,
        },
        {
            label: lang.watch.options.edit,
            icon: (props) => <PencilSimple {...props} />,
            checkVisibility: () => true,
        },
        {
            label: lang.watch.options.copy,
            icon: (props) => <ClipboardText {...props} />,
            checkVisibility: () => true,
        },
        {
            label: lang.watch.options.details,
            icon: (props) => <Info {...props} />,
            checkVisibility: () => true,
        },
        {
            label: lang.watch.options.download,
            icon: (props) => <DownloadSimple {...props} />,
        },
    ];

    return (
        <View style={styles.container}>
            <Popup visible={outOfSync} type="message">
                <CloudSlash
                    color={colors.desc}
                    size={24}
                    style={styles.outOfSyncIcon}
                />
                <Font family="ubuntu" style={styles.outOfSyncText}>
                    {lang.watch.out_of_sync.title}
                </Font>
                <Font family="regular" style={styles.outOfSyncText}>
                    {lang.watch.out_of_sync.text}
                </Font>
                <View style={styles.outOfSyncOptions}>
                    <TouchableOpacity
                        style={styles.outOfSyncOption}
                        onPress={pullServerFile}
                    >
                        <Image
                            source={require("../../../assets/icons/cloud_sync.png")}
                            style={styles.outOfSyncOptionIcon}
                        />
                        <Font family="ubuntu" style={styles.outOfSyncOptionText}>
                            {lang.watch.out_of_sync.cloud}
                        </Font>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.outOfSyncOption, styles.outOfSyncOptionBorder]}
                    >
                        <Image
                            source={require("../../../assets/icons/mobile.png")}
                            style={styles.outOfSyncOptionIcon}
                        />
                        <Font family="ubuntu" style={styles.outOfSyncOptionText}>
                            {lang.watch.out_of_sync.device}
                        </Font>
                    </TouchableOpacity>
                </View>
                <Button onPress={() => setOutOfSync(false)}>
                    {lang.watch.out_of_sync.none}
                </Button>
            </Popup>
            <Header title="Tradução" />
            <View style={styles.video}>
                <TouchableOpacity
                    onPress={data.type === "i" ? () => setFullScreen(true) : undefined}
                >
                    {data.type === "i" && (
                        <Image
                            style={styles.image}
                            source={{
                                uri: data.location ?? mediaUrl,
                            }}
                        />
                    )}
                    {data.type === "v" && (
                        <Video
                            style={styles.image}
                            source={{ uri: data.location }}
                            useNativeControls
                        />
                    )}
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scroll}>
                <TouchableOpacity onPress={() => setShowFullTitle(!showFullTitle)}>
                    <Font
                        family="black"
                        style={styles.title}
                        numberOfLines={showFullTitle ? undefined : 2}
                    >
                        {data.title}
                    </Font>
                </TouchableOpacity>
                <FlatList
                    contentContainerStyle={styles.options}
                    data={OPTIONS}
                    renderItem={({ item, index }) =>
                        item.checkVisibility?.() ? (
                            <TouchableOpacity style={styles.option} key={index}>
                                {item.icon({ color: colors.font, size: 16 })}
                                <Font family="ubuntu" style={styles.optionLabel}>
                                    {item.label}
                                </Font>
                            </TouchableOpacity>
                        ) : null
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <View>
                    <View style={styles.wordContainer}>
                        {data.type === "i" && data.content && (
                            <Font family="black" style={styles.word}>
                                {data.content}
                            </Font>
                        )}
                        {data.type === "v" && data.content && (
                            <Font style={styles.text}>{data.content}</Font>
                        )}
                        {!data.content && (
                            <Empty
                                title={lang.watch.not_translated_yet.title}
                                desc={lang.watch.not_translated_yet.text}
                                icon={props => <Translate {...props} />}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
