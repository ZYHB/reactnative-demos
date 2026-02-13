import {StyleSheet} from 'react-native';
import React from 'react';
import CommonVectorIcon from '~/components/common-vector-icons';
import RNFS from 'react-native-fs';

interface Props {
  file: RNFS.ReadDirItem;
}

export default function FaIcon({file}: Props) {
  if (file.isDirectory()) {
    return <CommonVectorIcon name="folder" />;
  } else {
    //file-image
    //file-music
    //file-audio
    //file-csv
    return <CommonVectorIcon name="file" />;
  }
}

const styles = StyleSheet.create({});
