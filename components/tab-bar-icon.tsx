import { Image } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface TabBarIconProps {
  focused: boolean;
  color?: string;
  name: string;
}

export function TabBarIcon({ focused, color, name }: TabBarIconProps) {
  // 根据 name 映射到对应的图片资源
  const iconMap = {
    index: {
      normal: require('@/assets/images/tab/tabbar_home.png'),
      selected: require('@/assets/images/tab/tabbar_home_sel.png'),
    },
    news: {
      normal: require('@/assets/images/tab/tabbar_course.png'),
      selected: require('@/assets/images/tab/tabbar_course_sel.png'),
    },
    explore: {
      normal: require('@/assets/images/tab/tabbar_ask.png'),
      selected: require('@/assets/images/tab/tabbar_ask_sel.png'),
    },
    shopcart: {
      normal: require('@/assets/images/tab/tabbar_choose.png'),
      selected: require('@/assets/images/tab/tabbar_choose_sel.png'),
    },
    mine: {
      normal: require('@/assets/images/tab/tabbar_my.png'),
      selected: require('@/assets/images/tab/tabbar_my_sel.png'),
    },
  };

  const icon = iconMap[name as keyof typeof iconMap];

  return (
    <Image
      source={focused ? icon.selected : icon.normal}
      style={{ width: 28, height: 28 }}
      tintColor={color || (focused ? '#000' : 'rgba(0,0,0,0.5)')}
    />
  );
}
