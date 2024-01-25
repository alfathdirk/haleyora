import {ColorScheme} from 'ColorScheme';
import {StyleSheet} from 'react-native';
import {
  widthPixel,
  pixelSizeHorizontal,
  heightPixel,
  pixelSizeVertical,
} from 'utils';

const styles = StyleSheet.create({
  imageQuiz: {
    width: widthPixel(304),
    height: widthPixel(200),
    marginBottom: pixelSizeHorizontal(20),
    marginTop: pixelSizeHorizontal(40),
  },
  buttonAnswer: {
    backgroundColor: '#F5F9FF',
    padding: pixelSizeHorizontal(16),
    borderRadius: 24,
    height: pixelSizeHorizontal(50),
    display: 'flex',
    width: widthPixel(160),
    margin: pixelSizeHorizontal(10),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderStyle: {
    flex: 1,
    marginVertical: pixelSizeHorizontal(20),
  },
  trackStyle: {
    height: 18,
    borderRadius: 16,
  },
  thumbStyle: {
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  cardAnswer: {
    marginTop: '15%',
    padding: pixelSizeHorizontal(26),
    borderRadius: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
    display: 'flex',
    width: '100%',
    elevation: 2,
    marginBottom: pixelSizeHorizontal(20),
    alignItems: 'center',
    gap: pixelSizeHorizontal(6),
  },
  checkedIcon: {
    position: 'absolute',
    top: pixelSizeHorizontal(-8),
    right: 0,
  },
  buttonNext: {
    borderRadius: 36,
    backgroundColor: ColorScheme.primary,
  },
  buttonNextContainer: {
    position: 'absolute',
    bottom: pixelSizeHorizontal(20),
    alignSelf: 'center',
    width: '100%',
  },
  // detail
  image: {
    width: '100%',
    height: heightPixel(250),
  },
  card: {
    position: 'absolute',
    zIndex: 99,
    bottom: pixelSizeVertical(-70),
    paddingVertical: pixelSizeVertical(20),
    margin: pixelSizeHorizontal(20),
    width: widthPixel(374),
    backgroundColor: '#fff',
    padding: pixelSizeHorizontal(10),
    borderRadius: 16,
    elevation: 2,
  },
  rating: {},
  cardCourses: {
    backgroundColor: '#fff',
    marginTop: pixelSizeVertical(50),
    borderRadius: 16,
    elevation: 2,
    padding: pixelSizeHorizontal(15),
  },
  itemCourses: {
    padding: pixelSizeHorizontal(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  number: {
    backgroundColor: '#F5F9FF',
    width: widthPixel(30),
    elevation: 1,
    height: widthPixel(30),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    width: widthPixel(240),
  },
  iconQuiz: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: pixelSizeVertical(10),
    gap: pixelSizeHorizontal(8),
  },
});

export default styles;
