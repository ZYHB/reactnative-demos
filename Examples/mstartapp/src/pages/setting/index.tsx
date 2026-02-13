import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {ThemeContext} from '~/theme';
import CommonScreen from '~/components/common-screen';
import CommonSafeArea from '~/components/common-safe-area';
import CommonCell from '~/components/common-cell';
import {extraUtil, copyUtil} from '~/utils';
import {dataSource} from './default-data';
import SettingUserInfoView from './components/userInfo';
import {router} from '~/navigator/NavigationService';

export default function SettingScreen() {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.view_bg};
  const title_theme = {color: theme.colors.app_bar_text_color};
  const [sections, setSections] = useState(copyUtil.deepCopy(dataSource));

  const onPress = (item: any) => {
    const {route} = item;
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
            const {title, subtitle, badge, type} = item;
            if (type === 'userInfo') {
              return <SettingUserInfoView key={title} />;
            } else if (type === 'logout') {
              return (
                <View key={title} style={[styles.logout, container_theme]}>
                  <Text style={[title_theme]}>{title}</Text>
                </View>
              );
            }
            return (
              <CommonCell
                key={title}
                title={title}
                subtitle={subtitle}
                showRedDot={!extraUtil.isEmptyObj(badge)}
                cellType={type}
                style={[styles.fbfCellItem]}
                onPress={() => onPress(item)}
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
