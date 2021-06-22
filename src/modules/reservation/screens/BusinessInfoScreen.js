import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, Typography, Spacing} from '../../../styles';

import IconI from '../../../assets/svg/icons/i.svg';
import IconPhone from '../../../assets/svg/icons/phone.svg';
import BtnOption from '../components/btn-item-option/BtnOption';

import {getBusinessInfo} from '../../../redux/actions/reservationActions';

const BusinessInfoScreen = ({idBusiness, dispatch, businessInfo, loaded2}) => {
  useEffect(() => {
    dispatch(getBusinessInfo(idBusiness));
  }, []);

  return loaded2 || businessInfo.description === '' ? (
    <View style={styles.containerLoading}>
      <LottieView
        source={require('../../../assets/animations/player.json')}
        autoPlay
        loop
        style={{width: wp(40), height: wp(40)}}
      />
    </View>
  ) : (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.tag}>
        <Text style={{...Typography.fontTextNormal, fontSize: wp(3)}}>
          <View
            style={{
              backgroundColor: Colors.colorSecondary,
              borderRadius: wp(100),
            }}>
            <IconI width={wp(4)} height={wp(4)} />
          </View>{' '}
          {businessInfo.courts} Cancha(s)
        </Text>
      </View>
      <Text style={styles.textDescription}>{businessInfo.description}</Text>
      <View style={styles.containerContent}>
        <Text style={styles.textTitle}>Dirección</Text>
        <Text style={styles.textContent}>{businessInfo.address}</Text>
      </View>
      <View style={[styles.containerContent, {marginBottom: 0}]}>
        <Text style={styles.textTitle}>Teléfono</Text>
        {businessInfo.phones.map((ph) => (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${ph}`);
            }}
            key={ph}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              ...Spacing.marginBottomXm,
            }}>
            <Text style={styles.textContent}>{ph}</Text>
            <View
              style={{
                backgroundColor: Colors.colorPrimary,
                ...Spacing.paddingXm,
                borderRadius: wp(100),
              }}>
              <IconPhone width={wp(4)} height={wp(4)} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{...Spacing.marginBottomXm}}>
        <Text style={styles.textTitle}>Deportes</Text>
        <View>
          <BtnOption data={{title: 'Futbol'}} />
        </View>
      </View>
      <View style={{...Spacing.marginBottomLg}}>
        <Text style={styles.textTitle}>Servicio</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={businessInfo.services}
          keyExtractor={(item) => item}
          renderItem={({item}) => <BtnOption data={{title: item}} />}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const {businessInfo} = state.reservation;
  const {loaded2} = state.loading;

  return {
    businessInfo,
    loaded2,
  };
};

export default connect(mapStateToProps)(BusinessInfoScreen);

const styles = StyleSheet.create({
  container: {
    padding: wp(3.5),
    paddingHorizontal: wp(3.5),
  },
  tag: {
    width: wp(28),
    height: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(2),
    alignSelf: 'flex-end',
    borderWidth: wp(0.2),
    borderColor: Colors.colorGray,
    ...Spacing.marginBottomXm,
  },
  textDescription: {
    ...Typography.fontTextNormal,
    textAlign: 'justify',
    ...Spacing.marginBottomXm,
  },
  textTitle: {
    color: Colors.colorPrimary,
    ...Typography.fontTextNormal,
  },
  textContent: {
    ...Typography.fontTextNormal,
  },
  containerContent: {
    ...Spacing.marginBottomXm,
  },
  btnOption: {
    width: wp(25),
    height: wp(30),
    borderColor: Colors.colorGray,
    borderWidth: wp(0.2),
    borderRadius: wp(2),
  },
  containerOptions: {
    flexDirection: 'row',
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
