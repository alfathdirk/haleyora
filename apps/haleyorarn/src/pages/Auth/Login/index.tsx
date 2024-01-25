import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '@components/text';
import TextInput from '@components/TextInput';
import {Button, CheckBox} from '@rneui/base';

import logo from '@img/logo.png';
import icGoogle from '@img/google.png';
import {ColorScheme, GlobalStyles} from 'ColorScheme';
import styles from '../style';

const Login = () => {
  const [value, onChangeText] = React.useState('');
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <View>
            <Text size={30} color={ColorScheme.primary} bold>
              PLN
            </Text>
            <Text size={18} color={ColorScheme.primary}>
              Haleyora Power
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.labelSignin}>
          <Text size={24} bold>
            Let’s Sign In.!
          </Text>
          <Text>Login to Your Account to Continue your Courses</Text>
        </View>
        <TextInput
          suffix={<Icon name="mail" size={24} color={ColorScheme.primary} />}
          placeholder="Email"
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <TextInput
          suffix={<Icon name="lock" size={24} color={ColorScheme.primary} />}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => onChangeText(text)}
          value={value}
        />
        <View
          style={[
            GlobalStyles.spaceBetween,
            GlobalStyles.flexRow,
            GlobalStyles.mt1,
          ]}>
          <CheckBox
            checked={false}
            onPress={() => {}}
            iconType="material-community"
            checkedIcon="checkbox-marked-circle"
            uncheckedIcon="checkbox-blank-outline"
            containerStyle={styles.checkbox}
            title={<Text> Remember Me</Text>}
            checkedColor={ColorScheme.primary}
          />
          <Text>Forgot Password?</Text>
        </View>
        <Button
          title="Sign In"
          onPress={() => {}}
          containerStyle={[GlobalStyles.shadow, styles.buttonLogin]}
          buttonStyle={[GlobalStyles.buttonRounded]}
        />
        <View style={[GlobalStyles.alignCenter, styles.login2]}>
          <Text bold>Or Continue with</Text>
          <View style={styles.roundedButton}>
            <Image source={icGoogle} style={styles.logoGoogle} />
          </View>
          <View style={[GlobalStyles.flexRow, GlobalStyles.mt5]}>
            <Text bold>Don’t have an account?</Text>
            <TouchableOpacity>
              <Text bold color={ColorScheme.primary}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
