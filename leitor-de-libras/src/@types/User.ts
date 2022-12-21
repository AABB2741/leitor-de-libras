import { ImageSourcePropType } from 'react-native';

type User = {
    id?: number;
    token?: string;
    avatar?: ImageSourcePropType;
    nickname?: string;
    email?: string;
    signed: boolean;
}
export default User;
