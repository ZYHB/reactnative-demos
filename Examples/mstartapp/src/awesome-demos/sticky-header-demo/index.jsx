import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Animated,
  StyleSheet,
  FlatList,
} from 'react-native';
import CommonCell from '~/components/common-cell';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';

// You can import from local files
import DynamicHeader from './components/DynamicHeader';
import {DATA} from './data';
import TestPage9 from './testpage';
import MemberAnalysis from './testpage2';
import TestPage3 from './testpage3';
export default function App() {
  let scrollOffsetY = useRef(new Animated.Value(0)).current;
  return <TestPage3></TestPage3>;
  // return <TestPage9></TestPage9>;
  // return <MemberAnalysis></MemberAnalysis>;
  // return (
  //   <View style={{flex: 1}}>
  //     <FlatList
  //       data={DATA}
  //       scrollEventThrottle={16}
  //       onScroll={Animated.event([
  //         {nativeEvent: {contentOffset: {y: scrollOffsetY}}},
  //       ])}
  //       renderItem={({item, index}) => {
  //         return (
  //           <Text style={styles.scrollText} key={item.id}>
  //             {item.title}
  //           </Text>
  //         );
  //       }}
  //     />
  //   </View>
  // );

  // return (
  //   <CommonScreen appbar={{title: 'sticky-header-demo'}}>
  //     <CommonSafeArea></CommonSafeArea>
  //     <DynamicHeader animHeaderValue={scrollOffsetY} />
  //     <FlatList
  //       data={DATA}
  //       scrollEventThrottle={16}
  //       onScroll={Animated.event(
  //         [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
  //         {useNativeDriver: true},
  //       )}
  //       renderItem={({item, index}) => {
  //         return (
  //           <Text style={styles.scrollText} key={item.id}>
  //             {item.title}
  //           </Text>
  //         );
  //       }}
  //     />
  //     {/* <ScrollView
  //       scrollEventThrottle={16}
  //       onScroll={Animated.event(
  //         [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
  //         {useNativeDriver: false},
  //       )}>
  //       {DATA.map((book, index) => {
  //         return (
  //           <Text style={styles.scrollText} key={book.id}>
  //             {book.title}
  //           </Text>
  //         );
  //       })}
  //     </ScrollView> */}
  //   </CommonScreen>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    margin: 0,
  },
  scrollText: {
    fontSize: 19,
    textAlign: 'center',
    padding: 20,
    color: '#000',
  },
});
