import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonStateView, {ViewState} from '~/components/common-view-state';
export default class ShopcartScreen extends Component {
  constructor(props) {
    super(props);
    const arr = Array.from({length: 100}, (v, k) => k + 'eee');

    this.state = {
      routeInfo: props.route,
      datas: arr,
    };

    console.log('ShopcartScreen - props', props);
  }

  componentDidMount() {
    setTimeout(() => {}, 1000);
  }

  render() {
    return (
      <CommonScreen appbar={{title: '购物车', showBack: false}}>
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
