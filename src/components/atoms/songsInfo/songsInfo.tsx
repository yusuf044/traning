import {StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Track} from 'react-native-track-player';
import Label from '../label';
type SongsInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;
const SongsInfo = ({track}: SongsInfoProps) => {
  return (
    <View style={styles.contiouner}>
      <View>
        <Label
          style={styles.name}
          size="xxl"
          weight={'800'}
          text={track?.title}
        />

        <Text style={styles.artiest}>
          {track?.title} . {track?.album}
        </Text>
      </View>
    </View>
  );
};

export default SongsInfo;

const styles = StyleSheet.create({
  name: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#FFF',
  },
  artiest: {
    color: '#d9d9d9',
    textAlign: 'center',
  },
  contiouner: {
    width: '90%',
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
});
