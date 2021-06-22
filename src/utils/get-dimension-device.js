import {Dimensions} from 'react-native';

export default () => {
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  return {
    Width,
    Height,
  };
};
