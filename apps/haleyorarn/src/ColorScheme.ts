import {StyleSheet} from 'react-native';
import {heightPixel, pixelSizeHorizontal, pixelSizeVertical} from 'utils';

export const ColorScheme = {
  primary: '#06A3DA',
  orange: '#FF6B00',
  red: '#FF0000',
  darkText: '#202244',
  greyText: '#A0A4AB',
  green: '#50B748',
};

export const GlobalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: pixelSizeHorizontal(20),
  },
  p1: {
    padding: pixelSizeHorizontal(10),
  },
  p2: {
    padding: pixelSizeHorizontal(20),
  },
  p3: {
    padding: pixelSizeHorizontal(30),
  },
  p4: {
    padding: pixelSizeHorizontal(40),
  },
  mt1: {
    marginTop: pixelSizeVertical(10),
  },
  mt2: {
    marginTop: pixelSizeVertical(20),
  },
  mt3: {
    marginTop: pixelSizeVertical(30),
  },
  mt4: {
    marginTop: pixelSizeVertical(40),
  },
  mt5: {
    marginTop: pixelSizeVertical(50),
  },
  pt1: {
    paddingTop: pixelSizeVertical(10),
  },
  pt2: {
    paddingTop: pixelSizeVertical(20),
  },
  pt3: {
    paddingTop: pixelSizeVertical(30),
  },
  ml1: {
    marginLeft: pixelSizeHorizontal(10),
  },
  ml2: {
    marginLeft: pixelSizeHorizontal(20),
  },
  ml3: {
    marginLeft: pixelSizeHorizontal(30),
  },
  pl1: {
    paddingLeft: pixelSizeHorizontal(10),
  },
  pl2: {
    paddingLeft: pixelSizeHorizontal(20),
  },
  pl3: {
    paddingLeft: pixelSizeHorizontal(30),
  },
  mr1: {
    marginRight: pixelSizeHorizontal(10),
  },
  mr2: {
    marginRight: pixelSizeHorizontal(20),
  },
  mr3: {
    marginRight: pixelSizeHorizontal(30),
  },
  pr1: {
    paddingRight: pixelSizeHorizontal(10),
  },
  pr2: {
    paddingRight: pixelSizeHorizontal(20),
  },
  pr3: {
    paddingRight: pixelSizeHorizontal(30),
  },
  mb1: {
    marginBottom: pixelSizeVertical(10),
  },
  mb2: {
    marginBottom: pixelSizeVertical(20),
  },
  mb3: {
    marginBottom: pixelSizeVertical(30),
  },
  pb1: {
    paddingBottom: pixelSizeVertical(10),
  },
  pb2: {
    paddingBottom: pixelSizeVertical(20),
  },
  pb3: {
    paddingBottom: pixelSizeVertical(30),
  },
  mh1: {
    marginHorizontal: pixelSizeVertical(pixelSizeHorizontal(10)),
  },
  mh2: {
    marginHorizontal: pixelSizeVertical(pixelSizeHorizontal(20)),
  },
  mh3: {
    marginHorizontal: pixelSizeHorizontal(30),
  },
  ph1: {
    paddingHorizontal: pixelSizeHorizontal(10),
  },
  ph2: {
    paddingHorizontal: pixelSizeHorizontal(20),
  },
  ph3: {
    paddingHorizontal: pixelSizeHorizontal(30),
  },
  mv1: {
    marginVertical: pixelSizeVertical(10),
  },
  mv2: {
    marginVertical: pixelSizeVertical(20),
  },
  mv3: {
    marginVertical: pixelSizeVertical(30),
  },
  pv1: {
    paddingVertical: pixelSizeVertical(10),
  },
  pv2: {
    paddingVertical: pixelSizeVertical(20),
  },
  pv3: {
    paddingVertical: pixelSizeVertical(30),
  },
  gap1: {
    gap: pixelSizeVertical(10),
  },
  gap2: {
    gap: pixelSizeVertical(20),
  },
  gap3: {
    gap: pixelSizeVertical(30),
  },
  gap4: {
    gap: pixelSizeVertical(40),
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  center: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  alignBaseline: {
    alignItems: 'baseline',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexNoWrap: {
    flexWrap: 'nowrap',
  },
  shadow: {
    elevation: 28,
    shadowColor: '#000',
  },
  shadowSmall: {
    elevation: 10,
    shadowColor: 'grey',
  },
  buttonRounded: {
    borderRadius: 30,
    height: heightPixel(60),
  },
  divider: {
    borderBottomColor: ColorScheme.greyText,
    borderBottomWidth: 1,
  },
  card: {
    marginHorizontal: pixelSizeHorizontal(19),
    marginVertical: pixelSizeHorizontal(10),
    padding: pixelSizeHorizontal(16),
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});
