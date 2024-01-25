import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {ColorScheme, GlobalStyles} from 'ColorScheme';
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from 'utils';
import Text from '@components/text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  cardImage: {
    width: widthPixel(280),
    height: heightPixel(130),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  card: {
    width: widthPixel(280),
    height: heightPixel(220),
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: pixelSizeHorizontal(20),
    marginBottom: pixelSizeVertical(6),
    elevation: 2,
    shadowColor: 'grey',
  },
  icBookmark: {
    position: 'absolute',
    right: pixelSizeHorizontal(6),
    top: pixelSizeVertical(-20),
    backgroundColor: '#fff',
    borderRadius: 100,
    elevation: 2,
    zIndex: 9,
    padding: 10,
  },
});
const CardHome = () => {
  return (
    <View style={[styles.card]}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/474x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg',
        }}
        resizeMode="cover"
        style={styles.cardImage}
      />
      <View style={GlobalStyles.p1}>
        <View style={styles.icBookmark}>
          <Icon
            name="bookmark-outline"
            size={widthPixel(20)}
            color={ColorScheme.primary}
          />
        </View>
        <Text
          size={10}
          bold
          color={ColorScheme.orange}
          style={GlobalStyles.mb1}>
          Graphic Design
        </Text>
        <Text size={13} bold>
          Graphic Design Tutorial For Beginners
        </Text>
        <View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.alignCenter,
            GlobalStyles.mt1,
          ]}>
          <Icon name="star" size={widthPixel(10)} color="#FCCB40" />
          <Text size={10} bold>
            4.5
          </Text>
          <Text size={10}> | </Text>
          <Text size={10} color="#A0A4AB">
            Beginner
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardHome;
