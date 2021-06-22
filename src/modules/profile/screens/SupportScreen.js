import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Layout, Colors, Typography, Spacing} from '../../../styles';

import IconFacebook from '../../../assets/svg/icons/facebook.svg';
import IconInstagram from '../../../assets/svg/icons/instagram.svg';
import IconWpp from '../../../assets/svg/icons/whatsapp.svg';

import {CONTACT_NUMBER, FACEBOOK_ID} from '../../../utils/constants';
import {linkinApp} from '../../../utils/functions';

const SupportScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <View>
        <Text style={{...Typography.fontTextNormal}}>
          Apóyanos para seguir creciendo
        </Text>
        <TouchableOpacity
          style={{alignSelf: 'center', ...Spacing.marginTopSm}}
          onPress={() => navigation.goBack()}></TouchableOpacity>
      </View>

      <View style={{...Spacing.marginTopMd}}>
        <View style={{padding: wp(4)}}>
          <Image
            source={{
              uri:
                'https://bucket-peloteada.s3.sa-east-1.amazonaws.com/public/yape.jpeg',
            }}
            style={{
              width: wp(50),
              height: wp(50),
              alignSelf: 'center',
              ...Spacing.marginTopXm,
            }}
          />
        </View>
        <Image
          source={{uri: 'https://www.yape.com.pe/assets/images/logo.png'}}
          style={{
            width: wp(20.4),
            height: wp(25.2),
            alignSelf: 'center',
            ...Spacing.marginTopXm,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            ...Typography.fontTextNormal,
            textAlign: 'center',
            ...Spacing.paddingHorizontalXm,
            ...Spacing.marginTopMd,
          }}>
          Gracias por tu apoyo
        </Text>
        <Text
          style={{
            ...Typography.fontTextNormal,
            textAlign: 'center',
            ...Spacing.paddingHorizontalXm,
            ...Spacing.marginTopSm,
          }}>
          Somos @Devinn, nos dedicamos al desarrollo de software y aplicaciones
          móviles
        </Text>
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
            onPress={() => {
              let url =
                'whatsapp://send?text=' + '' + '&phone=51' + CONTACT_NUMBER;
              linkinApp(url);
            }}
            style={[styles.btn, styles.btn3]}>
            <IconWpp width={wp(7)} height={wp(7)} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            ...Typography.fontTextNormal,
            color: Colors.colorGray3,
            textAlign: 'center',
            ...Spacing.marginTopSm,
            borderBottomWidth: wp(0.2),
            borderColor: Colors.colorGray3,
            width: wp(20),
            alignSelf: 'center',
            paddingBottom: wp(0.5),
          }}>
          Síguenos
        </Text>
      </View>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  screen: {
    ...Layout.screenWhite,
    alignItems: 'center',
    justifyContent: 'space-around',
    ...Layout.screenScroll,
  },
  subcontentTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...Spacing.marginTopSm,
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
});
