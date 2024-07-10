import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TrackPlayer, {Track, useTrackPlayerEvents,Event} from 'react-native-track-player';
const {width} = Dimensions.get('window');



const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>();

useTrackPlayerEvents([Event.PlaybackTrackChanged],async
    event=>{
        switch(event.type){
            case Event.PlaybackTrackChanged:
                const playingTrack=await
                TrackPlayer.getTrack(event.nextTrack)
                setTrack(playingTrack)
                break;
        }
    }
)
  const renderArtWork = () => {
    <View style={styles.listArtWrapper}>a
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
    <View>
      <Text>musicPlayer</Text>
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
