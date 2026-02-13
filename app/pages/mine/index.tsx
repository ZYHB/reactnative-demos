// import { useRouter } from 'expo-router';
// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function MineScreen() {
//   const router = useRouter();

//   const handleSettingPress = () => {
//     router.push('/pages/setting');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>我的</Text>
//       <TouchableOpacity
//         style={styles.settingButton}
//         onPress={handleSettingPress}
//       >
//         <Text style={styles.settingButtonText}>设置</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   settingButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   settingButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

import CommonScreen from '@/components/common-screen';
import HeaderNest from '@/components/pages/mine/headerNest';
import NavigationBar from '@/components/pages/mine/navigationBar';
import { commonService } from '@/services';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View
} from 'react-native';
import defaultDatas from './default-data.json';

const MineScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState<object | null>({});
  const navBarRef = useRef<any>(null);

  // 下拉刷新
  const handleRefreshData = useCallback(() => {
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
  }, [refreshing, listData]);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  React.useEffect(() => {
    setListData(defaultDatas);
    handleRefreshData();
  }, [handleRefreshData]);

  /// [回调]:FlatList触底
  const onEndReached = () => {
    console.log('onEndReached');
  };


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

export default MineScreen;
