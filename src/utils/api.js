import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'https://api.peloteada.com/api';

export const authHeader = async function () {
  const token = JSON.parse(await AsyncStorage.getItem('authToken'));

  if (token) {
    const Authorization = `Bearer ${token}`;
    return {
      Authorization,
    };
  } else {
    return {};
  }
};
