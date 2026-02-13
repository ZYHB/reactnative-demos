/* eslint-disable no-shadow */
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import WaterfallFlow from 'react-native-waterfall-flow';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import CommonFooter, {FooterState} from '~/components/common-footer';
import CommonFastImage from '~/components/common-fast-image';
import {extraUtil} from '~/utils';
import {homeService} from '~/api/home-service';
import Style0901 from '../components/style-0901';
import Style0902 from '../components/style-0902';
import Style0903 from '../components/style-0903';
import Style0906 from '../components/style-0906';
import Style0907 from '../components/style-0907';
import Style0910 from '../components/style-0910';
import Style0911 from '../components/style-0911';
import Style0912 from '../components/style-0912';
import Style0914 from '../components/style-0914';
import {RouteNames, router} from '~/navigator/NavigationService';

const window = Dimensions.get('window');

export default class TabScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFirst: false, // 请求中标识
      loadingNext: false,
      viewState: ViewState.default,
      footerState: FooterState.default,
      loadFlag: false,
      page: 1,
      pageSize: 15,
      data: [],
      headerData: [],
    };
  }

  componentDidMount() {
    this._refresh();
  }

  _refresh = () => {
    this.setState({loadingFirst: true});
    if (this.state.headerData.length === 0 && this.state.data.length === 0) {
      this.setState({viewState: ViewState.loading});
    } else {
    }

    homeService
      .fetchCategoryHome(this.props.data?.pcid)
      .then(response => {
        this.setState({loadingFirst: false});
        const headerData = response.floorList ?? [];
        this.setState({headerData: headerData});
        if (headerData.length !== 0) {
          this.setState({viewState: ViewState.success});
        }
        this.fetchData(1);
      })
      .catch(error => {
        this.setState({loadingFirst: false});
        this.setState({viewState: ViewState.error});
      })
      .finally(() => {});
  };

  fetchData = page => {
    const {data, headerData} = this.state;

    this.setState({loadingNext: true});

    homeService
      .fetchCategoryFeeds(this.props.data?.pcid, page)
      .then(response => {
        if (
          page === 1 &&
          response.cards.length === 0 &&
          headerData.length === 0
        ) {
          this.setState({viewState: ViewState.empty});
        } else {
          let newData;
          if (page === 1) {
            newData = response.cards;
          } else {
            newData = [...data, ...response.cards];
          }
          this.setState({
            page: page,
            data: newData,
            footerState:
              response.cards.length !== 0
                ? FooterState.loading
                : FooterState.noMore,
          });
          this.setState({viewState: ViewState.success});
        }
      })
      .catch(error => {
        if (page === 1 && headerData.length === 0) {
          this.setState({viewState: ViewState.error});
        } else {
          this.setState({footerState: FooterState.error});
        }
      })
      .finally(() => {
        this.setState({loadingNext: false});
      });
  };

  _renderFloor = ({item, index}) => {
    const {skuId, skuName} = item;
    return (
      <View key={skuId} style={{height: 100}}>
        <Text>{skuName}</Text>
      </View>
    );
  };

  _onEndReached = () => {
    const {loadingNext, loadFlag, footerState} = this.state;
    if (!loadFlag || loadingNext || footerState === FooterState.noMore) {
      return;
    }
    this.setState({loadFlag: false});
    this.fetchData(this.state.page + 1);
  };

  _renderListView() {
    const {data, headerData, loadingFirst} = this.state;
    return (
      <View style={{flex: 1}}>
        <Text>{this.props.data?.pcid}</Text>
        <WaterfallFlow
          numColumns={2}
          initialNumToRender={30}
          style={{flex: 1}}
          data={data}
          ListHeaderComponent={<SceneHeaderNest data={headerData} />}
          ListFooterComponent={<CommonFooter {...this.state} />}
          onScrollBeginDrag={() => this.setState({loadFlag: true})}
          onEndReachedThreshold={0.01}
          onEndReached={this._onEndReached}
          refreshControl={
            <RefreshControl
              refreshing={loadingFirst}
              onRefresh={() => {
                const {loadingFirst, loadingNext} = this.state;
                if (loadingFirst || loadingNext) {
                  return;
                }
                this._refresh();
              }}
            />
          }
          renderItem={({item, index, columnIndex}) => {
            const {skuId} = item;
            return (
              <Card
                key={skuId}
                item={item}
                index={index}
                columnIndex={columnIndex}
              />
            );
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <CommonStateView
        {...this.state}
        onPress={state => {
          if (state === ViewState.error) {
            this._refresh();
          }
        }}>
        {this.state.viewState === ViewState.success
          ? this._renderListView()
          : undefined}
      </CommonStateView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/// 顶部的楼层信息
class SceneHeaderNest extends React.PureComponent {
  render() {
    const floors = this.props.data ?? [];
    return (
      <View>
        {floors.map((item, index) => {
          return this._renderFloor(item, index);
        })}
      </View>
    );
  }

  _renderFloor = (item, index) => {
    const {floorId} = item;
    let component;
    if (item.style === '0901') {
      component = <Style0901 key={floorId} data={item} />;
    } else if (item.style === '0902') {
      component = <Style0902 key={floorId} data={item} />;
    } else if (item.style === '0903') {
      component = <Style0903 key={floorId} data={item} />;
    } else if (item.style === '0906') {
      component = <Style0906 key={floorId} data={item} />;
    } else if (item.style === '0907') {
      component = <Style0907 key={floorId} data={item} />;
    } else if (item.style === '0910') {
      component = <Style0910 key={floorId} data={item} />;
    } else if (item.style === '0911') {
      component = <Style0911 key={floorId} data={item} />;
    } else if (item.style === '0912') {
      component = <Style0912 key={floorId} data={item} />;
    } else if (item.style === '0914') {
      component = <Style0914 key={floorId} data={item} />;
    } else {
      component = (
        <View
          style={{
            paddingVertical: 20,
            marginBottom: 15,
            backgroundColor: '#FFF',
          }}>
          <Text>{item.floorName}</Text>
        </View>
      );
    }

    return (
      <View key={floorId} style={{backgroundColor: 'transparent'}}>
        {component}
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 15,
            left: 15,
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <Text>item.style = {item.style}</Text>
        </View>
      </View>
    );
  };
}

/// 瀑布流卡片
class Card extends React.PureComponent {
  render() {
    const {item, index, columnIndex} = this.props;
    const {imageUrl, skuName, jdPrice, reviews} = item;
    const padding = 10;
    const hGap = 5;
    const contentW = (window.width - padding * 2 - hGap) / 2;

    return (
      <View
        style={[
          goodStyles.container,
          {
            paddingLeft: columnIndex === 0 ? padding : hGap / 2,
            paddingRight: columnIndex === 0 ? hGap / 2 : padding,
            marginBottom: 10,
          },
        ]}>
        <View style={goodStyles.card}>
          <TouchableOpacity
            style={{backgroundColor: '#fff', flex: 1}}
            activeOpacity={0.8}
            onPress={() => {
              router.push(RouteNames.Product, this.props);
            }}>
            <View style={{flex: 1, width: '100%', height: contentW}}>
              <CommonFastImage source={{uri: imageUrl}} style={{flex: 1}} />
            </View>
            <Text numberOfLines={2}>{skuName}</Text>
            <Text style={goodStyles.card_jdPrice}>￥{jdPrice}</Text>
            {extraUtil.isNullStr(reviews) ? undefined : (
              <Text style={goodStyles.card_reviews}>{reviews}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const goodStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 0.5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
  },
  card_img: {
    flex: 1,
  },
  card_jdPrice: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
  },
  card_reviews: {
    fontSize: 12,
    color: 'gray',
  },
});
