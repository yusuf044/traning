import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

type IconsProps = {
  name: string;
};

const VectorIcons = ({name}: IconsProps) => {
  switch (name) {
    case 'circle':
      console.log('=============11111');
      return <Icon name="circle-thin" size={30} color="#F7CD2E" />;
    case 'cross':
      return <Icon name="times" size={30} color="#38CC77" />;
    default:
      return <Icon name="pencil" size={30} color={'#0D0D0D'} />;
  }
};

export default VectorIcons;
