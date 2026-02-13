import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Switch,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type CellType = 'normal' | 'switch';

export interface ListCellProps {
  title: string;
  subtitle?: string;
  showRedDot?: boolean;
  cellType?: CellType;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  icon?: string;
  rightIcon?: boolean;
}

export function ListCell({
  title,
  subtitle,
  showRedDot = false,
  cellType = 'normal',
  switchValue,
  onSwitchChange,
  onPress,
  style,
  icon,
  rightIcon = true,
}: ListCellProps) {
  const renderLeftContent = () => {
    return (
      <View style={styles.leftContainer}>
        {icon && <Ionicons name={icon as any} size={20} color="#333" style={{ marginRight: 8 }} />}
        <View style={styles.textContainer}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
          )}
        </View>
      </View>
    );
  };

  const renderRightContent = () => {
    if (cellType === 'switch') {
      return <Switch value={switchValue} onValueChange={onSwitchChange} />;
    }

    if (rightIcon) {
      return (
        <View style={styles.rightContainer}>
          {showRedDot && <View style={styles.redDot} />}
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </View>
      );
    }

    return null;
  };

  if (cellType === 'switch') {
    return (
      <ThemedView style={[styles.container, style]}>
        {renderLeftContent()}
        {renderRightContent()}
      </ThemedView>
    );
  }

  // cellType === 'normal'
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {renderLeftContent()}
      {renderRightContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginRight: 8,
  },
});
