import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {extraUtil} from '~/utils';
import CommonFastImage from '~/components/common-fast-image';
import {router, RouteNames} from '~/navigator/NavigationService';

export default class UserimageFloor extends Component {
  safeAreaInsets = null;
  constructor(props) {
    super(props);
  }

  getTopSafeArea = () => {
    const marginTop = Math.max(this.safeAreaInsets.top, 22);
    return <View style={{marginTop: marginTop, height: 44}} />;
  };

  render() {
    const {
      bgImgInfo: {bgImg},
    } = this.props.floor.data;
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => {
          this.safeAreaInsets = insets;
          return (
            <View style={{borderColor: 'red', borderWidth: 1}}>
              <ImageBackground
                source={{uri: bgImg}}
                style={[styles.bgImgStyle]}>
                {this.getTopSafeArea()}
                <View style={styles.container}>
                  <UserInfoSns data={this.props.floor.data} />
                  <NewPlusBlackCard data={this.props.floor.data} />
                </View>
              </ImageBackground>
            </View>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  bgImgStyle: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 10,
  },
});

class UserInfoSns extends Component {
  renderjingxiangCredit = () => {
    const {jingxiangCredit} = this.props.data;
    return (
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
        {jingxiangCredit.map(item => {
          const {functionId} = item;
          let text = item?.text;
          if (!extraUtil.isNullStr(item?.encStr?.text)) {
            text = item?.encStr?.text;
          }
          if (!extraUtil.isNullStr(text)) {
            const viewStyle = {
              paddingHorizontal: 4,
              paddingVertical: 2,
              backgroundColor: '#FFF',
              borderRadius: 8,
              marginRight: 5,
            };
            return (
              <View key={functionId} style={viewStyle}>
                <Text style={{fontSize: 11}}>
                  {text} {'>'}
                </Text>
              </View>
            );
          }
        })}
      </View>
    );
  };

  enterAppButtonPressed = () => {
    router.push(RouteNames.Login);
  };

  render() {
    const {
      userInfoSns: {imgUrl, title},
    } = this.props.data;
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.enterAppButtonPressed}>
          <CommonFastImage
            source={{uri: imgUrl}}
            style={{width: 60, height: 60}}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'center',
            padding: 10,
          }}>
          <Text>{title}</Text>
          {this.renderjingxiangCredit()}
        </View>
      </View>
    );
  }
}

class NewPlusBlackCard extends Component {
  renderList = () => {
    const {newPlusBlackCard} = this.props.data;
    const {leftInfo, midInfo, rightInfo} = newPlusBlackCard;
    const list = [leftInfo, midInfo, rightInfo];

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingVertical: 10,
        }}>
        {list.map(item => {
          const {imageUrl, title, subtitle} = item;
          const titleStyle = {color: title?.color, fontSize: 13};
          const subtitleStyle = {color: subtitle?.color, fontSize: 12};
          return (
            <View key={imageUrl} style={{flex: 1, flexDirection: 'row'}}>
              <CommonFastImage
                source={{uri: imageUrl}}
                style={{width: 40, height: 40}}
              />
              <View style={{justifyContent: 'center'}}>
                <Text style={titleStyle}>{title?.value}</Text>
                <Text style={subtitleStyle}>{subtitle?.value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    const {
      newPlusBlackCard: {bgImage},
    } = this.props.data;
    return (
      <View style={{marginVertical: 10}}>
        <ImageBackground source={{uri: bgImage}} style={{flex: 1}}>
          {this.renderList()}
        </ImageBackground>
      </View>
    );
  }
}
