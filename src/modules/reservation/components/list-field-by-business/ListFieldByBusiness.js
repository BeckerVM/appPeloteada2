import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import ItemField from '../item-field/ItemField';

const ListFieldByBusiness = ({
  selectedDate,
  fieldsByBusiness,
  nameBusiness,
  idBusiness,
}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{paddingHorizontal: wp(3)}}>
      <View style={styles.container}>
        {fieldsByBusiness.map((f, index) => (
          <ItemField
            resize={true}
            noMargin={false}
            key={f._id}
            idBusiness={idBusiness}
            nameBusiness={nameBusiness}
            selectedDate={selectedDate}
            data={f}
            index={index}
            noMarginRight={index === fieldsByBusiness.length - 1 ? true : false}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ListFieldByBusiness;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingVertical: wp(2),
    paddingBottom: wp(4),
  },
});
