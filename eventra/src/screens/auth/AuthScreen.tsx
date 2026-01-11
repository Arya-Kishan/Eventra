import Blob1 from '@assets/blobs/blob1.svg';
import Svg from '@assets/images/auth2.svg';
import CustomText from '@components/global/CustomText';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

const AuthScreen = () => {
  const {navigate} = useNavigation<NavigationProps<'AuthScreen'>>();

  return (
    <View style={styles.safeAreaView}>
      <Blob1 width={s(800)} height={s(800)} style={styles.blob1} />

      <View style={styles.svg1}>
        <Svg width={s(300)} height={s(300)} />
      </View>

      <View style={styles.header}>
        <CustomText variant="h1" style={styles.headerTxt}>
          Eventra
        </CustomText>
      </View>

      <View style={styles.contentBox}>
        <CustomText variant="h3" style={styles.bookingTxt}>
          Make your Booking
        </CustomText>

        <CustomText numberOfLines={2} style={styles.description}>
          All over the India made and enjoy the event make for equal to all
          party
        </CustomText>

        <View style={styles.btnBox}>
          <RoundedButton
            style={styles.btn1}
            onPress={() => {
              navigate('LoginScreen');
            }}
            title="LOGIN"
          />
          <RoundedButton
            style={styles.btn}
            textColor={AppConstants.redColor}
            onPress={() => {
              navigate('SignUpScreen');
            }}
            title="SIGNUP"
          />
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  safeAreaView: {flex: 1},
  blob1: {
    position: 'absolute',
    bottom: -s(200),
    left: -s(150),
  },
  svg1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: vs(100),
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppConstants.screenPadding,
    gap: s(10),
  },
  headerTxt: {
    color: AppConstants.redColor,
    fontSize: s(40),
  },
  contentBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppConstants.screenPadding,
    gap: s(10),
  },
  description: {
    textAlign: 'center',
    color: AppConstants.whiteColor,
  },
  bookingTxt: {color: AppConstants.whiteColor},
  btnBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: s(10),
    marginTop: vs(20),
  },
  btn1: {
    width: s(140),
  },
  btn: {
    backgroundColor: AppConstants.whiteColor,
    borderWidth: 2,
    borderColor: AppConstants.redColor,
    width: s(140),
  },
  btnTxt: {
    color: AppConstants.redColor,
  },
});
