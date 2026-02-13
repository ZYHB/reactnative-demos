/**
 * Created by jackson on 2018/08/13.
 * 富文本
 */
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from 'react-native';
import React, {useState} from 'react';

const ScreenWidth = Dimensions.get('window').width;
const defaultMinHeight = 100;

type IProps = {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  maxLength?: number | undefined;
  minHeight?: DimensionValue | undefined;
  maxHeight?: DimensionValue | undefined;
  placeholder?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  showCount?: boolean | undefined;
  editable?: boolean | undefined;
};

//模块声名并导出
export default function CommonRichTextView({
  maxLength = 100,
  showCount = true,
  minHeight = defaultMinHeight,
  maxHeight = defaultMinHeight,
  ...props
}: IProps) {
  const [text, setText] = useState('');

  //渲染
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputViewStyle,
          props.style,
          {minHeight: minHeight, maxHeight: maxHeight},
        ]}>
        <TextInput
          style={[
            styles.inputTextStyle,
            props.inputStyle,
            {minHeight: minHeight, maxHeight: maxHeight},
          ]}
          placeholder={props.placeholder ?? '请输入'}
          editable={props.editable}
          multiline={true}
          selectionColor={'#b2b2b2'}
          textAlignVertical={'top'}
          placeholderTextColor={'#b2b2b2'}
          underlineColorAndroid={'transparent'}
          maxLength={maxLength}
          defaultValue={text}
          onChangeText={value => {
            props.onChangeText && props.onChangeText(value);
            setText(text);
          }}
        />
        {showCount ? (
          <Text
            style={{
              position: 'absolute',
              bottom: 5,
              right: 10,
              fontSize: 14,
            }}>
            {text.length}/{maxLength}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputViewStyle: {
    width: ScreenWidth - 40,
    minHeight: defaultMinHeight,
  },
  inputTextStyle: {
    fontSize: 14,
    color: '#666666',
    width: '100%',
    minHeight: defaultMinHeight,
    padding: 10,
    paddingBottom: 30,
    paddingTop: 10,
  },
});
