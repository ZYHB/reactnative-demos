import {BackHandler, Platform, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import CommonSafeArea from '~/components/common-safe-area';
import CommonScreen from '~/components/common-screen';
import {router} from '~/navigator/NavigationService';
import {globalToast} from '~/utils';
export default function WebScreen(props: any) {
  const [url, setUrl] = useState(props.route?.params?.url ?? '');
  const [enabledBack, setEnabledBack] = useState(true);
  const [progress, setProgress] = useState(0);
  let webViewRef: WebView | null;
  let clicked: boolean = false;
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    setTimeout(() => {}, 600);
    console.log('WebScreen-first', props);
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
    }
  }, []);
  useEffect(() => {
    return () => {
      console.log('WebScreen：组件卸载');
    };
  }, []);

  /********************* 网络请求 **************************/
  const handleBackPress = () => {
    if (enabledBack) {
      router.pop();
    } else {
      webViewRef?.goBack();
    }
  };

  const onBackAndroid = () => {
    console.log('backButtonEnabled:', enabledBack);
    if (!enabledBack) {
      webViewRef?.goBack();
      return true;
    } else {
      if (clicked) {
        //点过一次了。
        console.log('back');
        return false;
      }
      clicked = true;
      globalToast.showToast('再按一次退出应用');
      return true;
    }
  };

  /********************* render **************************/
  return (
    <CommonScreen appbar={{title: 'Web', handleBackPress: handleBackPress}}>
      <CommonSafeArea />
      <WebView
        ref={element => (webViewRef = element)}
        source={{uri: url}}
        style={{}}
        onLoadProgress={({nativeEvent}) => {
          setProgress(nativeEvent.progress);
        }}
        onNavigationStateChange={event => {
          setEnabledBack(!event.canGoBack);
        }}>
        {/* {progress !== 1 && (
          <ProgressView
            progressTintColor="blue"
            progress={progress}
            style={{height: 2}}
          />
        )} */}
      </WebView>
    </CommonScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
