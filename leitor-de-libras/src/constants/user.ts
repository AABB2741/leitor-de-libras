import { ImageSourcePropType } from 'react-native';

export type UserProps = {
    id?: number;
    avatar?: ImageSourcePropType;
    name?: string;
    email?: string;
    token?: string;
}

const USER: UserProps = {
    id: 666,
    avatar: require("../../assets/imgs/profile-picture.jpg"),
    name: "João",
    email: "joao.henrique@email.com",
    token: "AS(VU*KDasu8k9dvu8k9sadv89alsdJ*)"
}

export default USER;
