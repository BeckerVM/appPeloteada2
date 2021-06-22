import React from 'react';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

const FieldItem = ({data}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Business', {
          nameBusiness: data.name,
          idBusiness: data._id,
        })
      }>
      <Image style={styles.image} source={{uri: data.profileUrl}} />
      <View style={styles.back}></View>
      <Text style={styles.textName}>{data.name}</Text>
    </TouchableOpacity>
  );
};

FieldItem.propTypes = {
  data: PropTypes.object,
};

export default FieldItem;

const styles = StyleSheet.create({
  container: {
    width: wp(47),
    height: wp(30),
    ...Spacing.marginBottomSm,
    position: 'relative',
    borderRadius: wp(1.5),
  },
  textName: {
    position: 'absolute',
    ...Typography.fontTextNormal,
    bottom: wp(1),
    left: wp(2),
    color: Colors.colorWhite,
    width: wp(35)
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: wp(1.5),
  },
});
