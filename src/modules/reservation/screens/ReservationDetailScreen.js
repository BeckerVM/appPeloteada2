import React, {useEffect, useState} from 'react';
import moment from 'moment/min/moment-with-locales';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Spacing} from '../../../styles';

import HeaderReservationDetail from '../components/header-reservation-detail/HeaderReservationDetail';
import ContentDetail from '../components/content-detail/ContentDetail';
import FormNumber from '../components/form-number/FormNumber';

const ReservationDetailScreen = ({route}) => {
  const [detail, setDetail] = useState({
    nameField: '',
    nameBusiness: '',
    date: '',
    hourInitial: '',
    valueInitial: 0,
    hourFinal: '',
    valueFinal: 0,
    dayPrice: 0,
    nightPrice: 0,
    size: 0,
    totalPrice: 0,
    payment: 'En el local',
    imgUrl: ''
  });

  useEffect(() => {
    const {data} = route.params;

    let formatedDate = moment(
      `${data.year.slice(0, 4)}-${data.monthN}-${data.dayN}`,
      'YYYY-MM-DD',
    ).format('YYYY/MM/DD');

    const updateData = {
      businessId: data.idBusiness,
      fieldId: data._id,
      date: formatedDate,
      hourInitial: data.valueInitial.toString().includes('.5')
        ? data.valueInitial.toString().replace('.5', ':30')
        : data.valueInitial.toString() + ':00',
      valueInitial: data.valueInitial,
      hourFinal: data.valueFinal.toString().includes('.5')
        ? data.valueFinal.toString().replace('.5', ':30')
        : data.valueFinal.toString() + ':00',
      valueFinal: data.valueFinal,
      dayPrice: data.discount > 0 ? data.discountDayPrice : data.dayPrice,
      nightPrice: data.discount > 0 ? data.discountNightPrice : data.nightPrice,
      size: data.size,
      nameBusiness: data.nameBusiness,
      nameField: data.name,
      imgUrl: data.profileUrl
    };

    if(data.valueInitial < 18 && data.valueFinal <= 18) {
      updateData.totalPrice = (data.valueFinal - data.valueInitial) * updateData.dayPrice
    }

    if(data.valueInitial >= 18 && data.valueFinal > 18) {
      updateData.totalPrice = (data.valueFinal - data.valueInitial) * updateData.nightPrice
    }

    if(data.valueInitial < 18 && data.valueFinal > 18) {
      updateData.totalPrice  = ((18 - data.valueInitial) * updateData.dayPrice) + ((data.valueFinal - 18) * updateData.nightPrice)
    }

    setDetail({
      ...detail,
      ...updateData
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.colorWhite}}>
      <HeaderReservationDetail
        nameBusiness={detail.nameBusiness}
        nameField={detail.nameField}
        sizeField={detail.size}
        imageField={detail.imgUrl}
      />
      <View style={styles.containerDetail}>
        <ContentDetail detail={{...detail}} />
        <ScrollView
          style={{...Spacing.marginTopSm, paddingHorizontal: wp(10),}}
          showsVerticalScrollIndicator={false}>
          <View style={{height: hp(45), justifyContent: 'space-between'}}>
            <FormNumber detail={detail} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ReservationDetailScreen;

const styles = StyleSheet.create({
  containerDetail: {
    backgroundColor: Colors.colorWhite,
    borderTopRightRadius: wp(18),
    borderTopLeftRadius: wp(18),
    marginTop: -wp(18),
    paddingTop: wp(3),
    flex: 1,
    justifyContent: 'space-between',
  },
});
