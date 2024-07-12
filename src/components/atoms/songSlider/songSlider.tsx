import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

import Label from '../label';

const SongSlider = () => {
  const {position, duration} = useProgress();
  console.log('position===========', position);

  return (
    <View>
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor="#FFF"
        maximumTrackTintColor="#FFF"
        style={styles.sliderContainer}
      />
      <View style={styles.timeContainer}>
        <Label
          style={styles.time}
          text={new Date(position * 1000).toISOString().substring(15, 19)}
        />
        <Label
          style={styles.time}
          text={new Date((duration - position) * 1000)
            .toISOString()
            .substring(15, 19)}
        />
      </View>
    </View>
  );
};

export default SongSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  timeContainer: {
    width: 340,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  time: {color: '#FFF'},
});
