import {View, Text} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Label from '../label';
type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  return (
    <View style={{alignItems: 'center'}}>
      <Label text={props.flag} />
      <Label text={props.name} />
    </View>
  );
};

export default CurrencyButton;
