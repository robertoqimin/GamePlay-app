import { Image } from 'react-native';

export default function AvatarGenerico() {
  return (
    <Image source={require('../../assets/icones/avatar.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
  );
}
