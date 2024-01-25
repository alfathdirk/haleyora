import {ColorScheme, GlobalStyles} from 'ColorScheme';
import CardCourse, {CardProgress} from 'components/Card/CardCourse';
import Text from 'components/text';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {pixelSizeHorizontal, pixelSizeVertical} from 'utils';

const styles = StyleSheet.create({
  buttonProgress: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#E8F1FF',
    paddingVertical: pixelSizeVertical(10),
    paddingHorizontal: pixelSizeHorizontal(20),
    marginHorizontal: pixelSizeHorizontal(4),
    borderRadius: 20,
    alignItems: 'center',
    flex: 1,
  },
  activeButton: {
    backgroundColor: ColorScheme.primary,
    color: '#fff',
  },
});

const Courses = () => {
  const [active, setActive] = React.useState(0);

  return (
    <ScrollView style={GlobalStyles.container}>
      <View style={[GlobalStyles.flexRow, styles.buttonProgress]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, active === 0 ? styles.activeButton : null]}
          onPress={() => setActive(0)}>
          <Text bold style={active === 0 ? styles.activeButton : null}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, active === 1 ? styles.activeButton : null]}
          onPress={() => setActive(1)}>
          <Text bold style={active === 1 ? styles.activeButton : null}>
            Ongoing
          </Text>
        </TouchableOpacity>
      </View>
      <View style={GlobalStyles.mt2}>
        <CardCourse
          title="Learn React Native"
          rating={4.5}
          level="Beginner"
          category="Mobile Development"
          image={{
            uri: 'https://picsum.photos/150/150',
          }}
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </View>
      <View style={GlobalStyles.mt2}>
        <CardProgress
          duration="1h 30m"
          total={10}
          current={5}
          title="Learn React Native"
          rating={4.5}
          level="Beginner"
          category="Mobile Development"
          image={{
            uri: 'https://picsum.photos/150/150',
          }}
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Courses;
