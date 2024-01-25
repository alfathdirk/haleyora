import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Text from '@components/text';
import {GlobalStyles} from 'ColorScheme';
import {heightPixel, widthPixel} from 'utils';

const styles = StyleSheet.create({
  gridItem: {
    borderRadius: 10,
    overflow: 'hidden',
    width: widthPixel(110),
    height: heightPixel(110),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  iconSize: {
    width: widthPixel(50),
    height: heightPixel(50),
  },
});

interface Props {
  icon: ImageSourcePropType;
  onPress: () => void;
  title: string;
}

const ClickableIcon = ({icon, onPress, title}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[styles.gridItem, GlobalStyles.shadowSmall]}>
    <Image source={icon} style={[styles.iconSize, GlobalStyles.mb1]} />
    <Text size={10} center numberOfLines={2}>
      {title}
    </Text>
  </TouchableOpacity>
);
export default ClickableIcon;
