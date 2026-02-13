import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const DEVICE_WIDTH = Dimensions.get('window').width;
const AlertControllerWidth = DEVICE_WIDTH - 100;

interface Props {
  title?: string;
  message?: string;
  actionNames?: Array<string>;
  onPress?: ((event: number) => void) | undefined;
  children?: React.ReactNode;
}

export default function CommonAlert(props: Props) {
  const renderActionBtn = (item: string, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.actionBtn,
          {flex: props.actionNames?.length === 2 ? 1 : undefined},
        ]}
        onPress={() => props.onPress && props.onPress(index)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };
  const renderActionsView = () => {
    if (props.actionNames && props.actionNames.length > 0) {
      if (props.actionNames.length === 1) {
        return (
          <View style={{borderTopColor: '#EEE', borderTopWidth: 0.5}}>
            {props.actionNames?.map((item, index) => {
              return renderActionBtn(item, index);
            })}
          </View>
        );
      } else if (props.actionNames.length === 2) {
        return (
          <View
            style={{
              flexDirection: 'row',
              borderTopColor: '#EEE',
              borderTopWidth: 0.5,
            }}>
            {props.actionNames?.map((item, index) => {
              return renderActionBtn(item, index);
            })}
          </View>
        );
      } else if (props.actionNames.length > 2) {
        return (
          <View>
            {props.actionNames?.map((item, index) => {
              return renderActionBtn(item, index);
            })}
          </View>
        );
      }
    }
  };
  return (
    <View style={[styles.container]}>
      <Text style={[styles.title]}>{props.title}</Text>
      <Text style={[styles.message]}>{props.message}</Text>
      <View>{renderActionsView()}</View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: AlertControllerWidth,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  message: {
    color: '#333333',
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  actionBtn: {
    height: 44,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#EEE',
    borderRightWidth: 0.5,
  },
});
