import { useState, useEffect } from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";
import {
    Image as ImageIcon,
    Warning
} from "phosphor-react-native";
import axios from "axios";
import { useColors } from "../../../contexts/colors";
import { useLang } from "../../../contexts/lang";
import { useUser } from "../../../contexts/user";
import { Location } from "../";

import Font from "../../Font";
import FixedCategory from "../../FixedCategory";
import Loading from "../../Loading";
import AvatarSuggestion, { Suggestion } from "./AvatarSuggestion";

import api from "../../../constants/api.json";
import getStyles from "./styles";
import log from "../../../utils/log";
import Empty from "../../Empty";

interface PickAvatarProps {
    setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

export default function PickAvatar({ setLocation }: PickAvatarProps) {
    const lang = useLang();
    const { user } = useUser();
    const colors = useColors();
    const styles = getStyles({ colors });

    const [avatarList, setAvatarList] = useState<Suggestion[]>([])
    const [chosenSuggestion, setChosenSuggestion] = useState<Suggestion["code"] | null>(null);
    const [avatar, setAvatar] = useState<ImageSourcePropType | null>(null);
    const [loading, setLoading] = useState(false);
    // TODO: Colocar mensagem de erro caso dê erro
    const [error, setError] = useState<null | ResponseCode>(null);

    const uri = avatarList.find(a => a.code === chosenSuggestion)?.url;

    async function handleLoadSuggestions() {
        try {
            setError(null);
            setLoading(true);
            
            const response = await axios.get<{ avatars: Suggestion[] }>(`${api.address}/data/getAvatars`, { timeout: 10000 });
            if (!response)
                return setError("unknown_err");
    
            const { data } = response;
            setAvatarList(data.avatars);
            setLoading(false);
        } catch (e) {
            const err: any = e;
            log(`Ocorreu um erro ao carregar lista de avatares: ${err}`, { color: "fgRed" });
            if (err?.response?.status === 500) {
                setError("internal_server_error")
            } else setError("unknown_err");
        }

        setLoading(false);
    }

    useEffect(() => {
        handleLoadSuggestions();
    }, []);

    return (
        <FlatList
            ListHeaderComponent={(
                <>
                    <Font style={styles.title} family="black">{lang.pick_avatar.title}</Font>
                    <Font style={styles.desc}>{lang.pick_avatar.text}</Font>
                    <Image
                        style={styles.currentAvatar}
                        source={uri ? { uri } : avatar ?? user?.avatar}
                    />
                    <Font family="black" style={styles.username}>{user?.name ?? lang.general.user.anonymous}</Font>
                    <Font style={styles.about}>Sobre mim. Escrevi um texto muito louco sobre eu mesmo</Font>
                    <TouchableOpacity style={styles.pickFromGallery}>
                        <ImageIcon
                            color={colors.accent}
                            size={20}
                        />
                        <Font family="ubuntu" style={styles.pickFromGalleryLabel}>{lang.pick_avatar.pick_from_gallery}</Font>
                    </TouchableOpacity>
                    <FixedCategory
                        title={lang.pick_avatar.suggestions.title}
                        desc={lang.pick_avatar.suggestions.text}
                    >
                        {loading && <Loading size={24} style={styles.loading} />}
                        {(error && !loading) && (
                            <Empty
                                icon={({ ...props }) => <Warning {...props} />}
                                title={lang.pick_avatar.suggestions.err.title}
                                desc={lang.pick_avatar.suggestions.err.text.replace("%s", lang.general.err_codes[error])}
                                options={[{
                                    label: lang.pick_avatar.suggestions.err.try_again,
                                    highlight: true,
                                    onPress: handleLoadSuggestions
                                }]}
                            />
                        )}
                    </FixedCategory>
                </>
            )}
            style={styles.wrapper}
            contentContainerStyle={styles.container}
            numColumns={3}
            data={avatarList}
            renderItem={({ item, index }) => <AvatarSuggestion {...item} chosenSuggestion={chosenSuggestion} setChosenSuggestion={setChosenSuggestion} key={index} />}
        />
    );
}
