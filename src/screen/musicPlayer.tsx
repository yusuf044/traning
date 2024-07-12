import React, {useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {
  ControlsCenter,
  Label,
  SongsInfo,
  SongSlider,
} from '../components/atoms';
import {playListData} from '../player';
const {width} = Dimensions.get('window');

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

  // useTrackPlayerEvents([Event.PlaybackTrackChanged], async
  //     event => {
  //     switch (event.type) {
  //       case Event.PlaybackTrackChanged:
  //         const playingTrack = await TrackPlayer.getTrack(event.nextTrack)
  //         setTrack(playingTrack)
  //         break;
  //     }
  //   })
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    switch (event.type) {
      case Event.PlaybackTrackChanged:
        try {
          console.log('FirstCase ============');

          const playingTrack = await TrackPlayer.getTrack(event?.nextTrack);
          console.log(
            'FirstCase under Funcatio ============',
            event?.nextTrack,
          );
          setTrack(playingTrack);
        } catch (error) {
          console.error('Error fetching track:=======', error);
        }
        break;
    }
  });
  const renderArtWork = () => {
    {
      console.log('under renderItems===$$$$$22', track?.artwork);
    }
    <View style={styles.listArtWrapper}>
      <Label text={'hellow render'} />
      <View style={styles.albumContainer}>
        {track?.artwork && (
          <Image
            style={styles.albumArtImage}
            source={{uri: track?.artwork?.toString()}}
          />
        )}
      </View>
    </View>;
  };
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        renderItem={renderArtWork}
        data={playListData}
        keyExtractor={song => song?.id.toString()}
      />
      {console.log(
        'playListData==============playListDataplayListData1111111111',
        playListData,
      )}
      <SongsInfo track={track} />
      <SongSlider />
      <ControlsCenter />
    </View>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001d23',
  },
  listArtWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    width: 300,
    height: 300,
  },
  albumArtImage: {
    height: '100%',
    borderRadius: 4,
  },
});
