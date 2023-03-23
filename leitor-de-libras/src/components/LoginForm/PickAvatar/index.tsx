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

import Empty from "../../Empty";
import Button from "../../Button";
import Font from "../../Font";
import FixedCategory from "../../FixedCategory";
import Loading from "../../Loading";
import AvatarSuggestion, { Suggestion } from "./AvatarSuggestion";

import api from "../../../constants/api.json";
import getStyles from "./styles";
import log from "../../../utils/log";

interface PickAvatarProps {
    setLocation: React.Dispatch<React.SetStateAction<Location>>;
}

export default function PickAvatar({ setLocation }: PickAvatarProps) {
    const lang = useLang();
    const { user, signed } = useUser();
    const colors = useColors();
    const styles = getStyles({ colors });

    const [avatarList, setAvatarList] = useState<Suggestion[]>([])
    const [chosenSuggestion, setChosenSuggestion] = useState<Suggestion["code"] | null>(null);
    const [loading, setLoading] = useState(false);
    // TODO: Colocar mensagem de erro caso dê erro
    const [error, setError] = useState<null | ResponseCode>(null);

    const uri = avatarList.find(a => a.code === chosenSuggestion)?.url;
    const avatar = { uri };

    async function handleLoadSuggestions() {
        try {
            setAvatarList([]);
            setError(null);
            setLoading(true);

            const response = await axios.get<{ avatars: Suggestion[] }>(`${api.address}/data/getAvatars`, { timeout: 15000 });
            if (!response)
                return setError("unknown_err");

            const { data } = response;
            
            setAvatarList(data.avatars);
        } catch (e) {
            const err: any = e;
            log(`Ocorreu um erro ao carregar lista de avatares: ${err}`, { color: "fgRed" });
            if (err?.response?.status === 500) {
                setError("internal_server_error")
            } else setError("unknown_err");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleLoadSuggestions();
    }, []);
    
    return (
        <FlatList
            ListHeaderComponent={(
                <>
                    <View style={styles.options}>
                        <Button
                            label={lang.pick_avatar.skip}
                        />
                        <Button
                            label={lang.pick_avatar.confirm}
                            disabled={!avatar && !chosenSuggestion}
                            highlight
                        />
                    </View>
                    <Font style={styles.title} family="black">{lang.pick_avatar.title}</Font>
                    <Font style={styles.desc}>{lang.pick_avatar.text}</Font>
                    <Image
                        style={styles.currentAvatar}
                        source={avatar ?? user.avatar}
                    />
                    <Font family="black" style={styles.username}>{avatar ? lang.pick_avatar.praise.replace("%s", user.name) : user.name}</Font>
                    <Font style={styles.about}>{lang.pick_avatar.instructions.replace("%s", lang.pick_avatar.confirm)}</Font>
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
