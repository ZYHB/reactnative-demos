import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommonDialog from './index';

const DEVICE_WIDTH = Dimensions.get('window').width;

const App = () => {
  let dialogRef: any = null;
  const handleFilterEvent = () => {
    // showCenter();
    // showBottom();
    showRightToLeft();
  };

  const showRightToLeft = () => {
    dialogRef.showWithContent(
      () => {
        return (
          <View
            style={{
              height: '100%',
              width: DEVICE_WIDTH * 0.8,
              backgroundColor: 'red',
            }}>
            <Text>zhesh</Text>
          </View>
        );
      },
      () => dialogRef.hide(),
      CommonDialog.popupMode.rightToLeft,
    );
  };

  const showBottom = () => {
    dialogRef.showWithContent(
      () => {
        return (
          <View
            style={{
              height: 100,
              width: '100%',
              backgroundColor: 'red',
            }}>
            <Text>zhesh</Text>
          </View>
        );
      },
      () => dialogRef.hide(),
      CommonDialog.popupMode.bottomToTop,
    );
  };

  const showCenter = () => {
    dialogRef.showWithContent(
      () => {
        return (
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: 'red',
            }}>
            <Text>zhesh</Text>
          </View>
        );
      },
      () => dialogRef.hide(),
      CommonDialog.popupMode.center,
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Button title="showCenter" onPress={showCenter} />
        <Button title="showBottom" onPress={showBottom} />
        <Button title="showRightToLeft" onPress={showRightToLeft} />
      </View>
      <CommonDialog ref={ref => (dialogRef = ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
