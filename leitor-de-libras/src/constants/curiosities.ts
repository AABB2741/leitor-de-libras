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
}, {
    id: "different",
    type: "curiosity",
    credits: {
        author: "Nicole Utzig Mattjie",
        via: "Ensino.digital",
        url: "https://ensino.digital/blog/22-curiosidades-da-libras-que-voce-nao-conhece"
    }
}]

export default function getCuriosity(id?: CuriosityID) {
    if (id) {
        return CURIOSITIES.find(c => c.id === id) as Curiosity;
    }

    return CURIOSITIES[Math.round(Math.random() * (CURIOSITIES.length - 1))];
}
