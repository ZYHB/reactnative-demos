import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonRichTextView from '~/components/common-rich-text-view';

export default function FeedBackScreen() {
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {}, []);

  /********************* render **************************/
  return (
    <CommonScreen appbar={{title: '意见反馈'}}>
      <ScrollView style={{backgroundColor: '#FFF'}}>
        <CommonSafeArea />
        <View style={{marginTop: 20}}>
          <Text style={[styles.title]}>问题描述</Text>
          <CommonRichTextView
            inputStyle={{borderColor: '#999', borderWidth: 1}}
            placeholder="请填写问题描述(1000字以内哦)"
            maxLength={1000} // 最大长度,默认为100
            showCount={true} // 展示剩余文字, 默认为true
            onChangeText={(text: string) => {
              // let desPrizes = CommonMethod.filteremoji(inputValue, 1); //表情过滤机制
              // this.setState({desPrizes: desPrizes});
            }}
          />
        </View>

        <CommonSafeArea type="bottom" />
      </ScrollView>
    </CommonScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: '#000',
    paddingLeft: 20,
    marginBottom: 10,
  },
});
