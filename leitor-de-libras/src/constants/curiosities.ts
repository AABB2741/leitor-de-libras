export type CuriosityType = "curiosity" | "tip";

interface Curiosity {
    id: CuriosityID;
    type: CuriosityType;
    credits: {
        author?: string;
        via: string;
        url: string;
    }
}

const CURIOSITIES: Curiosity[] = [{
    id: "about_libras",
    type: "curiosity",
    credits: {
        author: "Cleusangela Barros Meira Silva",
        via: "SignumWEB",
        url: "https://blog.signumweb.com.br/curiosidades/07-curiosidades-sobre-a-lingua-brasileira-de-sinais-libras/"
    }
}]

export default function getCuriosity(id?: CuriosityID) {
    return CURIOSITIES[Math.round(Math.random() * (CURIOSITIES.length - 1))];
}
