import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {router, RouteNames} from '~/navigator/NavigationService';
import Lottie from 'lottie-react-native';
import {CommonAsyncStorage, extraUtil} from '~/utils';
//4677-valiu-splashscreen-loader
export default function SplashScreen() {
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);

  const needShowGuide = async () => {
    const jsonValue = await CommonAsyncStorage.getData('guide_show_key');
    console.log('needShowGuide:', jsonValue);
    if (!extraUtil.isNullStr(jsonValue)) {
      console.log('needShowGuide111:', typeof jsonValue);
      if (jsonValue === '1') {
        console.log('needShowGuide222:', jsonValue);
        return false;
      }
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <Lottie
        source={require('~/assets/animation/4677-valiu-splashscreen-loader')}
        autoPlay={true}
        loop={false}
        style={{flex: 1}}
        onAnimationFinish={async isCancelled => {
          if (!isCancelled) {
            if (await needShowGuide()) {
              console.log('first-Guide');
              router.reset(RouteNames.Guide);
            } else {
              console.log('first-Bottomtabs');
              router.reset(RouteNames.Bottomtabs);
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
