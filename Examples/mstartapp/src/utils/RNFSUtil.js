import RNFS from 'react-native-fs';
import {JMGL_PATH} from '~/common/common-const';

const RNFSUtil = {
  // //获取沙盒路径
  // getDirectoryPaths: () => {
  //     var str = RNFS.DocumentDirectoryPath;
  //     var arr = str.split('/');
  //     const last = arr[arr.length - 1];
  //     str = str.replace(last, '');
  //     return str
  // },

  //获取沙盒路径
  getDirectoryPaths: () => {
    const paths = [RNFS.DocumentDirectoryPath, RNFS.CachesDirectoryPath];
    console.log('getDirectoryPaths:', paths);
    return paths;
  },
  getAppFolders: async () => {
    return new Promise(async function (resolve, reject) {
      var directoryPaths = [
        RNFS.DocumentDirectoryPath,
        RNFS.CachesDirectoryPath,
      ];
      // get a list of files and directories in the main bundle
      var dirResults = [];
      for (let index = 0; index < directoryPaths.length; index++) {
        const path = directoryPaths[index];
        var arr = path.split('/');
        const dirName = arr[arr.length - 1]; //文件夹名字

        const size = await RNFSUtil.getFolderSizeAtPath(path); //文件夹大小
        var result = await RNFS.stat(path);

        var dirItem = {
          ctime: new Date(result.ctime),
          mtime: new Date(result.mtime),
          name: result.name ?? dirName,
          path: result.path,
          size: size,
          isFile: result.isFile,
          isDirectory: result.isDirectory,
        };
        dirResults.push(dirItem);
      }
      resolve(dirResults);
    });
  },

  //获取文件夹size
  getFolderSizeAtPath: async path => {
    const exists = await RNFS.exists(path);
    if (exists === false) {
      return 0;
    }
    let folderSize = 0;
    const result = await RNFS.readDir(path);
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      if (element.isFile()) {
        folderSize += element.size;
      } else if (element.isDirectory()) {
        const size = await RNFSUtil.getFolderSizeAtPath(element.path);
        folderSize += size;
      } else {
        folderSize += element.size;
      }
    }
    return folderSize;
  },
  readDir: dirpath => {
    return new Promise(function (resolve, reject) {
      RNFS.readDir(dirpath)
        .then(async result => {
          console.log('GOT RESULT', result);
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            if (element.isDirectory()) {
              const size = await RNFSUtil.getFolderSizeAtPath(element.path);
              element.size = size;
            }
          }
          resolve(result);
        })
        .catch(err => {
          console.log(err.message, err.code);
          reject(err);
        });
    });
  },

  // 获取DocumentDirectory大小
  getDocumentDirectorySize: async () => {
    const size = await RNFSUtil.getFolderSizeAtPath(RNFS.DocumentDirectoryPath);
    return size;
  },
  // 获取缓存文件
  getCacheSize: async () => {
    const size = await RNFSUtil.getFolderSizeAtPath(JMGL_PATH);
    return size;
  },

  // 计算文件大小函数(保留两位小数), Size为字节大小
  getSizeFormByte: byte => {
    let size = '';
    if (byte < 0.1 * 1024) {
      // 小于0.1KB 则转化成B
      size = byte.toFixed(2) + 'B';
    } else if (byte < 0.1 * 1024 * 1024) {
      // 小于0.1MB 则转换成KB
      size = (byte / 1024).toFixed(2) + 'KB';
    } else if (byte < 0.1 * 1024 * 1024 * 1024) {
      // 小于0.1GB 则转换成MB
      size = (byte / (1024 * 1024)).toFixed(2) + 'MB';
    } else if (byte < 0.1 * 1024 * 1024 * 1024 * 1024) {
      // 小于0.1TB 则转换成GB
      size = (byte / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    } else if (byte < 0.1 * 1024 * 1024 * 1024 * 1024 * 1024) {
      // 小于0.1PB 则转换成TB
      size = (byte / (1024 * 1024 * 1024 * 1024)).toFixed(2) + 'TB';
    } else if (byte < 0.1 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
      // 小于0.1EB 则转换成PB
      size = (byte / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + 'PB';
    } else if (byte < 0.1 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
      // 小于0.1ZB 则转换成EB
      size =
        (byte / (1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + 'EB';
    } else if (
      byte <
      0.1 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024
    ) {
      // 小于0.1YB 则转换成ZB
      size =
        (byte / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) +
        'ZB';
    }
    return size;

    // if (!size) return '0K';

    // var num = 1024.0; //byte

    // if (size < num) return size + 'B';
    // if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'K'; //kb
    // if (size < Math.pow(num, 3))
    //   return (size / Math.pow(num, 2)).toFixed(2) + 'M'; //M
    // if (size < Math.pow(num, 4))
    //   return (size / Math.pow(num, 3)).toFixed(2) + 'G'; //G
    // return (size / Math.pow(num, 4)).toFixed(2) + 'T'; //T
  },
};

export {RNFSUtil};
