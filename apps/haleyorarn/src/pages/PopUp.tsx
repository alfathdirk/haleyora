import React from 'react';
import Overlay from '@components/Overlay';
import Text from '@components/text';
import {Image} from '@rneui/themed';
import {StyleSheet} from 'react-native';
import {GlobalStyles} from 'ColorScheme';

const styles = StyleSheet.create({
  content: {
    width: 332,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 130,
    height: 130,
  },
});

const PopUp = () => {
  return (
    <Overlay isVisible closeButton contentStyle={styles.content}>
      <Image source={require('@img/congrats.png')} style={styles.image} />
      <Text bold size={22} style={GlobalStyles.pt2}>
        Congratulations
      </Text>
      <Text bold center style={GlobalStyles.pt2}>
        Your Account is Ready to Use. You will be redirected to the Home Page in
        a Few Seconds.
      </Text>
    </Overlay>
  );
};

export default PopUp;
