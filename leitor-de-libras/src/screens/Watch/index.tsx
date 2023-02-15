import {
    ScrollView,
    View,
    FlatList,
    TouchableOpacity
} from "react-native";
import { ClipboardText, IconProps, Info, PencilSimple, ShareNetwork } from "phosphor-react-native";

import { useColors } from "../../contexts/colors";
import { useLang } from "../../contexts/lang";

import Header from "../../components/Header";
import Font from "../../components/Font";

import createStyles from "./styles";

type Option = {
    icon: (props: IconProps) => JSX.Element;
    label: string;
    onPress?: () => void;
}

export default function Watch() {
    const lang = useLang();
    const colors = useColors();
    const styles = createStyles({ colors });

    const OPTIONS: Option[] = [{
        label: lang.watch.options.share,
        icon: props => <ShareNetwork {...props} />
    }, {
        label: lang.watch.options.edit,
        icon: props => <PencilSimple {...props} />
    }, {
        label: lang.watch.options.copy,
        icon: props => <ClipboardText {...props} />
    }, {
        label: lang.watch.options.details,
        icon: props => <Info {...props} />
    }]

    return (
        <View style={styles.container}>
            <Header
                title="Tradução"
            />
            <View style={styles.video}>

            </View>
            <ScrollView style={styles.scroll}>
                <Font family="black" style={styles.title} numberOfLines={2}>Título do vídeo Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, ducimus.</Font>
                <FlatList
                    contentContainerStyle={styles.options}
                    data={OPTIONS}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.option}>
                            {item.icon({ color: colors.font, size: 16 })}
                            <Font family="ubuntu" style={styles.optionLabel}>{item.label}</Font>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <Font style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, aliquam officiis illum labore ipsum iusto, esse magnam sequi veritatis inventore molestiae. Quam voluptatum soluta illo suscipit repellat aspernatur molestias ducimus ab dicta eius dignissimos optio nobis vitae adipisci minima dolore porro deserunt officiis, repellendus repudiandae facilis hic. Odio sequi alias sit aspernatur, accusantium sed possimus fugit laboriosam, repellat tenetur libero, aut cupiditate. Nulla assumenda distinctio quidem ipsa vitae earum magni at corrupti placeat culpa. Sapiente iure iste eius quidem fuga commodi beatae aperiam! Saepe quas iure excepturi fuga a dolore officiis non, neque optio similique incidunt distinctio cupiditate libero enim nihil nemo maxime nobis! Repellat sit eius dolores nemo, aliquid veniam qui ut inventore corporis hic recusandae voluptatibus doloremque, quam velit tempora enim! Vitae reiciendis animi dolorum voluptates, nesciunt deleniti saepe inventore accusantium molestiae voluptatum laborum rem numquam, veritatis soluta exercitationem tempore sit natus quis minima, id repellat? Quasi ipsum at velit natus unde! Nostrum laboriosam porro debitis consequatur voluptatibus fuga! Numquam, esse nam voluptatem molestiae illum tempora vel dolores quae totam, laboriosam nemo beatae delectus non fugiat quia corporis commodi alias, incidunt doloremque asperiores dolor! Qui, cupiditate! Repellat quis beatae quisquam officia aliquid architecto consequuntur, dolores cumque non vitae laborum quas sapiente cum, obcaecati asperiores. Corporis dignissimos inventore consectetur voluptate laudantium eaque delectus, maxime quas sint voluptatum sed ea. Eum totam laborum assumenda omnis eveniet nesciunt ea veniam cum. Magnam debitis, aperiam asperiores quo, illo maiores quos praesentium ab quibusdam porro ex illum optio veritatis explicabo eos accusamus? Sunt, aspernatur quidem, dicta optio quas adipisci praesentium pariatur, illum quos deserunt voluptatem perspiciatis architecto quia reprehenderit hic voluptas amet. Laudantium perferendis esse beatae ut voluptatum necessitatibus ea quis, quae vero nulla culpa recusandae quasi quam at molestias voluptas possimus quas cupiditate laborum repellat accusantium ipsam ratione quisquam eos. Blanditiis ratione quos maxime dolore quidem dolor ad sit ullam sunt, illo amet accusantium sed perspiciatis sapiente a, alias, nemo quas est dicta voluptatibus provident pariatur eum dignissimos! Autem similique facilis optio exercitationem quaerat, sint quis consequatur nam hic qui quidem odio architecto illo! Rerum exercitationem molestiae et blanditiis, vitae architecto beatae suscipit quos odit necessitatibus voluptatum dignissimos vel cumque, numquam nesciunt enim accusamus voluptas iusto. Nemo, similique mollitia. Blanditiis quo dolores facere beatae saepe odit quidem nesciunt similique voluptatibus dicta, necessitatibus ducimus illum aut at inventore optio excepturi nisi, a, ratione voluptatem sint incidunt? Magnam quia exercitationem, dolore, possimus reprehenderit odio, ipsa nemo sapiente facilis dicta quos libero saepe consequuntur reiciendis ipsam obcaecati debitis amet dolor iusto quasi voluptates voluptatum commodi! Similique aspernatur voluptate inventore quas laudantium. Optio id maxime vel quibusdam odio sed. Dolorum voluptatum repellat laborum totam inventore quidem voluptas quas ipsam labore in alias nobis, asperiores architecto perferendis magni eveniet velit eius iusto. Quibusdam veniam adipisci autem odit quae omnis, impedit corrupti hic laborum voluptas quia eveniet tempore minus similique, alias laboriosam perspiciatis delectus sapiente beatae eius error, aut recusandae rerum. Ab eum, quam dolore laboriosam tempora consequuntur? Amet delectus doloribus optio, itaque beatae aliquam dolorum veniam quis?</Font>
            </ScrollView>
        </View>
    );
}