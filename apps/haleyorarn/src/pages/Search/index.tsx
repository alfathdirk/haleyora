import React from 'react';
import SearchBar from 'components/SearchBar';
import {StyleSheet, View} from 'react-native';
import {GlobalStyles} from 'ColorScheme';
import Text from 'components/text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {debounce, widthPixel} from 'utils';

const styles = StyleSheet.create({
  searched: {
    width: widthPixel(370),
  },
  container: {
    flex: 1,
  },
});
const Search = () => {
  const search = debounce((val: string) => {
    console.log(val);
  }, 1000);

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <SearchBar onChangeText={val => search(val)} />
      <View style={GlobalStyles.pv3}>
        <Text bold>Recent search</Text>
      </View>
      {[1, 2, 3].map((item, index) => (
        <View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.spaceBetween,
            GlobalStyles.mb1,
            GlobalStyles.alignCenter,
            styles.searched,
          ]}
          key={index}>
          <Text numberOfLines={1}>3D Design lor</Text>
          <Icon name="close" size={widthPixel(16)} />
        </View>
      ))}
    </View>
  );
};

export default Search;
