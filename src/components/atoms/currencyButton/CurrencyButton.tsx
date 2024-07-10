import {View, Text} from 'react-native';
import React, {PropsWithChildren} from 'react';
import Label from '../label';
type CurrencyButtonProps = PropsWithChildren<{
  name: string;
  flag: string;
}>;

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  return (
    <View
      style={{
        alignItems: 'center',

        width: 100,
        height: 50,
        justifyContent: 'center',

        padding: 5,
      }}>
      <Label text={props.flag} />
      <Label style={{marginTop: 4}} size="m" align="center" text={props.name} />
    </View>
  );
};

export default CurrencyButton;
