import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Animated, Easing} from 'react-native';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import CommonStateView, {ViewState} from '~/components/common-view-state';
import {homeService} from '~/api/home-service';

import MainFlatList from './main-flat-list';
import ScenesController from './scenes';

const DEVICE_WIDTH = Dimensions.get('window').width;
const SEGEMENT_HEIGHT = 40;
export default class ShouyeScreen extends Component {
  insets = null;
  navigationBarHeight = 0;
  segementHeight = 40;
  sceneViewHeight = 0;

  constructor(props) {
    super(props);
    this.state = {
      viewState: ViewState.default,
      welcomeHome: {},
      initialIndex: -1,
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this._refresh();
  }

  _refresh = () => {
    this.setState({viewState: ViewState.loading});
    homeService
      .fetchWelcomeHome()
      .then(response => {
        console.log('success');
        const initialIndex = 0;
        this.setState({
          welcomeHome: {...response},
          initialIndex: initialIndex,
          fadeAnim: new Animated.Value(initialIndex === 0 ? DEVICE_WIDTH : 0),
        });
        this.setState({viewState: ViewState.success});
      })
      .catch(error => {
        this.setState({viewState: ViewState.error});
        console.log('error', error);
      });
  };

  fadeIn = index => {
    Animated.timing(this.state.fadeAnim, {
      toValue: index === 0 ? DEVICE_WIDTH : 0,
      duration: 0,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  };

  renderPageView = () => {
    const {fadeAnim, welcomeHome, initialIndex} = this.state;
    return (
      <SafeAreaInsetsContext.Consumer>
        {insets => {
          const top = Math.max(insets.top, 22) + 44 + SEGEMENT_HEIGHT;
          return (
            <Animated.View style={[styles.scenes, {top: top, left: fadeAnim}]}>
              <ScenesController
                ref={ref => (this.scenesCtlRef = ref)}
                data={welcomeHome}
                initialIndex={initialIndex}
              />
            </Animated.View>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  };

  _renderView = () => {
    const {welcomeHome, initialIndex} = this.state;
    return (
      <View>
        <MainFlatList
          welcomeHome={welcomeHome}
          initialIndex={initialIndex}
          onChange={index => {
            this.scenesCtlRef.setPage(index);
            this.fadeIn(index);
          }}
        />
        {this.renderPageView()}
      </View>
    );
  };

  render() {
    const {viewState} = this.state;
    return (
      <CommonStateView
        viewState={viewState}
        onPress={state => {
          if (state === ViewState.error) {
            this._refresh();
          }
        }}>
        {viewState === ViewState.success ? this._renderView() : undefined}
      </CommonStateView>
    );
  }
}

const styles = StyleSheet.create({
  scenes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
