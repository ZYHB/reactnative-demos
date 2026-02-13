import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CommonFastImage from '~/components/common-fast-image';
import CommonVectorIcon from '~/components/common-vector-icons';
import {globalLocation} from '~/utils';
import {RouteNames, router} from '~/navigator/NavigationService';
import {FlatList} from 'react-native-gesture-handler';

export default function SearchFloor(props: any) {
  const [result, setResult] = React.useState<any>({});
  const [locationing, setLocationing] = React.useState(false);
  const [address, setAddress] = React.useState('');
  /********************* Effect Hook **************************/
  React.useEffect(() => {
    const searchFloor = props.data?.result?.config?.searchFloor ?? {};
    const data = searchFloor.data ?? [];
    const firstObj = data.length > 0 ? data[0] : {};
    setResult(firstObj);
    getCurrentPosition();
  }, []);
  /********************* Event **************************/
  const getCurrentPosition = () => {
    setLocationing(true);
    globalLocation
      .getCurrentPosition()
      .then(result => {
        setAddress(globalLocation.formatted_address ?? '');
      })
      .catch(error => {
        console.log('定位失败:', result);
        setAddress('');
      })
      .finally(() => {
        setLocationing(false);
      });
  };
  /********************* Event **************************/
  const handleClickAddress = () => {
    router.push(RouteNames.LocationAddress);
  };
  /********************* Render **************************/
  const renderAddressView = () => {
    return (
      <View style={styles.addressView}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <CommonVectorIcon name={'map-marker-alt'} size={15} />
          {locationing ? (
            <ActivityIndicator />
          ) : (
            <Text style={{flex: 1}} numberOfLines={1}>
              {address}
            </Text>
          )}
          <CommonVectorIcon name={'chevron-down'} size={10} />
          <TouchableOpacity
            style={styles.addressTapView}
            onPress={handleClickAddress}
          />
        </View>
        <CommonFastImage
          source={{uri: result.channelDescImage?.imgUrl}}
          style={styles.channelDescImage}
        />
      </View>
    );
  };
  return (
    <View>
      {renderAddressView()}
      {(result.searchWords ?? []).length > 0 ? (
        <SearchBox searchWords={result.searchWords ?? []} />
      ) : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  addressView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    height: 40,
    borderColor: 'red',
    borderWidth: 1,
  },
  addressTapView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  channelDescImage: {
    height: 15,
    aspectRatio: 468 / 36,
  },
});

const SearchBox = (props: any) => {
  const [searchWords, setSearchWords] = React.useState(props.searchWords ?? []);
  const flatListRef = React.useRef<FlatList>(null);
  let index = 0;
  let intervalID: any;
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  React.useEffect(() => {
    reset();
    if (searchWords.length > 0) {
      intervalID = setInterval(() => {
        handleInterval();
      }, 4000);
    }
  }, []);
  React.useEffect(() => {
    return () => {
      clearInterval(intervalID);
      console.log('SearchBox 组件卸载');
    };
  }, []);

  const handleInterval = () => {
    index++;
    if (index >= searchWords.length) {
      index = 0;
    }
    flatListRef.current?.scrollToIndex({
      animated: index === 0 ? false : true,
      index: index,
      viewPosition: 0.5,
    });
  };

  const reset = () => {
    clearInterval(intervalID);
    index = 0;
    flatListRef.current?.scrollToIndex({
      animated: index === 0 ? false : true,
      index: index,
      viewPosition: 0.5,
    });
  };

  return (
    <View style={{paddingHorizontal: 12}}>
      <View style={searchBoxStyles.content}>
        <View style={{flex: 1, marginLeft: 8}}>
          <FlatList
            ref={flatListRef}
            scrollEnabled={false}
            data={searchWords}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={searchBoxStyles.searchItem}>
                  <Text style={{}}>{item.showWord ?? ''}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={searchBoxStyles.searchBtn} />
      </View>
    </View>
  );
};

const searchBoxStyles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 1,
  },
  searchBtn: {
    width: 40,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'red',
    marginRight: 5,
  },
  searchItem: {
    height: 40,
    justifyContent: 'center',
  },
});
