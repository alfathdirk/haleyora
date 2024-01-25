import React from 'react';
import Overlay from '@components/Overlay';
import Text from '@components/text';
import {Avatar, Button, Image} from '@rneui/themed';
import {StyleSheet, View} from 'react-native';
import {GlobalStyles} from 'ColorScheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInput from 'components/TextInput';
import DropDown from 'components/SelectInput';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  content: {},
  image: {
    width: 80,
    height: 80,
  },
  icEdit: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  avatar: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

const FormProfile = () => {
  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <View style={[GlobalStyles.alignCenter, styles.avatar]}>
        <Avatar
          size={80}
          rounded
          source={require('@img/logo.png')}
          avatarStyle={styles.image}
        />
        <Icon name="pencil" size={15} style={styles.icEdit} />
      </View>
      <View>
        <TextInput placeholder="Full Name" />
        <TextInput placeholder="Nick Name" />
        <TextInput
          placeholder="Date of Birth"
          suffix={<Icon name="calendar" size={15} />}
        />
        <TextInput
          placeholder="Email Address"
          suffix={<Icon name="email" size={15} />}
        />
        <DropDown
          onChange={value => console.log(value)}
          placeholder="Gender"
          items={[
            {
              label: 'Male',
              value: 'M',
            },
            {
              label: 'Female',
              value: 'F',
            },
          ]}
        />
      </View>
      <Button
        title="Continue"
        onPress={() => {}}
        containerStyle={[GlobalStyles.shadow]}
        buttonStyle={[GlobalStyles.buttonRounded]}
      />
    </View>
  );
};

export default FormProfile;
