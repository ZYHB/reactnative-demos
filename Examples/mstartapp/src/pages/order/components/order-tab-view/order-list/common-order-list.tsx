import React, {useState, useEffect} from 'react';
import {StyleSheet, RefreshControl, FlatList} from 'react-native';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import CommonFooter, {FooterState} from '~/components/common-footer';
import {CommonDataModelType} from '~/common/common-model-type';
import {commonService} from '~/api/common-service';
import OrderItem from './order-item';

const CommonOrderList = (props: any) => {
  const [dataModel, setDataModel] = useState<CommonDataModelType>({
    loadingFirst: false,
    loadingNext: false,
    loadFlag: false,
    viewState: ViewState.default,
    footerState: FooterState.default,
    data: [],
    page: 1,
    pageSize: 15,
  });
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    fetchData(1);
  }, []);
  useEffect(() => {
    return () => {
      console.log('CommonOrderList：组件卸载');
    };
  }, []);
  /********************* 网络请求 **************************/
  const fetchData = (page: number) => {
    if (page === 1) {
      if (dataModel.data.length > 0) {
        dataModel.loadingFirst = true;
        setDataModel({...dataModel});
      }
    } else {
      dataModel.loadingNext = true;
      setDataModel({...dataModel});
    }
    if (page === 1 && dataModel.data.length === 0) {
      dataModel.viewState = ViewState.loading;
      setDataModel({...dataModel});
    }

    commonService
      .fetchOrderList(props.data, page)
      .then((response: any) => {
        console.log('success - 拿到数据');
        const list = response.orderList;
        const hasNext = list.length === 0 ? false : true;
        dataModel.loadingFirst = false;
        dataModel.loadingNext = false;
        if (page === 1 && list.length === 0) {
          dataModel.viewState = ViewState.empty;
          setDataModel({...dataModel});
        } else {
          let newData;
          if (page === 1) {
            newData = list;
          } else {
            newData = [...dataModel.data, ...list];
          }
          dataModel.page = page;
          dataModel.data = newData;
          dataModel.footerState = hasNext
            ? FooterState.loading
            : FooterState.noMore;
          dataModel.viewState = ViewState.success;
          setDataModel({...dataModel});
        }
      })
      .catch((error: any) => {
        console.log('catch - error', error);
        dataModel.loadingFirst = false;
        dataModel.loadingNext = false;
        if (page === 1) {
          dataModel.viewState = ViewState.error;
        } else {
          dataModel.footerState = FooterState.error;
        }
        setDataModel({...dataModel});
      })
      .finally(() => {});
  };

  const _onEndReached = () => {
    if (!dataModel.loadFlag) {
      return;
    }
    if (dataModel.loadingFirst || dataModel.loadingNext) {
      return;
    }
    if (dataModel.footerState === FooterState.noMore) {
      return;
    }
    dataModel.loadFlag = false;
    setDataModel({...dataModel});
    fetchData(dataModel.page + 1);
  };

  const _renderListView = () => {
    return (
      <FlatList
        style={{flex: 1, paddingTop: 5}}
        data={dataModel.data}
        ListFooterComponent={
          <CommonFooter footerState={dataModel.footerState} />
        }
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.01}
        onScrollBeginDrag={() => {
          dataModel.loadFlag = true;
          setDataModel({...dataModel});
        }}
        refreshControl={
          <RefreshControl
            refreshing={dataModel.loadingFirst}
            onRefresh={() => {
              if (
                dataModel.loadingFirst === true ||
                dataModel.loadingNext === true
              ) {
                return;
              }
              fetchData(1);
            }}
          />
        }
        renderItem={({item, index}) => {
          const {orderId} = item;
          return <OrderItem key={orderId} data={item} />;
        }}
      />
    );
  };

  return (
    <CommonStateView
      viewState={dataModel.viewState}
      onPress={state => {
        if (state === ViewState.error) {
          fetchData(1);
        }
      }}>
      {_renderListView()}
    </CommonStateView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#EEEEEE',
  },
  ItemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: '#eeeeee',
  },
  NoListView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  NoListText: {
    marginTop: 15,
    fontSize: 18,
    color: '#999999',
  },
  NoListImage: {
    width: 130,
    height: 140,
  },
});

export default CommonOrderList;
