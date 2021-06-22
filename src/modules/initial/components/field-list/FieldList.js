import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import FieldItem from '../field-item/FieldItem';

const FieldList = ({data, loaded}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Los más POPULARES</Text>
      {data.length > 0 && loaded === false ? (
        <View>
          <View style={styles.list}>
            {data.map((
              b, //negocios
            ) => (
              <FieldItem key={b._id} data={b} />
            ))}
          </View>
        </View>
      ) : null}
      {loaded ? (
        <Text
          style={{
            textAlign: 'center',
            ...Typography.fontTextNormal,
            color: Colors.colorGray2,
            fontSize: wp(3.8),
          }}>
          Cargando...
        </Text>
      ) : null}
      {loaded === false && data.length === 0 ? (
        <Text
          style={{
            textAlign: 'center',
            ...Typography.fontTextNormal,
            color: Colors.colorGray2,
            fontSize: wp(3.8),
          }}>
          No hay negocios registrados
        </Text>
      ) : null}
    </View>
  );
};

FieldList.propTypes = {
  data: PropTypes.array,
  loaded: PropTypes.bool,
};

export default FieldList;

const styles = StyleSheet.create({
  container: {
    marginTop: wp(3),
  },
  textTitle: {
    ...Typography.fontTextNormal,
    color: Colors.colorGray2,
    ...Spacing.marginBottomXm,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
