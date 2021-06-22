import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {colorPrimary} from './colors';

export const buttonPrimary = {
  backgroundColor: colorPrimary,
  width: wp(50),
  height: wp(12),
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: wp(2),
};
