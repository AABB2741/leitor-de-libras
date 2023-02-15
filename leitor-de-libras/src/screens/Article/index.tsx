import { RouteProp } from "@react-navigation/native";
import {
    View,
    ScrollView,
    TouchableOpacity
} from "react-native";
import {
    ArrowSquareOut,
    CaretLeft,
    Heart,
    ShareNetwork
} from "phosphor-react-native";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";
import getCuriosity from "../../constants/curiosities";

import Font from "../../components/Font";
import Link from "../../components/Link";

import createStyles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


interface ArticleProps {
    navigation: NativeStackNavigationProp<DashboardParamList, "Article">;
    route: RouteProp<DashboardParamList, "Article">;
}

export default function Article({ navigation, route }: ArticleProps) {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const curiosity = getCuriosity(route.params.id);

    return (
        <View style={styles.wrapper}>
            <View style={styles.options}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <CaretLeft
                        size={24}
                        color={colors.font}
                    />
                </TouchableOpacity>
                <Link
                    url={curiosity.credits.url}
                    labelStyle={styles.fullArticleLabel}
                    noSupportMessage={lang.article.cant_open_url.replace("%s", curiosity.credits.url)}
                >{lang.article.full_article}</Link>
            </View>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.presentation}>
                    <Font family="black" style={styles.title}>{lang.dashboard.tips[route.params.id].title}</Font>
                    <Font style={styles.credits}>{lang.article.credits.replace("%s1", curiosity.credits.author ?? "??").replace("%s2", curiosity.credits.via)}</Font>
                </View>
                <Font style={styles.article}>{lang.dashboard.tips[route.params.id].long}</Font>
                <Font style={styles.article}>{lang.dashboard.tips[route.params.id].long}</Font>
            </ScrollView>
        </View>
    );
}
