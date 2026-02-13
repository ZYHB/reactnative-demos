import React, {PureComponent} from 'react';
import {Text, StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import CommonFastImage from '~/components/common-fast-image';

export default class SmallItem extends PureComponent {
  render() {
    const width = this.props.width ?? 50;
    const data = this.props.data ?? {};
    const contentInfo = data.contentInfo ?? {};

    const functionId = data.functionId ?? '';
    const title = data.title ?? '测试数据';
    const safeImage = contentInfo.safeImage ?? '';

    return (
      <TouchableOpacity
        key={functionId}
        style={[styles.container, {width: width}]}
        onLayout={event => this.onLayout(event, data)}
        onPress={() => this.handlePress(data)}>
        <CommonFastImage
          source={{uri: safeImage}}
          style={{width: 30, height: 30}}
        />
        <Text style={{fontSize: 11, marginTop: 3}}>{title.value}</Text>
        {this.renderRedDotInfoList(data)}
      </TouchableOpacity>
    );
  }

  handlePress = data => {};

  onLayout = (event, data) => {
    this.props.onLayout(event, data);
  };

  renderRedDotInfoList = data => {
    const width = this.props.width ?? 50;
    const redDotInfoList = data.redDotInfoList ?? [];

    const bubbleTextSty = {fontSize: 10, color: '#FFF', paddingHorizontal: 3};
    const bubbleTextIconSty = {width: 10, height: 10};
    if (redDotInfoList.length !== 0) {
      return (
        <FlatList
          style={[styles.redDotInfoList, {left: width / 2}]}
          data={redDotInfoList}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            const {functionId, bubbleText, bubbleTextIcon} = item;
            return (
              <View
                key={functionId}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <CommonFastImage
                  source={{uri: bubbleTextIcon}}
                  style={bubbleTextIconSty}
                />
                <Text style={bubbleTextSty}>{bubbleText}</Text>
              </View>
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={redDotInfoList.length}
        />
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  redDotInfoList: {
    borderColor: '#FFF',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'red',
    top: 5,
    height: 15,
    borderRadius: 7,
  },
});
