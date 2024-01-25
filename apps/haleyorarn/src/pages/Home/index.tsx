import {Avatar} from '@rneui/themed';
import Text from '@components/text';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorScheme, GlobalStyles} from 'ColorScheme';
import {heightPixel, pixelSizeVertical, widthPixel} from 'utils';
import LabelButton from 'components/LabelButton';
import CardHome from 'components/Card/CardHome';
import ClickableIcon from 'components/ClickableIcon';
import SearchBar from 'components/SearchBar';

const styles = StyleSheet.create({
  searchLabel: {
    width: widthPixel(180),
    paddingVertical: pixelSizeVertical(20),
  },
  searchInput: {
    backgroundColor: 'transparent',
    height: heightPixel(38),
    borderWidth: 0,
  },
  filterSearch: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9,
  },
  categoriesGrid: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: pixelSizeVertical(10),
    gap: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Home = () => {
  return (
    <ScrollView contentContainerStyle={[styles.container, GlobalStyles.pt3]}>
      <View
        style={[
          GlobalStyles.ph2,
          GlobalStyles.spaceBetween,
          GlobalStyles.flexRow,
          GlobalStyles.alignCenter,
        ]}>
        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
          <Avatar
            size="medium"
            rounded
            source={{
              uri: 'https://i.pinimg.com/474x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg',
            }}
          />
          <View style={[GlobalStyles.ml1]}>
            <Text size={10}>Welcome back!</Text>
            <Text size={16} bold>
              John Doe
            </Text>
          </View>
        </View>
        <View>
          <Icon
            name="bell-outline"
            size={widthPixel(20)}
            color={ColorScheme.darkText}
          />
        </View>
      </View>
      <View style={GlobalStyles.ph2}>
        <Text style={styles.searchLabel} size={10}>
          What Would you like to learn Today? Search Below.
        </Text>
      </View>
      <View style={GlobalStyles.ph2}>
        <SearchBar disabled />
      </View>
      <View style={[GlobalStyles.mt2, GlobalStyles.mb1, GlobalStyles.ph2]}>
        <LabelButton label="Categories" onClick={() => {}} />
      </View>
      <View
        style={[GlobalStyles.flexRow, styles.categoriesGrid, GlobalStyles.ph2]}>
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <ClickableIcon
            key={index + 'icon'}
            icon={{
              uri: 'https://i.pinimg.com/474x/05/c3/59/05c359cd010df3e7f1ea3cb6f6f54fad.jpg',
            }}
            title="3D Design"
            onPress={() => {
              console.log('first');
            }}
          />
        ))}
      </View>
      <View
        style={[
          GlobalStyles.mt2,
          GlobalStyles.mb1,
          GlobalStyles.ph2,
          GlobalStyles.pb1,
        ]}>
        <LabelButton label="Recommended Courses" onClick={() => {}} />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={GlobalStyles.ph2}
        showsHorizontalScrollIndicator={false}>
        {[0, 1, 2, 3, 4, 5].map((index, key) => (
          <CardHome key={key} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default Home;
