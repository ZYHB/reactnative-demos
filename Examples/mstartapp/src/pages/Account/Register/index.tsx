import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonVectorIcon from '~/components/common-vector-icons';
import CommonSafeArea from '~/components/common-safe-area';
import CommonScreen from '~/components/common-screen';
import {router, RouteNames} from '~/navigator/NavigationService';
import {globalToast} from '~/utils';
import TextField from '../components/text-field';
import AppLogoView from '../components/app-logo';
export default function RegisterScreen() {
  const [dataModel, setDataModel] = useState({});
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [enableLogin, setEnableLogin] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  /********************* Effect Hook **************************/
  //类似类组件的componentDidMount
  useEffect(() => {
    setTimeout(() => {}, 600);
  }, []);
  useEffect(() => {
    return () => {
      console.log('RegisterScreen组件卸载');
    };
  }, []);
  useEffect(() => {
    console.log('account 或 password 发生变化');
    if (account.length && password.length) {
      setEnableLogin(true);
    } else {
      setEnableLogin(false);
    }
  }, [account, password]);

  /********************* 网络请求 **************************/

  /********************* render **************************/
  const closeBtn = () => {
    return <CommonVectorIcon name="times" onPress={() => router.pop()} />;
  };
  const helpBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          // router.push(RouteNames.Web, {url: 'https://www.baidu.com/'});
          router.push(RouteNames.FeedBack);
        }}>
        <Text style={{padding: 10}}>帮助</Text>
      </TouchableOpacity>
    );
  };

  return (
    <CommonScreen appbar={{title: '注册'}}>
      <CommonSafeArea />
      <ScrollView style={{backgroundColor: '#FFF', paddingHorizontal: 10}}>
        <AppLogoView />
        <TextField
          inputViewStyle={{marginTop: 80, height: 44, borderRadius: 22}}
          value={account}
          placeholder="账号名/邮箱/手机号"
          onChangeText={text => {
            setAccount(text);
          }}
        />
        <TextField
          inputViewStyle={{marginTop: 10, height: 44, borderRadius: 22}}
          value={password}
          placeholder="请输入密码"
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <PrivacyAgreementView
          agreePrivacy={agreePrivacy}
          onPress={(_: any) => {
            setAgreePrivacy(!agreePrivacy);
          }}
        />
        <LoginBtn enableLogin={enableLogin} agreePrivacy={agreePrivacy} />
        <MoreActionsInfoView />
      </ScrollView>
    </CommonScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 12,
    padding: 10,
  },
  loginBtn: {
    marginTop: 40,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const PrivacyAgreementView = (props: any) => {
  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
      }}>
      <CommonVectorIcon
        name={props.agreePrivacy === true ? 'check-square' : 'square'}
        size={13}
        onPress={props.onPress}
        style={{borderColor: 'red', borderWidth: 1}}
      />
      <Text style={{flex: 1}}>
        登录即代表您已同意登录登录即代表您已同意登录
        <Text
          style={{color: 'red'}}
          onPress={() => {
            router.push(RouteNames.Web, {url: 'https://www.baidu.com/'});
          }}>
          《隐私政策》
        </Text>
      </Text>
    </View>
  );
};

const LoginBtn = (props: any) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.loginBtn,
        {
          backgroundColor: props.enableLogin ? 'red' : '#EEE',
        },
      ]}
      onPress={() => {
        if (!props.enableLogin) {
          globalToast.showToast('请输入账号及密码');
          return;
        }
        if (!props.agreePrivacy) {
          globalToast.showToast('请勾选隐私协议');
          return;
        }
        // router.push(RouteNames.Web, {url: 'https://www.baidu.com/'});
        router.push(RouteNames.FeedBack);
      }}>
      <Text style={{color: props.enableLogin ? '#FFF' : '#999'}}>去登录</Text>
    </TouchableOpacity>
  );
};

const MoreActionsInfoView = () => {
  const actions = ['新用户注册', '短信验证码登录', '忘记密码'];
  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {actions.map((item, index) => {
        const textAlign =
          index === 0
            ? 'left'
            : index === actions.length - 1
            ? 'right'
            : 'center';
        return (
          <Text
            key={item}
            style={{flex: 1, textAlign: textAlign}}
            onPress={() => {
              if (index === 0) {
                router.push(RouteNames.Register);
              } else if (index === 1) {
                router.push(RouteNames.SMSCodeLogin);
              } else if (index === 2) {
                router.push(RouteNames.FeedBack);
              }
            }}>
            {item}
          </Text>
        );
      })}
    </View>
  );
};
