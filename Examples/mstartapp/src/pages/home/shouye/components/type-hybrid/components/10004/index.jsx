import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyles} from '~/common/commonStyles';
import CommonFastImage from '~/components/common-fast-image';

export default function RealTpl10004(props) {
  const {tpl, realTpl, data} = props.data;
  const [tabList, setTabList] = React.useState([]);
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  React.useEffect(() => {
    if (data instanceof Array && data.length > 0) {
      const groupInfoList = data[0].groupInfoList;
      if (groupInfoList instanceof Array && groupInfoList.length > 0) {
        const item = groupInfoList[0];
        console.log('first---', item);
        setTabList(item.flexData?.tabList ?? []);
      }
    }
  }, []);

  return (
    <View style={[commonStyles.container]}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {tabList.map((item, index) => {
          const {skuImg, trendInfo} = item;
          return (
            <View key={index} style={[styles.tag]}>
              <CommonFastImage
                source={{uri: skuImg}}
                style={{width: 20, aspectRatio: 1}}
              />
              <Text>{trendInfo}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});
