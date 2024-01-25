import {Button, Slider} from '@rneui/themed';
import {ColorScheme, GlobalStyles} from 'ColorScheme';
import Text from 'components/text';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';

const Quiz = () => {
  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <View
        style={[
          GlobalStyles.alignCenter,
          GlobalStyles.flexRow,
          GlobalStyles.spaceBetween,
        ]}>
        <Text>Quiz</Text>
        <Icon name="close" size={24} color="#000" />
      </View>

      <View
        style={[
          GlobalStyles.spaceBetween,
          GlobalStyles.flexRow,
          GlobalStyles.alignCenter,
          GlobalStyles.gap1,
        ]}>
        <Slider
          value={1}
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
        <Text size={12}>1/10</Text>
      </View>

      <View style={GlobalStyles.alignCenter}>
        <View>
          <Image
            source={{uri: 'https://picsum.photos/200/300'}}
            style={styles.imageQuiz}
          />
        </View>
        <View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.flexWrap,
            GlobalStyles.center,
            GlobalStyles.mt4,
          ]}>
          {[1, 2, 3, 4].map((item, index) => (
            <TouchableOpacity style={styles.buttonAnswer} key={index}>
              <Text center>A. Answer</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.cardAnswer}>
        <Text size={22} bold color={ColorScheme.green}>
          Amazing!
        </Text>
        <Text size={12} color={ColorScheme.green}>
          Correct Answer: A
        </Text>
        <TouchableOpacity style={styles.checkedIcon}>
          <Icon name="check-circle" size={30} color={ColorScheme.green} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonNextContainer}>
        <Button
          title="Next Question"
          onPress={() => {}}
          containerStyle={[GlobalStyles.shadow]}
          buttonStyle={[GlobalStyles.buttonRounded, styles.buttonNext]}
        />
      </View>
    </View>
  );
};

export default Quiz;
