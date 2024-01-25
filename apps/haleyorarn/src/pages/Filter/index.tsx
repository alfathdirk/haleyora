import React from 'react';
import Text from 'components/text';
import {StyleSheet, View} from 'react-native';
import {CheckBox} from '@rneui/base';
import {ColorScheme, GlobalStyles} from 'ColorScheme';

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  container: {
    flex: 1,
  },
});
const Filter = () => {
  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <Text size={18} bold color={ColorScheme.darkText}>
        Categories
      </Text>
      <View>
        <CheckBox
          checked={false}
          onPress={() => {}}
          iconType="material-community"
          checkedIcon="checkbox-marked-circle"
          uncheckedIcon="checkbox-blank-outline"
          containerStyle={styles.checkbox}
          title={
            <Text size={14} bold>
              {' '}
              3D Design
            </Text>
          }
          checkedColor={ColorScheme.primary}
        />
      </View>
    </View>
  );
};

export default Filter;
