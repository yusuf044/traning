import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Text, TextStyle, TextProps} from 'react-native';

import {useTheme} from '@react-navigation/native';
import {Fonts, Sizes} from '../../../common';

export type Props = {
  size?: keyof typeof Sizes;
  color?: keyof Theme['colors'];
  onPress?: () => void;
  weight?: TextStyle['fontWeight'];
  allowFontScaling?: TextProps['allowFontScaling'];
  fontFamily?: keyof typeof Fonts;
  style?: TextProps['style'];
  index?: number;
  letterSpacing?: TextStyle['letterSpacing'];
  numberOfLines?: TextProps['numberOfLines'];
  ellipsizeMode?: TextProps['ellipsizeMode'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  lineHeight?: keyof typeof Sizes;
  children?: React.ReactElement;
} & LabelType;

const Label = ({
  text,
  children,
  size = 'l',
  color = 'textLight',
  weight = 'normal',
  fontFamily = 'Regular',
  style,
  align,
  letterSpacing = 0.5,
  numberOfLines,
  ellipsizeMode,
  textDecorationLine,
  index,
  onPress,
  allowFontScaling = false,
  lineHeight, //= 'l',
  ...other
}: Props) => {
  const {colors} = useTheme();

  return (
    <Text
      onPress={onPress}
      allowFontScaling={allowFontScaling}
      key={index}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: Sizes[size],
          color: colors[color],
          fontWeight: weight,
          fontFamily: Fonts[fontFamily],
          fontStyle: 'normal',
          textAlign: align,
          letterSpacing: letterSpacing,
          textDecorationLine: textDecorationLine,
        },
        lineHeight
          ? {lineHeight: Sizes[lineHeight]}
          : {lineHeight: Sizes[size]},
        style,
      ]}
      {...other}>
      {text}
      {children}
    </Text>
  );
};

export default Label;
