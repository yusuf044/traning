/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {PropsWithChildren, useState} from 'react';
import {
  Button,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {SafeAreaView} from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as Yup from 'yup';
import One from './src/assets/images/pasa1.jpeg';
import Two from './src/assets/images/pasa2.png';
import THree from './src/assets/images/pasa3.png';
import For from './src/assets/images/pasa4.png';
import FIve from './src/assets/images/pasa5.png';
import Six from './src/assets/images/pasa6.png';
import {Sizes} from './src/common';
import {Label} from './src/components/atoms';

type DiceProps = PropsWithChildren<{
  imageURl: ImageSourcePropType;
}>;

const Dice = ({imageURl}: DiceProps): JSX.Element => {
  return (
    <View style={{alignItems: 'center', marginTop: 10}}>
      <Image style={{width: 300, height: 300}} source={imageURl} />
    </View>
  );
};
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
  // Optional configuration
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [loweCase, setLoweCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  // Generate Password using bouncy-checkbox
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
  };
  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLoweCase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbols(false);
  };

  //App BackgroundColor Change
  const [randomBackground, setRandomBackground] = useState('#FFFFFF');
  const generateColor = () => {
    const haxRange = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += haxRange[Math.floor(Math.random() * 16)];
    }
    setRandomBackground(color);
  };

  //Dice Box Roll using haptic-feedback
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(One);
  const rollDicesOTop = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    switch (randomNumber) {
      case 1:
        console.log('1--------', One);
        setDiceImage(One);
        break;

      case 2:
        console.log('2--------', Two);
        setDiceImage(Two);
        break;

      case 3:
        setDiceImage(THree);
        break;

      case 4:
        setDiceImage(For);
        break;

      case 5:
        setDiceImage(FIve);
        break;

      case 6:
        setDiceImage(Six);
        break;

      default:
        setDiceImage(One);
        break;
    }
    // Trigger haptic feedback
    ReactNativeHapticFeedback.trigger('impactLight', options);
  };

  //Currency Covert
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a valid of Convert',
        backgroundColor: '#EA7773',
        textColor: '#000',
      });
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const covetedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol}${covetedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number Convert',
        backgroundColor: '#EA7765',
        textColor: '#000',
      });
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={{backgroundColor: randomBackground, flex: 1}}>
        <View style={styles.formContinuer}>
          <Label
            align="center"
            weight={'800'}
            size="xxl"
            text={'Password Generated'}
          />
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              generatePasswordString(values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
              handleReset,
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={[styles.row, {marginTop: 10}]}>
                    <Label text={'Password Legth'} />
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Ex...1"
                      keyboardType="numeric"
                    />
                  </View>
                  {touched.passwordLength && errors.passwordLength && (
                    <Label
                      style={{color: 'red'}}
                      text={errors.passwordLength}
                    />
                  )}
                </View>
                <View style={[styles.inputWrapper, {marginTop: 10}]}>
                  <BouncyCheckbox
                    style={{margin: 10}}
                    isChecked={loweCase}
                    fillColor="red"
                    text="include LoweCase"
                    onPress={() => {
                      setLoweCase(!loweCase);
                    }}
                  />
                  <BouncyCheckbox
                    style={{margin: 10}}
                    isChecked={upperCase}
                    fillColor="red"
                    text="include upperCase"
                    onPress={() => {
                      setUpperCase(!upperCase);
                    }}
                  />
                  <BouncyCheckbox
                    style={{margin: 10}}
                    isChecked={number}
                    fillColor="red"
                    text="include number"
                    onPress={() => {
                      setNumber(!number);
                    }}
                  />
                  <BouncyCheckbox
                    style={{margin: 10}}
                    isChecked={symbols}
                    fillColor="red"
                    text="include symbols"
                    onPress={() => {
                      setSymbols(!symbols);
                    }}
                  />
                </View>
                <View style={[styles.formAction, styles.row, {marginTop: 10}]}>
                  <Button
                    sty
                    disabled={!isValid}
                    onPress={handleSubmit}
                    title="generated Password"
                  />
                  <Button
                    disabled={!isValid}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                    title="reset"
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View
            style={{
              backgroundColor: '#FFF',
              elevation: 5,
              marginHorizontal: 10,
              padding: 5,
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Label text={'Long Press to copy '} />
            <Label text={'Result :'} />
            <Label
              weight={'900'}
              selectable={true}
              size="xxl"
              text={password}
            />
          </View>
        ) : null}

        <View style={{marginTop: 10}}>
          <Button onPress={generateColor} title={'Press Me colors changed'} />
        </View>
        <Dice imageURl={diceImage} />
        <View style={{marginTop: 10}}>
          <Button onPress={rollDicesOTop} title="Click" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {flex: 1, paddingHorizontal: Sizes.xm},
  inputColumn: {},
  inputStyle: {
    borderWidth: 0.5,
    width: 150,
  },
  formAction: {},
  heading: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default App;
