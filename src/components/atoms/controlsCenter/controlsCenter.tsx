import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import React from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import {playbackService} from '../../../../playBackService';
import Label from '../label';

const ControlsCenter = () => {
  const playBackState = usePlaybackState();
  console.log('playBackState==========ggggg', playBackState);

  //Next button
  const skipToNext = async () => {
    await TrackPlayer?.skipToNext();
  };
  //Previous button
  const skipToPrevious = async () => {
    TrackPlayer?.skipToPrevious();
  };
  // const togglePlayBack = async (playBack: State) => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();
  //   if (currentTrack !== null) {
  //     if (playBack === State.Paused || playBack === State.Ready) {
  //       await TrackPlayer.play();
  //     } else {
  //       await TrackPlayer.pause();
  //     }
  //   }
  // };
  const togglePlayBack = async (playBack: State) => {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      console.log('currentTrack=========currentTrack', currentTrack);

      if (currentTrack !== null) {
        console.log(
          'playBack === State.Paused || playBack === State.Ready**********',
          playBack === State.Paused || playBack === State.Ready,
        );

        if (playBack === State.Paused || playBack === State.Ready) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.pause();
        }
      } else {
        console.warn('No track is currently playing.');
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      // Handle error as needed (e.g., show a message to the user)
    }
  };

  console.log(
    'State===============playBackState === State.Playing',
    playBackState === State.Playing,
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="chevron-left" size={40} />
      </Pressable>
      <Pressable
        onPress={() => {
          togglePlayBack(playBackState);
        }}>
        <Icon
          style={styles.icon}
          name={playBackState === State.Playing ? 'play' : 'pause'}
          size={55}
        />
        <Label
          style={styles.icon}
          size="xxl"
          text={playBackState === State.Playing ? 'pause' : 'play....'}
        />
      </Pressable>
      <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="chevron-right" size={40} />
      </Pressable>
    </View>
  );
};

export default ControlsCenter;
const styles = StyleSheet.create({
  container: {
    marginBottom: 56,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',

    width: '80%',
  },
  icon: {
    color: '#FFFFFF',
  },
});
