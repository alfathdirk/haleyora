import React from 'react';
import CardCourse from 'components/Card/CardCourse';
import {ScrollView, View} from 'react-native';
import {GlobalStyles} from 'ColorScheme';

const SearchResults = () => {
  return (
    <ScrollView contentContainerStyle={GlobalStyles.container}>
      {Array.from({length: 10}).map((_, index) => (
        <View key={index} style={[GlobalStyles.mb2]}>
          <CardCourse
            title="3D Design"
            image={{uri: 'https://picsum.photos/200/300'}}
            onPress={() => {}}
            rating={4.7}
            level="Beginner"
            category="Graphic Design"
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default SearchResults;
