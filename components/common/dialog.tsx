import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DURATION = 400;

export type PopupMode = 'center' | 'bottomToTop' | 'rightToLeft';

export interface DialogRef {
  show: (props: DialogProps) => void;
  hide: () => void;
}

export interface DialogProps {
  mode?: PopupMode;
  coverLayerColor?: string;
  onCoverLayerPress?: () => void;
  children: React.ReactNode;
}

export function Dialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<PopupMode>('center');
  const [content, setContent] = useState<React.ReactNode>(null);
  const [onCoverLayerPress, setOnCoverLayerPress] = useState<(() => void) | undefined>();

  // 动画值
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1.1)).current;
  const bottomToTop = useRef(new Animated.Value(-DEVICE_HEIGHT)).current;
  const rightToLeft = useRef(new Animated.Value(DEVICE_WIDTH)).current;

  const insets = useSafeAreaInsets();

  // 暴露给外部使用的 ref
  const dialogRef = useRef<DialogRef>({
    show: (props: DialogProps) => {
      setContent(props.children);
      setMode(props.mode || 'center');
      setOnCoverLayerPress(() => props.onCoverLayerPress);
      setIsVisible(true);

      // 触觉反馈
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      // 执行显示动画
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: DURATION,
          useNativeDriver: true,
        }),
        getShowAnimation(props.mode || 'center'),
      ]).start();
    },
    hide: () => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }),
        getHideAnimation(mode),
      ]).start(() => {
        setIsVisible(false);
        setContent(null);
      });
    },
  });

  // 暴露到全局
  if (typeof global !== 'undefined') {
    (global as any).dialogRef = dialogRef.current;
  }

  const getShowAnimation = (currentMode: PopupMode) => {
    switch (currentMode) {
      case 'bottomToTop':
        return Animated.timing(bottomToTop, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        });
      case 'rightToLeft':
        return Animated.timing(rightToLeft, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        });
      case 'center':
      default:
        return Animated.spring(scale, {
          toValue: 1,
          damping: 15,
          stiffness: 150,
          useNativeDriver: true,
        });
    }
  };

  const getHideAnimation = (currentMode: PopupMode) => {
    switch (currentMode) {
      case 'bottomToTop':
        return Animated.timing(bottomToTop, {
          toValue: -DEVICE_HEIGHT,
          duration: DURATION,
          useNativeDriver: true,
        });
      case 'rightToLeft':
        return Animated.timing(rightToLeft, {
          toValue: DEVICE_WIDTH,
          duration: DURATION,
          useNativeDriver: true,
        });
      case 'center':
      default:
        return Animated.spring(scale, {
          toValue: 1.1,
          damping: 15,
          stiffness: 150,
          useNativeDriver: true,
        });
    }
  };

  const handleCoverLayerPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCoverLayerPress?.();
    dialogRef.current.hide();
  };

  const getContainerStyle = () => {
    const baseStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity,
    };

    const contentStyle: any = {};

    switch (mode) {
      case 'bottomToTop':
        contentStyle.justifyContent = 'flex-end';
        contentStyle.paddingTop = insets.top;
        break;
      case 'rightToLeft':
        contentStyle.alignItems = 'flex-end';
        contentStyle.paddingTop = insets.top;
        break;
      case 'center':
      default:
        contentStyle.justifyContent = 'center';
        contentStyle.alignItems = 'center';
        contentStyle.paddingTop = insets.top;
        break;
    }

    return { ...baseStyle, ...contentStyle };
  };

  const getContentStyle = (): any => {
    switch (mode) {
      case 'bottomToTop':
        return {
          width: '100%',
          backgroundColor: '#FFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: insets.bottom,
          transform: [{ translateY: bottomToTop }],
        };
      case 'rightToLeft':
        return {
          width: DEVICE_WIDTH * 0.75,
          height: '100%',
          backgroundColor: '#FFF',
          transform: [{ translateX: rightToLeft }],
        };
      case 'center':
      default:
        return {
          backgroundColor: '#FFF',
          borderRadius: 12,
          padding: 20,
          minWidth: DEVICE_WIDTH * 0.7,
          maxWidth: DEVICE_WIDTH * 0.85,
          transform: [{ scale }],
        };
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <Animated.View style={getContainerStyle()}>
        <TouchableWithoutFeedback onPress={handleCoverLayerPress}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>
        <Animated.View style={getContentStyle()}>
          {content}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
