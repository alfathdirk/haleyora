import {PixelRatio, Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const scaleSize = (size: number) => {
  return PixelRatio.getPixelSizeForLayoutSize(size);
};

//for width  pixel
const widthPixel = (size: number) => {
  return normalize(size, 'width');
}; //for height  pixel
const heightPixel = (size: number) => {
  return normalize(size, 'height');
}; //for font  pixel
const fontPixel = (size: number) => {
  return heightPixel(size);
}; //for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
}; //for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};

const debounce = (callback: any, wait: number) => {
  let timeout: any = null;
  return (...args: any) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, wait);
  };
};

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  debounce,
};
