import {StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonVectorIcon from '~/components/common-vector-icons';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonDialog from '~/components/common-dialog';
import {globalShare} from '~/utils';
import OrderFilterView from './components/filter';
import OrderTabView from './components/order-tab-view';

const MyOrdersScreen = (props: any) => {
  console.log('MyOrdersScreen : props', props);
  const [ready, setReady] = useState(false);

  let dialogRef: CommonDialog | null;

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  const handleFilterEvent = () => {
    showRightToLeft();
  };

  const showRightToLeft = () => {
    globalShare.windowDialogRef?.showWithContent(
      CommonDialog.popupMode.rightToLeft,
      () => globalShare.windowDialogRef?.hide(),
      () => {
        return <OrderFilterView />;
      },
    );
  };

  const _renderFilterBtn = () => {
    return <CommonVectorIcon name="sort" onPress={handleFilterEvent} />;
  };

  return (
    <>
      <CommonScreen
        appbar={{
          title: '订单',
          rightItem: _renderFilterBtn(),
        }}>
        <CommonSafeArea />
        {ready ? (
          <OrderTabView initialIndex={props.route.params?.index ?? 0} />
        ) : undefined}
      </CommonScreen>
      <CommonDialog ref={ref => (dialogRef = ref)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyOrdersScreen;
