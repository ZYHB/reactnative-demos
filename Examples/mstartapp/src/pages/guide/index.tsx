import {StyleSheet, View, ScrollView, Dimensions, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import Lottie from 'lottie-react-native';
import {router, RouteNames} from '~/navigator/NavigationService';
import {CommonAsyncStorage} from '~/utils';

const DEVICE_WIDTH = Dimensions.get('window').width;
//引导页
export default function GuideScreen() {
  const arr = Array.from({length: 4}, (v, k) => k + 'eee');
  const [datas, setDatas] = useState([
    require('~/assets/animation/129327-boy-and-girl-playing-soccer'),
    require('~/assets/animation/129328-sport-fans-watching-match-on-tv'),
    require('~/assets/animation/129360-soccer-player-passing-on-the-ball'),
    require('~/assets/animation/129361-soccer-player-ball-receive-on-body'),
  ]);
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    CommonAsyncStorage.storeData('guide_show_key', '1');
  }, []);

  const enterAppButtonPressed = () => {
    router.reset(RouteNames.Bottomtabs);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} pagingEnabled={true} style={{flex: 1}}>
        {datas.map((item, index) => {
          const isLast = index === datas.length - 1;
          return (
            <View key={index} style={{width: DEVICE_WIDTH}}>
              <Lottie
                source={item}
                autoPlay={true}
                loop={true}
                style={{flex: 1}}
              />
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {isLast ? (
                  <Button title="立即开启" onPress={enterAppButtonPressed} />
                ) : undefined}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
