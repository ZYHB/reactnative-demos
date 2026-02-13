import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  RefreshControl,
  ViewToken,
  View,
} from 'react-native';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import CommonFooter, {FooterState} from '~/components/common-footer';
import {commonService} from '~/api/common-service';
import DouYinVideoCell from './cell';
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class DouYinScreen extends Component {
  state = {
    loadingFirst: false,
    loadingNext: false,
    loadFlag: false,
    viewState: ViewState.default,
    footerState: FooterState.default,
    data: [],
    page: 1,
    pageSize: 15,
    cellRefs: new Map(),
    flatListH: 0,
  };

  constructor(props: any) {
    super(props);
    console.log('DouYinScreen - props', props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchData(1);
    }, 600);
  }

  /********************* 网络请求 **************************/
  fetchData = (page: number) => {
    if (page === 1) {
      if (this.state.data.length > 0) {
        this.state.loadingFirst = true;
      }
    } else {
      this.state.loadingNext = true;
    }
    if (page === 1 && this.state.data.length === 0) {
      this.state.viewState = ViewState.loading;
    }
    this.setState({});
    commonService
      .fetchKuaiShowVideoList(page)
      .then((response: any) => {
        const list = response.data.brilliantTypeData.feeds;
        const hasNext = list.length === 0 ? false : true;
        this.state.loadingFirst = false;
        this.state.loadingNext = false;
        if (page === 1 && list.length === 0) {
          this.state.viewState = ViewState.empty;
        } else {
          let newData;
          if (page === 1) {
            newData = list;
          } else {
            newData = [...this.state.data, ...list];
          }
          this.state.page = page;
          this.state.data = newData;
          this.state.footerState = hasNext
            ? FooterState.loading
            : FooterState.noMore;
          this.state.viewState = ViewState.success;
        }
      })
      .catch((error: any) => {
        console.log('catch - error', error);
        this.state.loadingFirst = false;
        this.state.loadingNext = false;
        if (page === 1) {
          this.state.viewState = ViewState.error;
        } else {
          this.state.footerState = FooterState.error;
        }
      })
      .finally(() => {
        this.setState({});
      });
  };

  _onEndReached = () => {
    if (!this.state.loadFlag) {
      return;
    }
    if (this.state.loadingFirst || this.state.loadingNext) {
      return;
    }
    if (this.state.footerState === FooterState.noMore) {
      return;
    }
    this.state.loadFlag = false;
    this.setState({});
    this.fetchData(this.state.page + 1);
  };

  // 1. Define a function outside the component:
  _onViewableItemsChanged = (info: {viewableItems: ViewToken[]}) => {
    console.log(info);
    if (info.viewableItems.length === 1) {
      const current = info.viewableItems[0].index ?? 0;
      // Get the keys of the Map
      const mapKeys = Array.from(this.state.cellRefs.keys());
      for (let index = 0; index < mapKeys.length; index++) {
        const ref = this.state.cellRefs.get(index);
        if (index === current) {
          if (ref?.toPlay) {
            ref?.toPlay();
          }
        } else {
          if (ref?.toPaused) {
            ref?.toPaused();
          }
        }
      }
    }
  };
  _renderListView = () => {
    if (this.state.flatListH === 0) {
      return (
        <View
          style={{flex: 1}}
          onLayout={(event: any) => {
            const y = event.nativeEvent.layout.y;
            const height = event.nativeEvent.layout.height;
            console.log('onLayout' + height);
            this.setState({flatListH: height});
          }}
        />
      );
    } else {
    }
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => {
          const appBarH = Math.max(insets?.top ?? 0, 22) + 44;
          const bottomSafeH = insets?.bottom ?? 0;
          const videoViewH = DEVICE_HEIGHT - appBarH;

          return (
            <FlatList
              style={{flex: 1}}
              data={this.state.data}
              pagingEnabled={true}
              ListFooterComponent={
                <CommonFooter footerState={this.state.footerState} />
              }
              onEndReached={this._onEndReached}
              onEndReachedThreshold={0.01}
              onScrollBeginDrag={() => {
                this.state.loadFlag = true;
              }}
              onScrollEndDrag={() => console.log('Scroll end')}
              viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 80, //item滑动80%部分才会到下一个
              }}
              onViewableItemsChanged={this._onViewableItemsChanged}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.loadingFirst}
                  onRefresh={() => {
                    if (
                      this.state.loadingFirst === true ||
                      this.state.loadingNext === true
                    ) {
                      return;
                    }
                    this.fetchData(1);
                  }}
                />
              }
              keyExtractor={(item, index) => `${index}`}
              renderItem={({item, index}) => {
                return (
                  <DouYinVideoCell
                    info={item}
                    videoViewH={this.state.flatListH}
                    ref={ref => {
                      this.state.cellRefs.set(index, ref);
                    }}
                  />
                );
              }}
            />
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  };

  render() {
    return (
      <CommonScreen appbar={{title: '抖音'}}>
        <CommonSafeArea />
        <CommonStateView
          viewState={this.state.viewState}
          onPress={state => {
            if (state === ViewState.error) {
              this.fetchData(1);
            }
          }}>
          {this._renderListView()}
        </CommonStateView>
      </CommonScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
