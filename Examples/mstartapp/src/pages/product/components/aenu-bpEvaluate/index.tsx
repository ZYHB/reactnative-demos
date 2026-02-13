import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonFastImage from '~/components/common-fast-image';
import {ProductUtils} from '../../utils/ProductUtils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {productService} from '~/api/product-service';

export default function PNbpEvaluate(props: any) {
  const [data, setData] = useState<any>({});
  const [selectIndex, setSelectIndex] = useState(0);
  let tagListRef: FlatList<any> | null;
  const arr = Array.from({length: 100}, (v, k) => k + 'eee');
  const tags = [
    '特惠',
    '婴童纸尿裤',
    '早教启智',
    '奶瓶奶嘴',
    '牙胶',
    '牙胶1',
    '牙胶2',
    '牙胶3',
  ];
  /********************* Effect Hook **************************/
  useEffect(() => {
    fetchWareBusiness();
  }, []);
  useEffect(() => {
    return () => {
      console.log('PNbpschj:组件卸载');
    };
  }, []);

  /********************* 网络请求 **************************/
  const fetchWareBusiness = () => {
    const floorData = ProductUtils.getbpMasterdata(props.fullData);
    const generalTrackDic = floorData.data?.generalTrackDic ?? {};
    console.log('generalTrackDic', generalTrackDic);
    productService
      .fetchLegoWareDetailComment(generalTrackDic.shopId, generalTrackDic.skuId)
      .then((response: any) => {
        setData(response);
      })
      .catch((error: any) => {
        console.log('catch - error', error);
      })
      .finally(() => {});
  };

  /********************* 点击事件 **************************/

  /********************* Render **************************/
  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: '#333', fontSize: 15, fontWeight: 'bold'}}>
          {data.commentTitle ?? ''}
          <Text style={{color: '#666', fontSize: 11}}>
            {data.allCntStr ?? ''}
          </Text>
        </Text>
        <Text style={{color: '#666', fontSize: 11}}>{data.goodRate ?? ''}</Text>
      </View>
    );
  };
  const renderTagsView = () => {
    return (
      <FlatList
        ref={element => (tagListRef = element)}
        data={data.semanticTagList ?? []}
        style={{marginTop: 5}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const style =
            selectIndex === index ? styles.tagActive : styles.tagInActive;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectIndex(index);
                console.log('first-tagListRef', tagListRef);
                //viewPosition参数：0表示顶部，0.5表示中部，1表示底部
                tagListRef?.scrollToIndex({
                  index: index,
                  viewPosition: 0.5,
                });
              }}>
              <Text style={[style]}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const renderCommentInfoListView = () => {
    return (
      <View>
        {(data.commentInfoList ?? []).map((item: any, index: number) => {
          return (
            <View key={item.commentId} style={{paddingVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <CommonFastImage
                  source={{uri: item.userImgURL}}
                  style={{height: 30, aspectRatio: 1}}
                />
                <View>
                  <Text>{item.userNickName ?? ''}</Text>
                  <Text>{item.commentScore ?? ''}星</Text>
                </View>
              </View>
              <Text>{item.commentData ?? ''}</Text>
              <FlatList
                data={item.pictureInfoList ?? []}
                style={{marginTop: 5}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity key={index}>
                      <CommonFastImage
                        source={{uri: item.picURL}}
                        style={{height: 100, aspectRatio: 1, marginRight: 10}}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.contentView]}>
        {renderHeader()}
        {renderTagsView()}
        {renderCommentInfoListView()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  contentView: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 2,
  },
  tagActive: {
    backgroundColor: 'rgba(255,0,0,0.1)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    borderRadius: 15,
    overflow: 'hidden',
    color: 'red',
  },
  tagInActive: {
    backgroundColor: '#EEE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    borderRadius: 15,
    overflow: 'hidden',
    color: 'black',
  },
  productView: {
    marginRight: 4,
    padding: 5,
    borderColor: '#EEE',
    borderWidth: 1,
  },
  productView_img: {
    width: 100,
    aspectRatio: 1,
    backgroundColor: '#EEE',
  },
  productView_name: {
    paddingVertical: 2,
  },
});
