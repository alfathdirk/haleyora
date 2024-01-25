import React from 'react';
import {Text, TextProps, ViewStyle} from 'react-native';
import {fontPixel} from 'utils';

interface PropsText extends TextProps {
  children?: any;
  style?: any;
  bold?: boolean;
  size?: number;
  color?: string;
  center?: boolean;
}

const styles = {
  text: (
    size?: number,
    color?: string,
    bold?: boolean,
    center?: boolean,
    newStyle?: any,
  ) => ({
    fontSize: size ? fontPixel(size) : fontPixel(16),
    color: color ?? '#000000',
    fontWeight: bold ? 'bold' : 'normal',
    textAlign: center ? 'center' : 'left',
    ...newStyle,
  }),
};

const TextCustom = ({
  children,
  style: newStyle,
  bold,
  size,
  color,
  center,
  ...props
}: PropsText) => {
  return (
    <Text
      style={[styles.text(size, color, bold, center, newStyle) as ViewStyle]}
      {...props}>
      {children}
    </Text>
  );
};

export default TextCustom;
