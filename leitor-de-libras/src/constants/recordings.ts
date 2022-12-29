import { FileProps } from "../screens/Translations/File";

type ImportantFileProps = Omit<FileProps, "index">;

const FILES: ImportantFileProps[] = [{
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Tradução de teste 1. Boa noite!",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-02"),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-03"),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-04"),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2020/01/02 01:01:01"),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-05"),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date("2018-04-06"),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "TesteASDs dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste dois da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}, {
    thumbnail: require("../../assets/thumbnails/default-thumbnail.jpg"),
    title: "Teste tessfasfs da tradução",
    date: new Date(`${String(Math.round(Math.random() * 2022)).padStart(4, "0")}-${String(Math.round(Math.random() * 12)+1).padStart(2, "0")}-${String(Math.round(Math.random() * 28) + 1).padStart(2, "0")}`),
    length: Math.round(Math.random() * 10000)
}];

export default FILES;
// export default [] as FileProps[];
