import {Text, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '~/theme';
import RealTplN001 from './components/N001';
import RealTplN004 from './components/N004';
import RealTplM101 from './components/M101';
import RealTpl06042 from './components/06042';
import RealTpl10004 from './components/10004';

export default function TypeHybrid(props) {
  const {theme} = useContext(ThemeContext);
  const container_theme = {backgroundColor: theme.colors.page_bg};
  const card_theme = {backgroundColor: theme.colors.view_bg};
  const title_theme = {color: theme.colors.app_bar_text_color};
  const {content} = props.data;
  const {subFloorNum, subFloors} = content;
  return (
    <View style={{flexDirection: 'column'}}>
      {subFloors.map((item, index) => {
        const {realTpl} = item;
        if (realTpl === 'N001') {
          return <RealTplN001 key={index} data={item} />;
        } else if (realTpl === 'N004') {
          return <RealTplN004 key={index} data={item} />;
        } else if (realTpl === 'M101') {
          return <RealTplM101 key={index} data={item} />;
        } else if (realTpl === '06042') {
          return <RealTpl06042 key={index} data={item} />;
        } else if (realTpl === '10004') {
          return <RealTpl10004 key={index} data={item} />;
        }
        return (
          <View key={index}>
            <Text>{index}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
