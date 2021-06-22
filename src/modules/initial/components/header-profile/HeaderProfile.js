import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import Player from '../../../../assets/svg/designs/player.svg';
import Player2 from '../../../../assets/svg/icons/foot.svg';

const HeaderProfile = function ({user, isLoggedIn}) {
  const showAlert = () => {
    Alert.alert('Próximante', 'Apóyanos para poder seguir mejorando la app.')
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.containerTextTop}>
          <Text style={styles.headerTextTop}>
            {isLoggedIn ? '¡Hola ' + user.name.split(' ')[0] : '¡Hola'}!
          </Text>
          <Text
            style={[
              styles.headerTextTop,
              {...Typography.fontTextSemiBold, fontSize: wp(5)},
            ]}>
            ¿Qué hacemos hoy?
          </Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <TouchableOpacity style={styles.containerOption} onPress={showAlert}>
          <Player2 height={wp(20)} width={wp(20)}/>
          <Text style={styles.headerTextBottom}>Recomen_dar una cancha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerOption} onPress={showAlert}>
          <Text style={styles.headerTextBottom}>Nuestros productos deportivos</Text>
          <Player height={wp(20)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

HeaderProfile.propTypes = {
  user: PropTypes.object,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {isLoggedIn, user} = state.auth;

  return {
    isLoggedIn,
    user,
  };
};

export default connect(mapStateToProps)(HeaderProfile);

const styles = StyleSheet.create({
  container: {
    ...Spacing.paddingVerticalXm,
    paddingBottom: wp(2),
    borderBottomWidth: wp(.1),
    borderBottomColor: Colors.colorGray
  },
  image: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(100),
    resizeMode: 'cover',
    ...Spacing.marginRightXm,
  },
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Spacing.marginBottomSm,
    justifyContent: 'center'
  },
  headerTextTop: {...Typography.fontTextNormal, color: Colors.colorGray2, textAlign: 'center'},
  containerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerOption: {
    borderWidth: wp(0.2),
    borderColor: Colors.colorGray,
    flexDirection: 'row',
    width: wp(47),
    ...Spacing.paddingXm,
    alignItems: 'center',
    borderRadius: wp(2),
    justifyContent: 'space-between',
  },
  headerTextBottom: {
    width: wp(25),
    ...Typography.fontTextNormal,
    color: Colors.colorGray2,
    textAlign: 'center',
  },
});
