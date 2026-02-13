import { FileItem, RNFSUtil } from '@/utils/RNFSUtil';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FaIcon from './fa-icon';

const DEVICE_WIDTH = Dimensions.get('window').width;

interface Props {
  level: number;
  item: FileItem;
}

export default function FaDirItem({ level, item }: Props) {
  const [result, setResult] = useState<FileItem[]>([]);
  const [fetching, setFetching] = useState(false);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {}, []);

  const handleClickDir = () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    const itemPath = item.path || item.uri;
    RNFSUtil.readDir(itemPath)
      .then((res) => {
        setFetching(false);
        setResult(res);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err.message, err.code);
      });
  };

  const renderItem = () => {
    if (item.isFile && item.isFile()) {
      return (
        <View style={[styles.file]}>
          <FaIcon file={item} />
          <Text style={{color: '#333'}}>
            {item.name}{' '}
            <Text style={{color: '#999'}}>
              size：{RNFSUtil.getSizeFormByte(item.size || 0)}
            </Text>
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            style={styles.dirHeader}
            onPress={() => handleClickDir()}>
            {fetching ? <ActivityIndicator /> : undefined}
            <View style={styles.dirHeader}>
              <FaIcon file={item} />
              <Text style={[styles.name]}>
                {item.name}
                <Text>：{RNFSUtil.getSizeFormByte(item.size || 0)}</Text>
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            {result.map((subItem) => {
              return (
                <View key={subItem.path || subItem.uri}>
                  <FaDirItem item={subItem} level={level + 1} />
                </View>
              );
            })}
          </View>
        </View>
      );
    }
  };

  return <View style={[{paddingLeft: level * 15}]}>{renderItem()}</View>;
}

const styles = StyleSheet.create({
  dirHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
  },

  file: {
    maxWidth: DEVICE_WIDTH,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    // borderColor: 'green',
    // borderWidth: 1,
  },

  dirItem: {
    minHeight: 30,
    backgroundColor: 'rgba(255,255,0,1)',
    borderColor: 'red',
    borderWidth: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
