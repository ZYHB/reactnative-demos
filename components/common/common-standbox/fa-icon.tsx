import React from 'react';
import CommonVectorIcon from '../common-vector-icons';
import { FileItem } from '@/utils/RNFSUtil';

interface Props {
  file: FileItem;
}

export default function FaIcon({file}: Props) {
  if (file.isDirectory) {
    return <CommonVectorIcon name="folder" />;
  } else {
    //file-image
    //file-music
    //file-audio
    //file-csv
    return <CommonVectorIcon name="text" />;
  }
}

