import {
  StyleSheet,
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonCell from '~/components/common-cell';
import CommonAlert from '~/components/common-alert';
import CommonDialog from '~/components/common-dialog';
import CommonStandBoxScreen from '~/components/common-standbox';
import {
  DeviceStorage,
  extraUtil,
  RNFSUtil,
  copyUtil,
  globalShare,
  globalToast,
} from '~/utils';
import {dataSource} from './default-data';
import {router} from '~/navigator/NavigationService';

export default function GeneralScreen() {
  const [sections, setSections] = useState(copyUtil.deepCopy(dataSource));
  const [totalSize, setTotalSize] = useState(0);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    getCacheSize();
    console.log('useEffect', JSON.stringify(sections));
  }, []);

  const getCacheSize = async () => {
    const size = await RNFSUtil.getCacheSize();
    console.log('GOT RESULT', size);
    setTotalSize(size);
  };

  const onPress = (item: any) => {
    const {title, route} = item;
    if (title === '清除本地缓存') {
      globalShare.windowDialogRef?.showWithContent(
        CommonDialog.popupMode.center,
        () => globalShare.windowDialogRef?.hide(),
        () => {
          return (
            <CommonAlert
              title="提示"
              message="确认删除缓存吗？"
              actionNames={['确认', '取消']}
              onPress={(index: number) => {
                globalShare.windowDialogRef?.hide();
                if (index === 0) {
                  DeviceStorage.clear();
                  globalToast.showToast('已删除数据');
                }
              }}
            />
          );
        },
      );
      return;
    } else if (title === '查看沙盒') {
      globalShare.windowDialogRef?.showWithContent(
        CommonDialog.popupMode.bottomToTop,
        () => globalShare.windowDialogRef?.hide(),
        () => {
          return (
            <View style={{height: Dimensions.get('window').height * 0.7}}>
              <CommonStandBoxScreen />
            </View>
          );
        },
      );
    }
    if (extraUtil.isNullStr(route)) {
      return;
    }
    router.push(route);
  };

  const _renderSECTION = (sectionIndex: number) => {
    const section = sections[sectionIndex];
    let radius: StyleProp<ViewStyle> = {borderRadius: 15};
    if (section.data.length === 0) {
      radius = {};
    } else if (sectionIndex === 0) {
      radius = {borderBottomLeftRadius: 15, borderBottomRightRadius: 15};
    }
    return (
      <View key={sectionIndex}>
        <View style={[styles.fbSectionCard, radius]}>
          {section.data.map((item: any, index: number) => {
            const {title, subtitle, badge, cellType, switchValue} = item;
            let subtitle_ = subtitle;
            if (title === '清除本地缓存') {
              subtitle_ = RNFSUtil.getSizeFormByte(totalSize);
            }
            return (
              <CommonCell
                key={title}
                title={title}
                subtitle={subtitle_}
                switchValue={switchValue}
                showRedDot={!extraUtil.isEmptyObj(badge)}
                cellType={cellType}
                style={[styles.fbfCellItem]}
                onPress={() => onPress(item)}
                onValueChange={value => {
                  for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    for (let j = 0; j < section.data.length; j++) {
                      let element = section.data[j];
                      if (element.title === title) {
                        element.switchValue = value;
                      }
                    }
                  }
                  setSections([...sections]);
                }}
              />
            );
          })}
        </View>
        <View style={{height: 10}} />
      </View>
    );
  };

  return (
    <CommonScreen appbar={{title: '设置'}}>
      <ScrollView style={{backgroundColor: '#EEE'}}>
        <CommonSafeArea />
        <View>
          {sections.map((item: any, index: number) => {
            return _renderSECTION(index);
          })}
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
  fbSectionCard: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  fbfCellItem: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 0.5,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  logout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
});
