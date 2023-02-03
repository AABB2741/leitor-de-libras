import {
    useState,
    useEffect
} from "react";
import {
    ImageSourcePropType
} from "react-native";

type PresentationPage = {
    title?: string;
    text?: string;
    img?: ImageSourcePropType
}

interface PresentationProps {
    initialPage?: number;
    unskippable?: boolean;
    pages?: PresentationPage[];
    onRequestClose?: () => void;
    onChangePage?: (page?: number) => void;
}

export default function Presentation({ initialPage, ...rest }: PresentationProps) {
    const [index, setIndex] = useState(initialPage ?? 0);
    const [page, setPage] = useState<PresentationPage | null>(null);

    useEffect(() => {
        
    }, [index]);

    return null;
}
