import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';

import {ProductUtils} from '../../../../utils/ProductUtils';

export default function PNbpActivity(props: any) {
  const [data, setData] = useState<any>({});
  const [showTagFlag, setShowTagFlag] = useState(false);
  const [layoutInfoMap, setLayoutInfoMap] = useState<any>({}); //所有标签的Layout信息

  /********************* Effect Hook **************************/
  useEffect(() => {
    const floorData = ProductUtils.getFloorDataByMid(
      props.fullData,
      'bpActivity',
    );
    const data = floorData.data ?? {};
    setData(data);
    setTimeout(() => {
      getImagesSize(data.actions?.bizActs ?? []);
    }, 1000);
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpActivity:组件卸载');
    };
  }, []);
  useEffect(() => {
    const dataLength = data.actions?.bizActs?.length ?? 0;
    const layoutsLength = Object.keys(layoutInfoMap).length;
    if (dataLength > 0 && layoutsLength === dataLength && !showTagFlag) {
      setShowTagFlag(true);
    }
  }, [layoutInfoMap]);

  /********************* Utils **************************/
  const getImagesSize = async (bizActs: any) => {
    const models = bizActs ?? [];
    for (let index = 0; index < models.length; index++) {
      const element = models[index];
      const url = element.icon;

      Image.getSize(
        url,
        (width, height) => {
          let newMap = layoutInfoMap;
          newMap[url] = {width, height};
          setLayoutInfoMap({...newMap});
        },
        error => {
          console.log('failure', error);
        },
      );
    }
  };

  /********************* 点击事件 **************************/

  /********************* Render **************************/
  const imgForAddr = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CommonFastImage
          style={[styles.imgForAddr]}
          source={{uri: data.actions?.bigSale?.icon ?? ''}}
        />
        <Text style={{flex: 1, fontSize: 12}} numberOfLines={1}>
          {data.actions?.bigSale?.desc ?? ''}
        </Text>
      </View>
    );
  };
  const tagsView = () => {
    return (
      <View style={styles.tagsView}>
        {Object.keys(layoutInfoMap).map((item: any, index: number) => {
          const layout = layoutInfoMap[item];
          if (!layout.width || !layout.height) {
            return <View key={index} />;
          }
          let aspectRatio = layout.width / layout.height;
          return (
            <CommonFastImage
              key={index}
              style={{
                height: 13,
                aspectRatio: aspectRatio,
                marginRight: 5,
              }}
              source={{uri: item ?? ''}}
            />
          );
        })}
      </View>
    );
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.contentView]}>
        <Text>活动</Text>
        <View style={{flex: 1, marginLeft: 4, alignItems: 'center'}}>
          {imgForAddr()}
          {showTagFlag ? tagsView() : undefined}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  imgForAddr: {
    height: 12,
    aspectRatio: 150 / 36,
    marginRight: 5,
  },
  tagsView: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
});
