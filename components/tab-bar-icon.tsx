import { Image } from 'react-native';
import { Assets } from '@/constants/assets';

interface TabBarIconProps {
  focused: boolean;
  color?: string;
  name: keyof typeof Assets.images.tab;
}

export function TabBarIcon({ focused, color, name }: TabBarIconProps) {
  const icon = Assets.images.tab[name];

  return (
    <Image
      source={focused ? icon.selected : icon.normal}
      style={{ width: 28, height: 28 }}
      tintColor={color || (focused ? '#000' : 'rgba(0,0,0,0.5)')}
    />
  );
}
