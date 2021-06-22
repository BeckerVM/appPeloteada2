import React from 'react';
import {useStatusBar} from '../../../hooks/useStatusBar';
import {ScrollView, StyleSheet, View, StatusBar, Image} from 'react-native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Layout, Colors} from '../../../styles';

import HeaderUpdateProfile from '../components/header-update-profile/HeaderUpdateProfile';
import ProfileForm from '../components/profile-form/ProfileForm';
import ModalFormProfile from '../components/modal-form-password/ModalFormPassword';

const UpdateProfileScreen = ({route}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const {showBar} = useStatusBar();
  const {name, surname, profile} = route.params;

  return (
    <View style={{...Layout.screenWhite, backgroundColor: Colors.colorPrimary}}>
      {showBar ? (
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
      ) : null}
      <HeaderUpdateProfile />
      <View style={styles.containerIcon}>
        <Image
          source={{
            uri:
              profile,
          }}
          style={{width: wp(35), height: wp(35), borderRadius: wp(100)}}
        />
      </View>
      <ModalFormProfile
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{paddingTop: wp(35)}}>
          <ProfileForm
            data={{name, surname}}
            setModalVisible={setModalVisible}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorWhite,
    borderTopRightRadius: wp(18),
    borderTopLeftRadius: wp(18),
    marginTop: -wp(32),
    flex: 1,
  },
  containerIcon: {
    backgroundColor: Colors.colorWhite,
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: wp(17),
    zIndex: 1,
    borderWidth: wp(.5),
    borderColor: Colors.colorWhite
  },
});
