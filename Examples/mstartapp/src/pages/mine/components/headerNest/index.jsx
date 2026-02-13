import React, {Component} from 'react';
import {View} from 'react-native';
import BasefloorinfoFloor from './components/basefloorinfo';
import UserimageFloor from './components/userimage';
import DingdanchaxunFloor from './components/dingdanchaxun';
import WodeqianbaoFloor from './components/wodeqianbao';
import GameIconFloor from './components/gameIcon';
import ToolIconFloor from './components/toolIcon/index';
import WodeguanzhuFloor from './components/wodeguanzhu';
import PlatCardFloor from './components/platCardFloor';
import BuyOftenFloor from './components/buyOften';
import WodezhuanshuFloor from './components/wodezhuanshu';
import RecommendFloor from './components/recommendfloor';

class HeaderNest extends Component {
  constructor(props) {
    super(props);
    // 获取原始楼层数据
    const personinfoBusinessData = this.props.data ?? {};
    var floorsArr = personinfoBusinessData.floors ?? [];
    // 对楼层数据排序
    var floors = floorsArr.sort((a, b) => {
      var value1 = a.sortId;
      var value2 = b.sortId;
      return value1 - value2;
    });

    // for (let index = 0; index < floors.length; index++) {
    //   const element = floors[index];
    //   const {sortId} = element;
    //   console.log('sortId', sortId);
    // }

    this.state = {
      floors: floors,
    };
  }

  _renderFloor = (item, index) => {
    const {floors} = this.state;
    const {refId} = item;
    if (refId === 'userimage') {
      return <UserimageFloor key={refId} floor={item} floors={floors} />;
    } else if (refId === 'dingdanchaxun') {
      return <DingdanchaxunFloor key={refId} />;
    } else if (refId === 'wodeqianbao') {
      return <WodeqianbaoFloor key={refId} floor={item} floors={floors} />;
    } else if (refId === 'gameIcon') {
      return <GameIconFloor key={refId} floor={item} floors={floors} />;
    } else if (refId === 'toolIcon') {
      return <ToolIconFloor key={refId} floor={item} floors={floors} />;
    } else if (refId === 'wodeguanzhu') {
      return <WodeguanzhuFloor key={refId} />;
    } else if (refId === 'wodezhuanshu') {
      // return <WodezhuanshuFloor key={refId} floor={item} floors={floors} />;
    } else if (refId === 'platCardFloor') {
      return <PlatCardFloor key={refId} floor={item} floors={floors} />;
    } else if (refId === 'recommendfloor') {
      return <RecommendFloor key={refId} />;
    } else if (refId === 'buyOften') {
      return <BuyOftenFloor key={refId} floor={item} floors={floors} />;
    }
  };

  updateModel = data => {
    console.log('HeaderNest[updateModel]:');
    // 获取原始楼层数据
    const personinfoBusinessData = data ?? {};
    var floorsArr = personinfoBusinessData.floors ?? [];
    // 对楼层数据排序
    var floors = floorsArr.sort((a, b) => {
      var value1 = a.sortId;
      var value2 = b.sortId;
      return value1 - value2;
    });

    this.setState({
      floors: floors,
    });
  };

  render() {
    const {floors} = this.state;
    return <View style={{flex: 1}}>{floors.map(this._renderFloor)}</View>;
  }
}

export default HeaderNest;
