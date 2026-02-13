import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  container: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  card_wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFF',
  },
});

export {commonStyles};
