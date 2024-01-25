import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import {ColorScheme, GlobalStyles} from 'ColorScheme';
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from 'utils';
import Text from '@components/text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Slider} from '@rneui/themed';

interface Props {
  image: ImageSourcePropType;
  title: string;
  rating: number;
  level: string;
  onPress: () => void;
  category: string;
}

const styles = StyleSheet.create({
  cardImage: {
    width: widthPixel(130),
    height: heightPixel(130),
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: 'grey',
  },
  flex: {
    flex: 1,
    flexDirection: 'column',
    top: pixelSizeVertical(6),
  },
  rating: {
    position: 'absolute',
    flex: 1,
    bottom: pixelSizeVertical(10),
    margin: pixelSizeHorizontal(10),
    width: '100%',
  },
  sliderStyle: {
    flex: 1,
  },
  trackStyle: {
    height: 8,
    borderRadius: 4,
    borderColor: 'red',
  },
  thumbStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  sliderProcess: {
    position: 'absolute',
    flex: 1,
    bottom: pixelSizeVertical(6),
    marginLeft: pixelSizeHorizontal(10),
    width: '100%',
  },
});

const CardCourse = (props: Props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={props.onPress}
      activeOpacity={0.8}>
      <Image source={props.image} resizeMode="cover" style={styles.cardImage} />
      <View style={[GlobalStyles.p1, styles.flex]}>
        <Text
          size={10}
          bold
          color={ColorScheme.orange}
          style={GlobalStyles.mb1}>
          {props.category}
        </Text>
        <Text size={13} bold numberOfLines={3}>
          {props.title}
        </Text>
        <View style={styles.rating}>
          <View
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.spaceBetween,
              GlobalStyles.alignCenter,
            ]}>
            <View style={GlobalStyles.flexRow}>
              <Icon name="star" size={widthPixel(10)} color="#FCCB40" />
              <Text size={10} bold>
                {`${props.rating} `}
              </Text>
              <Text size={10}> | </Text>
              <Text size={10} color="#A0A4AB">
                {` ${props.level}`}
              </Text>
            </View>
            <Icon
              name="bookmark-outline"
              size={widthPixel(20)}
              color={ColorScheme.primary}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface PropsProgress extends Props {
  duration: string;
  total: number;
  current: number;
}
const CardProgress = (props: PropsProgress) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={props.onPress}
      activeOpacity={0.8}>
      <Image source={props.image} resizeMode="cover" style={styles.cardImage} />
      <View style={[GlobalStyles.p1, styles.flex]}>
        <Text
          size={10}
          bold
          color={ColorScheme.orange}
          style={GlobalStyles.mb1}>
          {props.category}
        </Text>
        <Text size={13} bold numberOfLines={3}>
          {props.title}
        </Text>
        <View style={styles.sliderProcess}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
            <Icon name="star" size={widthPixel(10)} color="#FCCB40" />
            <Text size={10} bold>
              {`${props.rating} `}
            </Text>
            <Text size={10}> | </Text>
            <Text size={10} color="#A0A4AB">
              {props.duration}
            </Text>
          </View>
          <View
            style={[
              GlobalStyles.spaceBetween,
              GlobalStyles.flexRow,
              GlobalStyles.alignCenter,
            ]}>
            <Slider
              value={props.current}
              maximumValue={props.total}
              minimumValue={0}
              allowTouchTrack={false}
              disabled
              style={styles.sliderStyle}
              trackStyle={styles.trackStyle}
              maximumTrackTintColor="#E8F1FF"
              minimumTrackTintColor={ColorScheme.primary}
              thumbStyle={styles.thumbStyle}
            />
            <Text size={10} style={GlobalStyles.ml1}>
              {`${props.current}/${props.total}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {CardProgress};
export default CardCourse;
