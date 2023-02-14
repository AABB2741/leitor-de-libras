import "react-native-get-random-values";
import { v4 as uuid4 } from "uuid";

import {
    DeviceMobileCamera
} from "phosphor-react-native";

import { FileProps } from "../screens/Translations/File";

const FILES: FileProps[] = [{
    id: uuid4(),
    state: "localStorage",
    favorited: true,
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Tradução de teste 1. Boa noite!",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "downloading",
    favorited: true,
    archived: true,
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-02"),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "cloud",
    favorited: true,
    archived: true,
    locked: true,
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-03"),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "synching",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-04"),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2020/01/02 01:01:01"),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-05"),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-06"),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "TesteASDs dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    id: uuid4(),
    state: "localStorage",
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste tessfasfs da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}];

export default FILES;
// export default [] as FileProps[];
