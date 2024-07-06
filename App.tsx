/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React, {useState} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as Yup from 'yup';
import {Label} from './src/components/atoms';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 character')
    .max(16, 'Should be max of 16 character')
    .required('Length is Required'),
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [loweCase, setLoweCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitsChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';
    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (loweCase) {
      characterList += lowerCaseChars;
    }
    if (number) {
      characterList += digitsChars;
    }
    if (symbols) {
      characterList += specialChars;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
    console.log('Yusuf======');
  };
  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLoweCase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbols(false);
  };
  return (
    <View style={{flex: 1}}>
      <Label text={'App...xw'} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
