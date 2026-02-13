import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import CommonSafeArea from '~/components/common-safe-area';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import {homeService} from '~/api/home-service';
import SearchFloor from './components/searchFloor';
export default function ShanghaiScreen(props) {
  const [viewState, setViewState] = useState(ViewState.default);
  const [result, setResult] = useState({});
  const [floors, setFloors] = useState([]);
  /********************* Effect Hook **************************/
  React.useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = () => {
    setViewState(ViewState.loading);
    homeService
      .fetchHoursHome()
      .then(response => {
        const data = response.result?.data ?? [];
        setResult(response);
        setFloors(data);
        setViewState(ViewState.success);
      })
      .catch(error => {
        this.setState({viewState: ViewState.error});
        console.log('error', error);
      });
  };

  const renderSuccessView = () => {
    return (
      <View>
        <View style={{backgroundColor: 'red'}}>
          <CommonSafeArea />
        </View>
        <SearchFloor data={result} />
        <FlatList
          data={floors}
          style={[styles.gridView]}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={[styles.itemContainer]}>
                <Text style={styles.itemName}>{item.floorStyle}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <CommonStateView
      viewState={viewState}
      onPress={state => {
        if (state === ViewState.error) {
          fetchHomeData();
        }
      }}>
      {viewState === ViewState.success ? renderSuccessView() : undefined}
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
