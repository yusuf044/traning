import {Track} from 'react-native-track-player';

export const playListData: Track[] = [
  {
    id: 1,
    title: 'Maan Meri Jaan',
    artist: 'King',
    album: 'Champagne Talk',
    artwork:
      'https://c.saavncdn.com/734/Champagne-Talk-Hindi-2022-20221008011951-500x500. jpg',
    url: require('./assets/audio/AkhiyaanGulaab.mp3'),
    img: 'data:image/jpeg;base64,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',
  },

  {
    id: 2,
    title: 'loveYA',
    artist: 'Diljeet',
    album: 'Champagne Talk',
    artwork:
      'https://c.saavncdn.com/734/Champagne-Talk-Hindi-2022-20221008011951-500x500. jpg',
    url: require('./assets/audio/loveYA.mp3'),
    img: 'data:image/jpeg;base64,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',
  },
  {
    id: 3,
    title: 'GONOFF',
    artist: 'jatt',
    album: 'Champagne Talk',
    artwork:
      'https://c.saavncdn.com/734/Champagne-Talk-Hindi-2022-20221008011951-500x500. jpg',
    url: require('./assets/audio/GONOFF.mp3'),
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb9W2W4Aw5djcC2Z07LjY2wyO_fsLX1MUpFQ&s',
  },
];
