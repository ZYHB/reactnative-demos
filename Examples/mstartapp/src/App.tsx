/* eslint-disable react/react-in-jsx-scope */
import {Platform, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from '~/navigator';
import CommonDialog from '~/components/common-dialog';
import {ThemeContextProvider} from '~/theme';
import {globalShare, globalToast} from '~/utils';

import {simpleUpdate} from 'react-native-update';
import _updateConfig from '../update.json';
const {appKey} = _updateConfig[Platform.OS as keyof typeof _updateConfig];

function App() {
  return (
    <ThemeContextProvider>
      <SafeAreaProvider>
        <Navigator />
        <CommonDialog ref={ref => (globalShare.windowDialogRef = ref)} />
        <CommonDialog ref={ref => (globalToast.toastRef = ref)} />
      </SafeAreaProvider>
    </ThemeContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// 对根组件使用simpleUpdate方法封装后导出
// export default simpleUpdate(App, {appKey});
export default App;
