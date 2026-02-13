import CustomText from '@components/global/CustomText';
import {AppConstants} from '@constants/AppConstants';
import useAuth from '@hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import {getLoggedInUserApi} from '@services/UserService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setLoggedInUser} from '@store/reducers/userSlice';
import {AsyncGetData} from '@utils/AsyncStorage';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {s} from 'react-native-size-matters';
import SplashScreen from 'react-native-splash-screen';
import {NavigationProps} from 'types/AppTypes';

const CustomSplashScreen = () => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(true);
  const [isAnimationCompeleted, setIsAnimationCompeleted] = useState(false);
  const {loggedInUser} = useAppSelector(store => store.user);
  const theme = useColorScheme();
  const navigation = useNavigation<NavigationProps<'CustomSplashScreen'>>();
  const {checkProfileCompletion} = useAuth();

  const backgroundSVL = useSharedValue(1000);
  const headingOpacitySVL = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: backgroundSVL.value,
    height: backgroundSVL.value,
  }));

  const headingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headingOpacitySVL.value,
  }));

  const checkAuth = async () => {
    const user = await AsyncGetData();
    if (!user) dispatch(setLoggedInUser(null));
    if (user) {
      const {data} = await getLoggedInUserApi(JSON.parse(user)._id);
      const userDetails = data.data;
      dispatch(setLoggedInUser(userDetails));
    }
    setLoader(false);
    SplashScreen.hide();
  };

  useEffect(() => {
    if (!isAnimationCompeleted) return;
    if (loader) return;
    if (loggedInUser) {
      checkProfileCompletion(navigation);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthScreen'}],
      });
    }
  }, [loggedInUser, loader, isAnimationCompeleted]);

  const onAnimationComplete = () => {
    setIsAnimationCompeleted(true);
  };

  useEffect(() => {
    checkAuth();
    backgroundSVL.value = withTiming(170, {duration: 3000}, () => {
      headingOpacitySVL.value = withTiming(1, {duration: 1000}, () => {
        runOnJS(onAnimationComplete)();
      });
    });
  }, []);

  return (
    <View style={styles.main}>
      <Animated.View style={[animatedStyle, styles.main2]} />
      <Animated.View style={[styles.logo]}>
        <Image
          source={require('@assets/images/app_logo.png')}
          style={styles.image}
        />
      </Animated.View>
      <Animated.View style={[styles.headingBox, headingAnimatedStyle]}>
        <CustomText
          style={[
            styles.headingTxt,
            {
              color: AppConstants.redColor,
            },
          ]}>
          EVENTRA
        </CustomText>
      </Animated.View>
    </View>
  );
};

export default CustomSplashScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    width: AppConstants.screenWidth,
    height: AppConstants.screenHeight,
    backgroundColor: AppConstants.white,
  },
  main2: {
    backgroundColor: AppConstants.redColor,
    top: '50%',
    left: '50%',
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
    borderRadius: AppConstants.screenHeight,
  },
  logo: {
    width: 320,
    height: 320,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
  },
  headingBox: {
    width: s(155),
    position: 'absolute',
    bottom: '2%',
    left: '50%',
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
  },
  headingTxt: {
    letterSpacing: s(3),
    fontSize: s(30),
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
