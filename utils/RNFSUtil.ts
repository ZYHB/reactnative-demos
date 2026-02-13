import { Directory, File, Paths } from 'expo-file-system';

export interface FileItem {
  uri: string;
  name?: string;
  path?: string;
  size?: number;
  isDirectory: boolean;
  exists?: boolean;
  // 兼容旧 API 的方法
  isFile?: () => boolean;
}

const RNFSUtil = {
  // 获取沙盒路径
  getDirectoryPaths: () => {
    const paths = [Paths.cache, Paths.document].filter(Boolean);
    console.log('getDirectoryPaths:', paths);
    return paths;
  },

  // 获取应用文件夹
  getAppFolders: async (): Promise<FileItem[]> => {
    const directoryPaths = [Paths.cache, Paths.document].filter(Boolean);
    const dirResults: FileItem[] = [];

    for (const directory of directoryPaths) {
      try {
        const dir = new Directory(directory);
        const info = await dir.info();

        const dirItem: FileItem = {
          uri: dir.uri,
          name: dir.name,
          path: dir.uri,
          size: info.size ?? undefined,
          isDirectory: true,
          exists: dir.exists,
        };
        dirResults.push(dirItem);
      } catch (error) {
        console.error(`Error reading ${directory}:`, error);
      }
    }

    return dirResults;
  },

  // 获取文件夹大小
  getFolderSizeAtPath: async (path: string): Promise<number> => {
    try {
      const directory = new Directory(path);

      if (!directory.exists) {
        return 0;
      }

      const info = await directory.info();
      if (!info.isDirectory) {
        // 如果是文件，直接返回大小
        return info.size ?? 0;
      }

      // 如果是目录，读取内容并递归计算
      const contents = await directory.listAsync();
      let folderSize = 0;

      for (const item of contents) {
        if (item instanceof Directory) {
          const size = await RNFSUtil.getFolderSizeAtPath(item.uri);
          folderSize += size;
        } else if (item instanceof File) {
          const fileInfo = await item.info();
          folderSize += fileInfo.size ?? 0;
        }
      }

      return folderSize;
    } catch (error) {
      console.error('Error calculating folder size:', error);
      return 0;
    }
  },

  // 读取目录
  readDir: async (dirpath: string): Promise<FileItem[]> => {
    try {
      const directory = new Directory(dirpath);
      const contents = await directory.listAsync();
      const fileItems: FileItem[] = [];

      for (const item of contents) {
        let size = 0;

        if (item instanceof Directory) {
          size = await RNFSUtil.getFolderSizeAtPath(item.uri);
        } else if (item instanceof File) {
          const fileInfo = await item.info();
          size = fileInfo.size ?? 0;
        }

        const fileItem: FileItem = {
          uri: item.uri,
          name: item.name,
          path: item.uri,
          size: size,
          isDirectory: item instanceof Directory,
          exists: item.exists,
          // 添加方法以保持兼容性
          isFile: () => item instanceof File,
        };

        fileItems.push(fileItem);
      }

      return fileItems;
    } catch (error) {
      console.error('Error reading directory:', error);
      throw error;
    }
  },

  // 获取文档目录大小
  getDocumentDirectorySize: async (): Promise<number> => {
    try {
      const directory = new Directory(Paths.document);
      return await RNFSUtil.getFolderSizeAtPath(directory.uri);
    } catch (error) {
      console.error('Error getting document directory size:', error);
      return 0;
    }
  },

  // 获取缓存大小
  getCacheSize: async (): Promise<number> => {
    try {
      const directory = new Directory(Paths.cache);
      return await RNFSUtil.getFolderSizeAtPath(directory.uri);
    } catch (error) {
      console.error('Error getting cache size:', error);
      return 0;
    }
  },

  // 格式化字节大小
  getSizeFormByte: (byte: number): string => {
    if (byte < 0) {
      return '0B';
    }

    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'];
    let size = byte;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)}${units[unitIndex]}`;
  },
};

export { RNFSUtil };
