import 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import store from './src/redux';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import StackMainNavigator from './src/routes/main-stack/MainStack';

import IconConnection from './src/assets/svg/icons/ball2.svg';

import {Colors, Spacing, Typography} from './src/styles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const WithoitConnection = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.colorWhite,
      }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <IconConnection width={wp(30)} height={wp(30)} />
      <Text
        style={{
          ...Typography.fontTextNormal,
          fontSize: wp(5),
          ...Spacing.marginTopMd,
          color: Colors.colorGray2,
        }}>
        No Hay Conexión
      </Text>
      <Text
        style={{
          ...Typography.fontTextNormal,
          textAlign: 'center',
          width: wp(70),
          ...Spacing.marginTopSm,
          color: Colors.colorGray3,
        }}>
        Verifica tu conexión a internet e intentalo otra vez
      </Text>
    </View>
  );
};

const WithConnection = () => {
  return (
    <Provider store={store}>
      <StackMainNavigator />
    </Provider>
  );
};

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    NetInfo.fetch().then((networkState) => {
      setSplash(false);
      setIsConnected(networkState.isConnected);
    });
  }, []);

  if (splash) {
    return <View style={{flex: 1, backgroundColor: '#fff'}}></View>;
  }

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {isConnected ? <WithConnection /> : <WithoitConnection />}
    </>
  );
};
export default App;
