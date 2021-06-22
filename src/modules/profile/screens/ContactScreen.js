import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Layout, Colors, Typography} from '../../../styles';

import IconFacebook from '../../../assets/svg/icons/facebook.svg';
import IconInstagram from '../../../assets/svg/icons/instagram.svg';
import IconWpp from '../../../assets/svg/icons/whatsapp.svg';

import {CONTACT_NUMBER, FACEBOOK_ID} from '../../../utils/constants';
import {linkinApp} from '../../../utils/functions';

const ContactScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <View style={styles.contentTop}>
        <ImageBackground
          style={styles.image}
          source={{
            uri:
              'https://www.ledgerinsights.com/wp-content/uploads/2020/01/football-soccer-810x476.jpg',
          }}>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, .3)',
            }}>
            <Text style={[styles.text, styles.textTitle]}>Contáctanos</Text>
            <Text style={[styles.text, styles.textSub, {marginBottom: wp(15)}]}>
              Estamos aquí para ayudarte
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.subcontentTop}>
          <TouchableOpacity
            onPress={() => {
              let url = 'fb://page/' + FACEBOOK_ID;
              linkinApp(url);
            }}
            style={[styles.btn, styles.btn1]}>
            <IconFacebook width={wp(7)} height={wp(7)} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btn2]}>
            <IconInstagram width={wp(7)} height={wp(7)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btn3]}
            onPress={() => {
              let url =
                'whatsapp://send?text=' + '' + '&phone=51' + CONTACT_NUMBER;
              linkinApp(url);
            }}>
            <IconWpp width={wp(7)} height={wp(7)} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentMid}>
        <Text
          style={{
            ...Typography.fontTextNormal,
            textAlign: 'justify',
            width: wp(80),
            color: Colors.colorGray2,
          }}>
          Si tienes alguna duda o consulta, nuestro equipo especializado siempre estará
          encantado de poder ayudarte. No dudes en contáctarnos por nuestras redes
          sociales y nos aseguraremos de responderte lo más antes posible.
        </Text>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}>
          <Text
            style={{...Typography.fontTextNormal, color: Colors.colorWhite}}>
            Regresar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  screen: {
    ...Layout.screenWhite,
    alignItems: 'center',
    justifyContent: 'space-around',
    ...Layout.screenScroll,
  },
  contentTop: {
    width: wp(90),
  },
  subcontentTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp(-6.5),
  },
  image: {
    width: '100%',
    height: wp(80),
    borderRadius: wp(4),
    overflow: 'hidden',
    position: 'relative',
  },
  text: {
    color: Colors.colorWhite,
    ...Typography.fontTextNormal,
  },
  textTitle: {
    fontSize: wp(7),
  },
  textSub: {
    fontSize: wp(4.5),
  },
  btn: {
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  btn1: {
    backgroundColor: '#3b5998',
  },
  btn2: {
    backgroundColor: '#e1306c',
    marginHorizontal: wp(4),
  },
  btn3: {
    backgroundColor: '#1bd741',
  },
  buttonBack: {
    backgroundColor: Colors.colorPrimary,
    width: wp(70),
    height: wp(15),
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
