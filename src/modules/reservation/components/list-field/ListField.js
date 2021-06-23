import React from 'react';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Typography, Colors} from '../../../../styles';

import ItemField from '../item-field/ItemField';

const ListField = ({data, noMargin, selectedDate}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, noMargin ? {paddingBottom: wp(5)} : null]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Business', {
            nameBusiness: data.name,
            idBusiness: data._id,
          })
        }>
        <Text style={styles.textTitle}>{data.name} </Text>
      </TouchableOpacity>

      <Text style={styles.textAddress}>{data.address}</Text>
      <Text style={styles.subTitle}>
        {data.count} {data.count > '1' ? 'Canchas' : 'Cancha'} disponible(s)
      </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data.courts}
        keyExtractor={(item) => item._id}
        renderItem={({item, index}) => (
          <ItemField
            idBusiness={data._id}
            nameBusiness={data.name}
            selectedDate={selectedDate}
            data={item}
            index={index}
            noMarginRight={index === data.courts.length - 1 ? true : false}
          />
        )}
      />
    </View>
  );
};

ListField.propTypes = {
  data: PropTypes.object,
  noMargin: PropTypes.bool,
  selectedDate: PropTypes.object,
};

export default ListField;

const styles = StyleSheet.create({
  container: {
    marginBottom: wp(2),
    paddingHorizontal: wp(4.5),
  },
  textTitle: {
    ...Typography.fontTextNormal,
    color: Colors.colorPrimary,
    fontSize: wp(4),
  },
  textAddress: {
    ...Typography.fontTextNormal,
    color: Colors.colorGray2,
  },
  subTitle: {
    ...Typography.fontTextNormal,
    fontSize: wp(3.3),
    color: Colors.colorSecondary,
  },
});
