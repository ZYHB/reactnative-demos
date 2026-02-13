import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import FaIcon from './fa-icon';
import {RNFSUtil} from '~/utils';
const DEVICE_WIDTH = Dimensions.get('window').width;

interface Props {
  level: number;
  item: RNFS.ReadDirItem;
}

export default function FaDirItem({level, item}: Props) {
  const [result, setResult] = useState<RNFS.ReadDirItem[]>([]);
  const [fetching, setFetching] = useState(false);
  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {}, []);

  const handleClickDir = () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    RNFSUtil.readDir(item.path)
      .then(async result => {
        setFetching(false);
        setResult(result);
      })
      .catch(err => {
        setFetching(false);
        console.log(err.message, err.code);
      });
  };

  const renderItem = () => {
    if (item.isFile()) {
      return (
        <View style={[styles.file]}>
          <FaIcon file={item} />
          <Text style={{color: '#333'}}>
            {item.name}{' '}
            <Text style={{color: '#999'}}>
              size：{RNFSUtil.getSizeFormByte(item.size)}
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
                <Text>：{RNFSUtil.getSizeFormByte(item.size)}</Text>
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            {result.map((item, index) => {
              return (
                <View key={item.path}>
                  <FaDirItem item={item} level={level + 1} />
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
