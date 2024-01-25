import React from 'react';
import {ColorScheme, GlobalStyles} from 'ColorScheme';
import Text from '@components/text';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {widthPixel} from 'utils';

interface Props {
  label: string;
  onClick: () => void;
}

const LabelButton = ({label, onClick}: Props) => {
  return (
    <View style={[GlobalStyles.flexRow, GlobalStyles.spaceBetween]}>
      <Text bold size={18}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={onClick}
        style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
        <Text bold color={ColorScheme.primary} size={12}>
          SEE ALL
        </Text>
        <Icon
          name="chevron-right"
          size={widthPixel(15)}
          color={ColorScheme.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LabelButton;
