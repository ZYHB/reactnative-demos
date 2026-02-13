import {Text, StyleSheet, View, Dimensions} from 'react-native';
import React, {Component} from 'react';
import CommonFastImage from '~/components/common-fast-image';
const windowWidth = Dimensions.get('window').width;
const flatListWidth = windowWidth - 20;
const space = 10;
const itemW = (flatListWidth - space) / 2;
export default class PlatCardFloor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {floors} = this.props.floor.data;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.card_wrap}>
            {floors.map((item, index) => {
              const {refId} = item;
              const {headInfo, contentInfo} = item.data;
              const card1Sty = {
                width: itemW,
                marginRight: index % 2 === 0 ? space : 0,
              };
              return (
                <View key={refId} style={[styles.card_wrap_item, card1Sty]}>
                  <View style={styles.card_wrap_item_header}>
                    <CommonFastImage
                      source={{uri: headInfo.logo}}
                      style={{width: 20, height: 20}}
                    />
                    <Text>{headInfo?.title?.value}</Text>
                    <CommonFastImage
                      source={{uri: headInfo.arrow}}
                      style={{width: 10, height: 10}}
                    />
                  </View>
                  <CommonFastImage
                    source={{uri: contentInfo.contentImg}}
                    style={{
                      width: '100%',
                      height: 80,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  card_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card_wrap_item: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    marginBottom: 10,
  },

  card_wrap_item_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
