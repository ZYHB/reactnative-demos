import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import CommonSafeArea from '~/components/common-safe-area';

export default function TanguanScreen(props) {
  const insets = useSafeAreaInsets();
  const [viewState, setViewState] = useState(ViewState.default);
  const [datas, setDatas] = useState([]);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  React.useEffect(() => {
    // console.log('这里传空数组,只在第一次渲染时调用', props);
    setViewState(ViewState.loading);
    setTimeout(() => {
      setViewState(ViewState.success);
      const arr = Array.from({length: 100}, (v, k) => k + 'eee');
      setDatas(arr);
    }, 2000);
  }, []);

  return (
    <CommonStateView
      viewState={viewState}
      onPress={state => {
        if (state === ViewState.error) {
        }
      }}>
      {viewState === ViewState.success ? (
        <View style={{flex: 1}}>
          <FlatList
            data={datas}
            initialNumToRender={30}
            style={[styles.gridView]}
            ListHeaderComponent={<CommonSafeArea type="appBar" />}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={[styles.itemContainer]}>
                  <Text style={styles.itemName}>{index}</Text>
                </View>
              );
            }}
          />
        </View>
      ) : undefined}
    </CommonStateView>
  );
}

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 44,
    borderColor: 'red',
    borderWidth: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
  },
});
