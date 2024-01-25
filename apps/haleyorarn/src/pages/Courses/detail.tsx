import {ColorScheme, GlobalStyles} from 'ColorScheme';
import React from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {pixelSizeHorizontal, widthPixel} from 'utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '@components/text';
import styles from './style';

const CourseDetail = (props: any) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Image
            source={{uri: 'https://picsum.photos/400/200'}}
            style={styles.image}
          />
          <View style={styles.card}>
            <Text size={12} bold color={ColorScheme.orange}>
              Graphic Design
            </Text>
            <Text size={20} bold>
              Graphic Design for beginner
            </Text>
            <View style={GlobalStyles.mt1}>
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
                    asdf
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
          </View>
        </View>
        <View style={[GlobalStyles.container]}>
          <View style={styles.cardCourses}>
            <View
              style={[
                GlobalStyles.flexRow,
                GlobalStyles.spaceBetween,
                GlobalStyles.alignCenter,
              ]}>
              <Text size={16} bold>
                Section 1 -{' '}
                <Text color={ColorScheme.primary} bold>
                  Introduction
                </Text>
              </Text>
              <Text size={12} bold color={ColorScheme.primary}>
                25 Mins
              </Text>
            </View>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <View key={index}>
                <View style={styles.itemCourses}>
                  <View
                    style={[
                      GlobalStyles.flexRow,
                      GlobalStyles.alignCenter,
                      GlobalStyles.gap1,
                    ]}>
                    <View style={styles.number}>
                      <Text size={13}>{item}</Text>
                    </View>
                    <View style={styles.label}>
                      <Text size={13} bold numberOfLines={2}>
                        Introduction to Graphic Design for beginner Introduction
                        to Graphic
                      </Text>
                      <Text size={10} color={ColorScheme.greyText}>
                        4 hours
                      </Text>
                    </View>
                  </View>
                  <Icon
                    name="play-circle-outline"
                    size={widthPixel(20)}
                    color={ColorScheme.primary}
                  />
                </View>
              </View>
            ))}
            <View
              style={[
                GlobalStyles.flexRow,
                GlobalStyles.alignCenter,
                GlobalStyles.spaceBetween,
              ]}>
              <View style={styles.iconQuiz}>
                <Icon
                  name="file-document-outline"
                  size={widthPixel(20)}
                  color={ColorScheme.primary}
                />
                <Text size={13} bold color={ColorScheme.primary}>
                  Quiz
                </Text>
              </View>
              <TouchableOpacity style={styles.iconQuiz}>
                <Text bold color={ColorScheme.primary}>
                  Go
                </Text>
                <Icon
                  name="arrow-right"
                  size={widthPixel(20)}
                  color={ColorScheme.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CourseDetail;
