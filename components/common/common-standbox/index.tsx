import { FileItem, RNFSUtil } from '@/utils/RNFSUtil';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FaDirItem from './fa-dir';

export default function CommonStandBoxScreen() {
  const [result, setResult] = useState<FileItem[]>([]);

  /********************* Effect Hook **************************/
  useEffect(() => {
    getTotalFolder();
  }, []);

  const getTotalFolder = async () => {
    const dirResults = await RNFSUtil.getAppFolders();
    setResult(dirResults);
  };

  return (
    <ScrollView style={[styles.container]}>
      {result.map((item) => {
        return (
          <ScrollView key={item.path || item.uri} horizontal={true}>
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
