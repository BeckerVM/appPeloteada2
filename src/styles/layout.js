import {colorWhite} from './colors';
import {StatusBar} from 'react-native';

export const screenPrimary = {
  flex: 1,
  paddingTop: StatusBar.currentHeight,
};

export const screenWhite = {
  flex: 1,
  backgroundColor: colorWhite,
};

export const screenScroll = {
  paddingTop: StatusBar.currentHeight,
};
