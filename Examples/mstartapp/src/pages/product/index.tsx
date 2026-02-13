import {StyleSheet, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import {CommonDataModelType1} from '~/common/common-model-type';
import {productService} from '~/api/product-service';
import PNbpMainImage from './components/aenu-bpMainImage';
import PNbpName from './components/aenu-bpName';
import PNbpChoice from './components/aenu-bpChoice';
import PNbpschj from './components/aenu-bpschj';
import PNbpEvaluate from './components/aenu-bpEvaluate';

const CardItem = (props: any) => {
  const {cf, data, mId, sortId} = props.data;
  let child;
  if (mId === 'bpMainImage') {
    return <PNbpMainImage data={props.data} fullData={props.fullData} />;
  } else if (mId === 'bpName') {
    return <PNbpName data={props.data} fullData={props.fullData} />;
  } else if (mId === 'bpChoice') {
    return <PNbpChoice data={props.data} fullData={props.fullData} />;
  } else if (mId === 'bpschj') {
    return <PNbpschj data={props.data} fullData={props.fullData} />;
  } else if (mId === 'bpEvaluate') {
    return <PNbpEvaluate data={props.data} fullData={props.fullData} />;
  }
  return <View />;
};

export default function ProductScreen(props: any) {
  const routeParams = props.route.params;
  // const shopId = routeParams['shopId'] ?? '';
  // const wareId = routeParams['wareId'] ?? '';
  const shopId = '1000000127';
  const wareId = '44096580396';

  const [wareBusiness, setWareBusiness] = useState({});
  const [dataModel, setDataModel] = useState<CommonDataModelType1>({
    viewState: ViewState.default,
    data: [],
  });

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    console.log('ProductScreen:first', props.route.params);
    setTimeout(() => {
      fetchWareBusiness();
    }, 600);
  }, []);
  useEffect(() => {
    return () => {
      console.log('ProductScreen组件卸载');
    };
  }, []);

  /********************* 网络请求 **************************/
  const fetchWareBusiness = () => {
    dataModel.viewState = ViewState.loading;
    setDataModel({...dataModel});

    productService
      .fetchWareBusiness(shopId, wareId)
      .then((response: any) => {
        setWareBusiness(response);
        const list = response.floors;
        dataModel.data = list;
        dataModel.viewState = ViewState.success;
        setDataModel({...dataModel});
      })
      .catch((error: any) => {
        console.log('catch - error', error);
        dataModel.viewState = ViewState.error;
        setDataModel({...dataModel});
      })
      .finally(() => {});
  };

  const _onEndReached = () => {};

  const _renderListView = () => {
    return (
      <FlatList
        style={{flex: 1}}
        data={dataModel.data}
        initialNumToRender={dataModel.data.length}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.01}
        renderItem={({item, index}) => {
          const {sortId, mId} = item;
          return <CardItem key={index} data={item} fullData={wareBusiness} />;
        }}
      />
    );
  };

  return (
    <CommonStateView
      viewState={dataModel.viewState}
      onPress={state => {
        if (state === ViewState.error) {
          fetchWareBusiness();
        }
      }}>
      {_renderListView()}
    </CommonStateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
