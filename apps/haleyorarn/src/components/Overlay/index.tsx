import React from 'react';
import {Overlay as Orn, OverlayProps} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {scaleSize} from 'utils';

interface Props extends OverlayProps {
  children: React.ReactNode;
  closeButton?: boolean;
  contentStyle?: any;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    elevation: 20,
    shadowColor: 'grey',
    backgroundColor: '#FFFFFF',
  },
  close: {
    position: 'absolute',
    top: -20,
    right: -20,
    padding: 10,
    borderRadius: 40,
    elevation: 20,
    shadowColor: 'grey',
    backgroundColor: '#FFFFFF',
  },
  icClose: {
    color: '#000000',
  },
});

const Overlay = (props: Props) => {
  return (
    <Orn {...props} overlayStyle={styles.container}>
      <View style={props.contentStyle}>
        {props.closeButton && (
          <TouchableOpacity
            onPress={props.onBackdropPress}
            style={styles.close}>
            <Icon name="close" size={scaleSize(24)} style={styles.icClose} />
          </TouchableOpacity>
        )}
        {props.children}
      </View>
    </Orn>
  );
};

export default Overlay;
