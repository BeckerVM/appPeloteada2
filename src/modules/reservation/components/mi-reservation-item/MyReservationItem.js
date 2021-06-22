import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Spacing, Typography, Colors} from '../../../../styles';

import IconCalendar from '../../../../assets/svg/icons/calendar3.svg';
import IconCronometer from '../../../../assets/svg/icons/cronometer.svg';

const MyReservationItem = ({data, index}) => {
  return (
    <View
      style={[styles.container, index === 0 ? {marginTop: wp(4)} : null]}>
      <Image
        style={styles.image}
        source={{
          uri: data.court.profileUrl,
        }}
      />
      <View
        style={{
          flex: 1,
          borderLeftWidth: wp(0.2),
          borderColor: Colors.colorGray,
          paddingLeft: wp(2),
        }}>
        <Text style={styles.text}>
          {data.business.name} . {data.court.name} . {data.court.size} vs{' '}
          {data.court.size}
        </Text>
        <Text
          style={[
            {color: Colors.colorGray2, marginBottom: wp(1)},
            styles.text2,
          ]}>
          {data.business.address}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.containerInfo}>
            <IconCalendar
              width={wp(5)}
              height={wp(5)}
              style={{marginRight: wp(1)}}
            />
            <Text style={styles.text2}>{data.day.split('T')[0]}</Text>
          </View>
          <View style={styles.containerInfo}>
            <IconCronometer
              width={wp(5)}
              height={wp(5)}
              style={{marginRight: wp(1)}}
            />
            <Text style={styles.text2}>
              {data.hour.toString().includes('.5')
                ? data.hour.toString().replace('.5', ':30')
                : `${data.hour}:00`}{' '}
              a{' '}
              {(data.hour + data.time / 60).toString().includes('.5')
                ? (data.hour + data.time / 60).toString().replace('.5', ':30')
                : `${(data.hour + data.time / 60).toString()}:00`}
            </Text>
          </View>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            ...Typography.fontTextNormal,
            fontSize: wp(3.5),
            ...Spacing.marginTopXm,
            color:
              data.records[data.records.length - 1].status === 'expired' ||
              data.records[data.records.length - 1].status === 'cancelled'
                ? 'crimson'
                : data.records[data.records.length - 1].status === 'pending'
                ? '#FFBF00'
                : Colors.colorSecondary,
          }}>
          {data.records[data.records.length - 1].status === 'expired'
            ? 'Expirado'
            : null}
          {data.records[data.records.length - 1].status === 'pending'
            ? 'Pendiente'
            : null}
          {data.records[data.records.length - 1].status === 'confirmed'
            ? 'Completado'
            : null}
          {data.records[data.records.length - 1].status === 'cancelled'
            ? 'Cancelado'
            : null}
        </Text>
      </View>
    </View>
  );
};

MyReservationItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
};

export default MyReservationItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: wp(0.2),
    borderRadius: wp(2),
    borderColor: Colors.colorGray,
    flexDirection: 'row',
    ...Spacing.paddingXm,
    alignItems: 'center',
    ...Spacing.marginBottomSm,
  },
  image: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(1),
    ...Spacing.marginRightXm,
  },
  text: {
    ...Typography.fontTextNormal,
    fontSize: wp(3.8),
    color: Colors.colorPrimary,
    width: wp(60),
    textAlign: 'center',
    width: wp(55),
  },
  text2: {
    ...Typography.fontTextNormal,
    fontSize: wp(3.5),
    ...Spacing.marginTopXm,
    textAlign: 'center',
  },
  containerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Spacing.marginTopXm,
  },
});
