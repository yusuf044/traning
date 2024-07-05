import {View, Text} from 'react-native';
import React from 'react';
import Label from '../label';
type Props = {
  headingTitle?: string;
  iconCenter?: any;
  iconRight?: any;
  iconLeft?: any;
};
const Heading = ({headingTitle, iconCenter, iconLeft, iconRight}: Props) => {
  return (
    <View>
      <Label weight="700" size="xxl" text={headingTitle} />
    </View>
  );
};

export default Heading;
