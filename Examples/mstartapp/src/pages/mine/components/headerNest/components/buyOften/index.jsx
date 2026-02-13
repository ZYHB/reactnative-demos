import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import CommonFastImage from '~/components/common-fast-image';

const windowWidth = Dimensions.get('window').width;

export default class BuyOftenFloor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <ContentView {...this.props} />
        </View>
        <View style={{height: 5}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  card: {},
});

///// --- 底部订单ContentView
class ContentView extends Component {
  flatListWidth = windowWidth - 20;
  constructor(props) {
    super(props);
  }

  handlePress = item => {};

  renderTopicItem = ({item}) => {
    const {backgroundUrl, imageUrl, middle, bottom, bottomSubtitle} = item;
    const itemW = this.flatListWidth / 3 - 20;
    return (
      <TouchableOpacity
        key={backgroundUrl}
        style={[
          {
            flexDirection: 'column',
            paddingTop: 10,
            paddingBottom: 10,
            width: itemW,
            paddingHorizontal: 10,
          },
        ]}
        onPress={() => this.handlePress(item)}>
        <CommonFastImage
          source={{uri: imageUrl}}
          style={{width: itemW - 20, height: itemW - 20}}
        />
        <Text style={{fontSize: 12, fontWeight: 'bold', marginTop: 3}}>
          {bottom?.value}
        </Text>
        <Text style={{fontSize: 10, color: 'red', marginTop: 3}}>
          {bottomSubtitle?.value}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {buyOftenTitle, buyOftenInfos} = this.props.floor.data;

    return (
      <View style={{}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', paddingVertical: 10}}>
          {buyOftenTitle}
        </Text>
        <FlatList
          style={{
            backgroundColor: '#FFF',
            borderRadius: 15,
            overflow: 'hidden',
          }}
          ref={ref => (this.chatView = ref)}
          data={buyOftenInfos}
          keyExtractor={(item, index) => index}
          renderItem={this.renderTopicItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={buyOftenInfos.length}
        />
      </View>
    );
  }
}
