import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {GlobalStyles} from 'ColorScheme';
import ClickableIcon from 'components/ClickableIcon';
import {pixelSizeHorizontal, pixelSizeVertical} from 'utils';

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  container: {
    flex: 1,
  },
  categoriesGrid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: pixelSizeVertical(10),
    gap: pixelSizeHorizontal(16),
  },
});
const Categories = () => {
  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <View style={styles.categoriesGrid}>
        {Array.from(Array(12).keys()).map((item, index) => (
          <ClickableIcon
            key={index}
            icon={{uri: 'https://picsum.photos/200/300'}}
            onPress={() => Alert.alert(`Clicked ${index}`)}
            title="3D Design"
          />
        ))}
      </View>
    </View>
  );
};

export default Categories;
