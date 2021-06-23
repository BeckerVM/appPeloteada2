import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';

import HeaderBusiness from '../components/header-business/HeaderBusiness';
import ReservationByBusinessScreen from './ReservationByBusinessScreen';
import BusinessInfoScreen from './BusinessInfoScreen';

import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors, Typography, Spacing} from '../../../styles';

const renderTabBar = (props) => (
  <TabBar
    {...props}
    pressColor="transparent"
    indicatorStyle={{backgroundColor: Colors.colorPrimary}}
    style={{backgroundColor: Colors.colorWhite}}
    renderLabel={({route, focused}) => (
      <Text
        style={[
          {color: Colors.colorGray2, ...Typography.fontTextNormal},
          focused ? {color: Colors.colorPrimary} : null,
        ]}>
        {route.title}
      </Text>
    )}
  />
);

const BusinessScreen = ({route}) => {
  const {idBusiness, nameBusiness} = route.params;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Info'},
    {key: 'second', title: 'Reservar'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <BusinessInfoScreen idBusiness={idBusiness} />;
      case 'second':
        return (
          <ReservationByBusinessScreen
            idBusiness={idBusiness}
            nameBusiness={nameBusiness}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderBusiness />
      <View style={styles.containerDetail}>
        <View style={{alignItems: 'center', ...Spacing.marginBottomXm}}>
          <Text
            style={{
              ...Typography.fontTextNormal,
              fontSize: wp(7),
              textAlign: 'center',
              color: Colors.colorGray2,
              width: wp(70)
            }}>
            {nameBusiness}
          </Text>
          <Text
            style={{...Typography.fontTextNormal, color: Colors.colorGray2}}>
            ¿Cuándo jugamos?
          </Text>
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </View>
  );
};

export default BusinessScreen;

const styles = StyleSheet.create({
  containerDetail: {
    backgroundColor: Colors.colorWhite,
    borderTopRightRadius: wp(18),
    borderTopLeftRadius: wp(18),
    marginTop: -wp(30),
    paddingTop: wp(3),
    paddingHorizontal: wp(0),
    flex: 1,
    justifyContent: 'space-between',
  },
});
