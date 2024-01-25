import {AirbnbRating, Slider} from '@rneui/themed';
import {ColorScheme, GlobalStyles} from 'ColorScheme';
import Text from 'components/text';
import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {heightPixel, pixelSizeHorizontal, widthPixel} from 'utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    marginHorizontal: pixelSizeHorizontal(20),
    marginVertical: pixelSizeHorizontal(10),
    padding: pixelSizeHorizontal(16),
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  achievementLabel: {
    marginLeft: pixelSizeHorizontal(16),
    width: '60%',
  },
  badge: {
    backgroundColor: '#F5F9FF',
    width: widthPixel(30),
    elevation: 1,
    height: widthPixel(30),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    flex: 1,
    marginTop: pixelSizeHorizontal(10),
  },
  trackStyle: {
    height: 18,
    borderRadius: 16,
  },
  thumbStyle: {
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  image: {
    width: widthPixel(80),
    height: heightPixel(80),
    borderRadius: 16,
    marginRight: 16,
  },
  rating: {
    marginTop: pixelSizeHorizontal(10),
    position: 'absolute',
    bottom: 0,
    left: pixelSizeHorizontal(-4),
  },
});

const Achievement = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={[GlobalStyles.alignCenter, GlobalStyles.flexRow]}>
          <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={10}
            color={ColorScheme.green}
            shadowColor="#F2F2F7"
            bgColor="#fff">
            <Text style={{fontSize: 18}}>{'30%'}</Text>
          </ProgressCircle>
          <View style={styles.achievementLabel}>
            <Text color={ColorScheme.greyText} bold size={11}>
              Total Achievement
            </Text>
            <Text size={22} bold>
              30
            </Text>
            <Text size={10} color={ColorScheme.greyText}>
              Great job, John! Complete your achievements now
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <View style={GlobalStyles.flexRow}>
          <Image
            source={{uri: 'https://picsum.photos/150/150'}}
            style={styles.image}
          />
          <View style={[GlobalStyles.flexColumn, GlobalStyles.spaceBetween]}>
            <Text bold size={16}>
              Graphic Design 3D Tutorial
            </Text>
            <View
              style={[
                GlobalStyles.flexRow,
                GlobalStyles.alignCenter,
                {gap: pixelSizeHorizontal(2)},
              ]}>
              <Icon
                name="video-outline"
                size={widthPixel(10)}
                color={ColorScheme.greyText}
              />
              <Text size={10} color={ColorScheme.greyText}>
                10 Class
              </Text>
              <Text size={10} color={ColorScheme.greyText}>
                {' '}
                |{' '}
              </Text>
              <Icon
                name="clock-outline"
                size={widthPixel(10)}
                color={ColorScheme.greyText}
              />
              <Text size={10} color={ColorScheme.greyText}>
                4 hours
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.spaceAround,
            GlobalStyles.mt2,
          ]}>
          <View
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.gap1,
              GlobalStyles.alignCenter,
            ]}>
            <View style={styles.badge}>
              <Icon name="account" size={widthPixel(20)} />
            </View>
            <View>
              <Text size={10} color={ColorScheme.greyText}>
                Video Progress
              </Text>
              <Text size={16} bold>
                70%
              </Text>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.gap1,
              GlobalStyles.alignCenter,
            ]}>
            <View style={styles.badge}>
              <Icon name="account" size={widthPixel(20)} />
            </View>
            <View>
              <Text size={10} color={ColorScheme.greyText}>
                Quiz Progress
              </Text>
              <Text size={16} bold>
                70%
              </Text>
            </View>
          </View>
        </View>
        <Slider
          value={8}
          maximumValue={10}
          minimumValue={0}
          disabled
          style={styles.sliderStyle}
          allowTouchTrack={false}
          trackStyle={styles.trackStyle}
          maximumTrackTintColor="#E8F1FF"
          minimumTrackTintColor={ColorScheme.primary}
          thumbStyle={styles.thumbStyle}
        />
      </View>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
        <View style={styles.card} key={item}>
          <View style={[GlobalStyles.flexRow]}>
            <Image
              source={{uri: 'https://picsum.photos/150/150'}}
              style={styles.image}
            />
            <View>
              <Text bold size={14} style={GlobalStyles.mb1}>
                Perfectionist
              </Text>
              <Text size={10} color={ColorScheme.greyText}>
                You have scored 100% on quizzes 20 times.
              </Text>
              <View style={styles.rating}>
                <AirbnbRating
                  count={5}
                  defaultRating={5}
                  size={20}
                  showRating={false}
                  isDisabled
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Achievement;
