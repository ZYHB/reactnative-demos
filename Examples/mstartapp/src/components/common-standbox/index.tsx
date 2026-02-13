import {StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {RNFSUtil} from '~/utils';
import FaDirItem from './fa-dir';
export default function CommonStandBoxScreen() {
  const [result, setResult] = useState([]);
  /********************* Effect Hook **************************/
  useEffect(() => {
    getTotalFolder();
  }, []);

  const getTotalFolder = async () => {
    var dirResults = await RNFSUtil.getAppFolders();
    setResult(dirResults);
  };

  return (
    <ScrollView style={[styles.container]}>
      {result.map((item: any, index) => {
        return (
          <ScrollView key={item.path} horizontal={true}>
            <FaDirItem item={item} level={0} />
          </ScrollView>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
