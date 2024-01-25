import React from 'react';
import TextInput from '@components/TextInput';
import {ColorScheme} from 'ColorScheme';
import {heightPixel, widthPixel} from 'utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    height: heightPixel(48),
    borderRadius: 100,
    backgroundColor: 'white',
    // justifyContent: 'space-between',
    borderWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});

interface Props {
  disabled?: boolean;
  leftPress?: () => void;
  rightPress?: () => void;
  onChangeText?: (text: string) => void;
}

const SearchBar = (props: Props) => {
  return (
    <TextInput
      style={styles.searchContainer}
      editable={props.disabled}
      suffix={
        <TouchableOpacity onPress={props.leftPress} activeOpacity={0.9}>
          <Icon
            name="magnify"
            size={widthPixel(30)}
            color={ColorScheme.primary}
          />
        </TouchableOpacity>
      }
      placeholder="Search for.."
      onChangeText={props.onChangeText}
      prefix={
        <TouchableOpacity onPress={props.rightPress} activeOpacity={0.9}>
          <Icon
            name="filter"
            size={widthPixel(30)}
            onPress={() => {
              // navigate to filter page
            }}
          />
        </TouchableOpacity>
      }
    />
  );
};

export default SearchBar;
