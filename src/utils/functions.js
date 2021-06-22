import {Linking} from 'react-native';

export const linkinApp = async (url) => {
  try {
    await Linking.openURL(url);
  } catch (error) {}
};
