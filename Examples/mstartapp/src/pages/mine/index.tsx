/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import CommonScreen from '~/components/common-screen';
import HeaderNest from './components/headerNest';
import NavigationBar from './components/navigationBar';
import defaultDatas from './default-data.json';
import {commonService} from '~/api/common-service';

const MineScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState<{} | null>({});
  const navBarRef = useRef<any>();
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  React.useEffect(() => {
    setListData(defaultDatas);
    handleRefreshData();
  }, []);

  // 下拉刷新
  const handleRefreshData = () => {
    if (refreshing) {
      return;
    }
    console.log('setRefreshing(true)');
    if (listData === null) {
      setRefreshing(true);
    }

    commonService
      .fetchPersoninfoBusiness()
      .then((response: any) => {
        navBarRef.current.refreshInfo();
        navBarRef.current.updateModel(response);
        console.log('setListData(response)');
        setListData(response);
      })
      .catch(error => {
        console.log('setListData(defaultDatas)');

        setListData(defaultDatas);
      })
      .finally(() => {
        console.log('setRefreshing(false)');
        setRefreshing(false);
      });
  };

  /// [回调]:FlatList触底
  const onEndReached = () => {
    console.log('onEndReached');
  };

  const onRefreshing = () => {};

  return (
    <CommonScreen showAppbar={false}>
      {refreshing ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            data={[]}
            ListHeaderComponent={() => {
              if (listData === null) {
                return <Text>listData === null</Text>;
              }
              return <HeaderNest data={listData} />;
            }}
            onEndReached={onEndReached}
            onScroll={(e: any) => {
              const offsetY = e?.nativeEvent?.contentOffset?.y ?? 0;
              const contentSize = e?.nativeEvent?.contentSize?.height ?? 0;
              navBarRef.current.onScroll(offsetY);
            }}
            renderItem={({item, index}) => <Text>{item}</Text>}
            refreshControl={
              <RefreshControl
                title={'正在刷新......'}
                refreshing={refreshing}
                onRefresh={handleRefreshData}
              />
            }
          />
          <NavigationBar ref={navBarRef} data={listData} />
        </View>
      )}
    </CommonScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MineScreen;
