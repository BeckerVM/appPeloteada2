import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

const ContentDetail = ({detail}) => {
  return (
    <View style={{ paddingHorizontal: wp(10),}}>
      <Text style={styles.title}>Detalle</Text>
      <View style={styles.containerText}> 
        <Text style={[styles.text]}>Fecha:</Text>
        <Text style={styles.text2}>{detail.date.split("-").reverse().join("-")}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={[styles.text]}>Hora:</Text>
        <Text style={styles.text2}>{detail.hourInitial} a {detail.hourFinal}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={[styles.text]}>Precios (día y noche):</Text>
        <Text style={styles.text2}>S/. {detail.dayPrice.toFixed(2)} y {detail.nightPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={[styles.text]}>Método de pago:</Text>
        <Text style={styles.text2}>{detail.payment}</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={[styles.text, { ...Typography.fontTextSemiBold}]}>Precio Total:</Text>
        <Text style={styles.text2}>S/. {detail.totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  )
}

ContentDetail.propTypes = {
  detail: PropTypes.object
}

export default ContentDetail

const styles = StyleSheet.create({
  title: {
    color: Colors.colorPrimary,
    ...Typography.fontTextNormal,
    fontSize: wp(4.5),
    ...Spacing.marginBottomXm
  },
  containerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp(1)
  },
  text: {
    ...Typography.fontTextNormal
  },
  text2: {
    ...Typography.fontTextNormal,
  
  }
})
