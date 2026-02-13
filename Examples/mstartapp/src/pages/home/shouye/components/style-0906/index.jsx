import {StyleSheet, View} from 'react-native';
import React from 'react';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

const Style0906 = props => {
  const {headImg} = props.data;
  return (
    <View style={[commonStyles.container]}>
      <View>
        <CommonFastImage source={{uri: headImg}} style={styles.headImg} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headImg: {
    width: '100%',
    height: 40,
  },
});

export default Style0906;
