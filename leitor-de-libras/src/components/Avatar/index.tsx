import {
    Image,
    ImageProps
} from "react-native";
import { useUser } from "../../contexts/user";

interface AvatarProps extends ImageProps {
    
}

export default function Avatar({ ...rest }: AvatarProps) {
    const { user } = useUser();

    return <Image source={user.avatar ?? require("../../../assets/imgs/profile-picture.jpg")} { ...rest } />;
}
