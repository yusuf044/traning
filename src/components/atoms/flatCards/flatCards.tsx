import {View, Text, ViewStyle, TextProps} from 'react-native';
import React from 'react';
import stylesCSS from './styles';
import {useTheme} from '@react-navigation/native';

type Props = {
  viewStyle?: ViewStyle;
  titleStyle?: TextProps['style'];
  title?: string;
};
const FlatCards = ({viewStyle, titleStyle, title}: Props) => {
  const {colors} = useTheme();
  const styles = stylesCSS(colors);

  return (
    <View style={[styles.continuer, viewStyle]}>
      <Text style={[styles.headings, titleStyle]}>{title}</Text>
    </View>
  );
};

export default FlatCards;
