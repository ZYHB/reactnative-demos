import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonStateView, {ViewState} from '~/components/common-view-state';
export default class AddressManagerScreen extends Component {
  constructor(props: any) {
    super(props);
    console.log('AddressManagerScreen - props', props);
  }

  componentDidMount() {
    setTimeout(() => {}, 1000);
  }

  render() {
    return (
      <CommonScreen appbar={{title: '地址管理'}}>
        <CommonSafeArea />
        <CommonStateView viewState={ViewState.empty} />
      </CommonScreen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridView: {
    flex: 1,
  },
});
