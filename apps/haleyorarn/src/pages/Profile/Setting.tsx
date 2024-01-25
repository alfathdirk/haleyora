import {Image} from '@rneui/base';
import {ColorScheme, GlobalStyles} from 'ColorScheme';
import Text from 'components/text';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {heightPixel, pixelSizeVertical, widthPixel} from 'utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: pixelSizeVertical(20),
  },
  image: {
    width: widthPixel(200),
    height: heightPixel(200),
    borderRadius: 100,
    marginBottom: pixelSizeVertical(10),
  },
});

const SettingProfile = () => {
  const settingList = [
    {
      title: 'Edit Profile',
      onPress: () => {},
      icon: 'account-edit',
    },
    {
      title: 'Notification',
      onPress: () => {},
      icon: 'bell',
    },
    {
      title: 'Security',
      onPress: () => {},
      icon: 'lock-reset',
    },
    {
      title: 'terms & Conditions',
      onPress: () => {},
      icon: 'file-document',
    },
    {
      title: 'Help Center',
      onPress: () => {},
      icon: 'help-circle',
    },
    {
      title: 'Logout',
      onPress: () => {},
      icon: 'logout',
    },
  ];

  return (
    <View style={[styles.container]}>
      <View style={GlobalStyles.alignCenter}>
        <Image
          source={{uri: 'https://picsum.photos/150/150'}}
          style={styles.image}
        />
        <View style={GlobalStyles.mt2} />
        <Text size={22} bold>
          Jon Fredi
        </Text>
        <Text size={14} color={ColorScheme.greyText}>
          Jon@Fredi
        </Text>
      </View>
      <View style={[GlobalStyles.card, GlobalStyles.mt3]}>
        {settingList.map((item, index) => (
          <View
            key={index}
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.spaceBetween,
              GlobalStyles.p1,
            ]}>
            <View
              style={[
                GlobalStyles.flexRow,
                GlobalStyles.center,
                GlobalStyles.gap1,
              ]}>
              <Icon name={item.icon} size={24} />
              <Text>{item.title}</Text>
            </View>
            <Icon name="chevron-right" size={24} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SettingProfile;
