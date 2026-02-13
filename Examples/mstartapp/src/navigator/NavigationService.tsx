import {createNavigationContainerRef} from '@react-navigation/native';
import {StackActions, CommonActions} from '@react-navigation/native';
import RouteNames from './route-names'; // the variable name is arbitrary since it's exported as default

export {RouteNames};

export const navigationRef = createNavigationContainerRef();

export class Router {
  /**
   * 跳转到某个页面
   * @param name  页面name
   * @param params  可选,参数携带
   */
  push = (name: string, params?: object) => {
    console.log(`[push]: name=${name} params=${JSON.stringify(params)}`);
    if (navigationRef.isReady()) {
      const action = StackActions.push(name, params);
      navigationRef.dispatch(action);
    }
  };

  pop = (count?: number) => {
    console.log(`[pop]: count=${count}`);
    if (navigationRef.isReady()) {
      const action = StackActions.pop(count);
      navigationRef.dispatch(action);
    }
  };

  canGoBack = () => {
    return navigationRef.canGoBack();
  };

  /**
   * 替换页面
   * @param name  页面name
   * @param params  可选,参数携带
   */
  replace(name: string, params?: object | undefined) {
    console.log(`[replace]: name=${name} params=${JSON.stringify(params)}`);
    if (navigationRef.isReady()) {
      const action = StackActions.replace(name, params);
      navigationRef.dispatch(action);
    }
  }

  /**
   * 重置路由
   * @param {*} name
   */
  reset(name: string) {
    console.log(`[reset]: name=${name}`);
    const action = CommonActions.reset({
      index: 0,
      routes: [{name: name, params: {user: 'jane'}}],
    });
    navigationRef.dispatch(action);
  }
}

export let router = new Router();
