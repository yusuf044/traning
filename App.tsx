/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
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
import {CurrencyButton, Label, VectorIcons} from './src/components/atoms';
import {currencyByRupee} from './src/counteryList';
import {addTrack, setupPlayer} from './playBackService';

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

  //Game
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));
  console.log('gameState========gameState', gameState);

  const reloadGame = () => {
    setIsCross(false);
    setGameWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game!`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game!`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game!`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game!`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game............');
    }
  };
  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: 'Game winner',
        textColor: '#FFF',
        backgroundColor: '#000',
      });
    }
    if (gameState[itemNumber] === 'empty') {
      console.log('=======isCross', isCross);

      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled ',
        textColor: '#FFF',
        backgroundColor: 'red',
      });
    }
    checkIsWinner();
  };

  //Spotify Player

  const [isPlayerReady, setIsPlayerReady] = useState(false);
  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup) {
      await addTrack();
    }
  }
  useEffect(() => {
    setup();
  }, []);
  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      {/* // <ScrollView style={styles.container} keyboardShouldPersistTaps="handled"> */}
      {/* <SafeAreaView style={{backgroundColor: randomBackground, flex: 1}}> */}
      {/* <View style={styles.formContinuer}>
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
        </View> */}
      {/* {isPassGenerated ? (
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
        ) : null} */}

      {/* <View style={{marginTop: 10}}>
          <Button onPress={generateColor} title={'Press Me colors changed'} />
        </View>
        <Dice imageURl={diceImage} />
        <View style={{marginTop: 10}}>
          <Button onPress={rollDicesOTop} title="Click" />
        </View> */}

      {/* currecy convert===========  */}

      {/* <View style={styles.topContainer}>
        <View style={styles.rupeesCotiounner}>
          <Label size="x4l" text={'₹'} />
          <TextInput
            style={{marginLeft: 10, borderBottomWidth: 0.4}}
            maxLength={14}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="number-pad"
            placeholder="Enter amount in Rupess"
          />
        </View>
        {resultValue && (
          <Label
            style={{marginTop: 10}}
            size="x5l"
            weight={'800'}
            text={resultValue}
          />
        )}
      </View>
      <View style={{}}>
        <FlatList
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <Pressable
              style={[
                styles.button,
                targetCurrency === item.name && styles.selected,
              ]}
              onPress={() => buttonPressed(item)}>
              <CurrencyButton {...item} />
            </Pressable>
          )}
        />
      </View> */}
      {/* </SafeAreaView> */}

      {/* Game ==============*/}
      {/* {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Label
            size="xl"
            weight={'600'}
            style={styles.winnerText}
            text={gameWinner}
          />
        </View>
      ) : (
        <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO,
          ]}>
          <Label
            size="xl"
            weight={'600'}
            style={styles.gameTurnTex}
            text={`player ${isCross ? 'X' : 'O'} 's Turn`}
          />
        </View>
      )} */}
      {/* Game Grid */}

      {/* <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        ListFooterComponent={
          <Pressable style={styles.gameButton} onPress={reloadGame}>
            <Label
              size="xl"
              weight={'500'}
              style={styles.gameBtnText}
              text={gameWinner ? 'Start New game ' : 'Reload  The Game'}
            />
          </Pressable>
        }
        renderItem={({item, index}) => {
          console.log('Item:===============', item);
          console.log('Index:', index);
          return (
            <Pressable
              key={index}
              style={styles.card}
              onPress={() => onChangeItem(index)}>
              <VectorIcons name={item} />
            </Pressable>
          );
        }}
      /> */}

      {/* Spotify Palyer */}
      <Label text={'Music'} />
    </View>
    // {/* </ScrollView> */}
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
  container: {flex: 1, backgroundColor: '#f2f7fc'},
  topContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    padding: 4,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: '#999999',
    margin: 10,
  },
  selected: {backgroundColor: '#FFF'},
  resultText: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesCotiounner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB3B3',
    padding: 10,
  },
  inputAmountFiled: {height: 40},
  bottomContiouner: {},

  //Game
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    margin: 13,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowColor: '#333',
    shadowRadius: 1.5,
  },
  gameTurnTex: {
    color: 'white',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    width: '33.33%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOpacity: 0.1,
  },
  winnerText: {
    color: 'white',

    textTransform: 'capitalize',
  },
  gameButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
    marginTop: 20,
  },
  gameBtnText: {
    color: 'white',
  },
});

export default App;
