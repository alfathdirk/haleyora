import {StyleSheet} from 'react-native';
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from 'utils';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: pixelSizeHorizontal(20),
    paddingVertical: pixelSizeVertical(40),
    justifyContent: 'center',
  },
  container: {
    marginTop: pixelSizeVertical(50),
    flex: 0.3,
    alignItems: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: pixelSizeVertical(20),
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    padding: 0,
    left: -10,
  },
  buttonLogin: {
    marginTop: pixelSizeVertical(40),
  },
  roundedButton: {
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelSizeVertical(25),
  },
  login2: {
    marginTop: pixelSizeVertical(70),
  },
  content: {
    flex: 2,
  },
  labelSignin: {
    marginVertical: pixelSizeVertical(40),
  },
  logo: {
    width: widthPixel(64),
    height: heightPixel(64),
  },
  logoGoogle: {
    width: widthPixel(30),
    height: heightPixel(30),
    marginVertical: pixelSizeVertical(20),
  },
});

export default styles;
