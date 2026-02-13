import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import Dashboard from './Dashboard';
import Box_withSpring from './Box_withSpring';
import Box_event from './Box_event';
import Box_Keyframe from './Box_Keyframe';
const listTab = [
  {
    status: 'Home',
    desc: '下拉缩放',
  },
  {
    status: 'About',
    desc: '位移，缩放',
  },
  {
    status: 'Contact',
    desc: '拖拽',
  },
  {
    status: 'Keyframe',
    desc: '关键帧',
  },
];

// Linking content
const data = [
  {
    name: 'Home content',
    text: 'This is my homepage. Here I welcome you to my website and try me best to make a good impression. I tell you about the services I provide and encourage you to venture into my site.',
    status: 'Home',
    child: <Dashboard />,
  },
  {
    name: 'About content',
    text: 'Here I go into details about myself and my business, including the services we provide, how we started and our overall ethos.',
    status: 'About',
    child: <Box_withSpring />,
  },
  {
    name: 'Contact content',
    text: 'Here we give you information on how to contact us for business discussions and possible collaborations.',
    status: 'Contact',
    child: <Box_event />,
  },
  {
    name: 'Keyframe content',
    text: 'Here we give you information on how to contact us for business discussions and possible collaborations.',
    status: 'Keyframe',
    child: <Box_Keyframe />,
  },
];

export default function App() {
  // the following code goes here
  const [status, setStatus] = useState('Home');
  const [dataList, setDataList] = useState([
    ...data.filter(e => e.status === 'Home'),
  ]);

  const setStatusFilter = status => {
    if (status !== 'Home') {
      setDataList([...data.filter(e => e.status === status)]);
    } else {
      setDataList([...data.filter(e => e.status === 'Home')]);
    }

    setStatus(status);
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listTab}>
        {listTab.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.btnTab,
                status === e.status && styles.btnTabActive,
              ]}
              onPress={() => setStatusFilter(e.status)}>
              <Text
                style={
                  (styles.textTab, status === e.status && styles.textTabActive)
                }>
                {e.desc}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {dataList[0].child ?? (
        <FlatList
          style={{borderColor: 'green', borderWidth: 1}}
          data={dataList}
          keyExtractor={(e, i) => i.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  listTab: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 5,
    borderColor: 'red',
    borderWidth: 1,
  },
  btnTab: {
    width: 50,
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: 'purple',
    borderRadius: 5,
  },
  textTabActive: {
    color: '#fff',
  },
  itemContainer: {
    justifyContent: 'flex-end',
    paddingVertical: 15,
    marginLeft: 30,
    marginTop: 10,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
});
