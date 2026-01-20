import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getLoggedInUserApi} from '@services/UserService';
import {setLoggedInUser} from '@store/reducers/userSlice';
import {AsyncGetData} from '@utils/AsyncStorage';
import SplashScreen from 'react-native-splash-screen';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from 'types/AppTypes';
import {AppConstants} from '@constants/AppConstants';
import {s} from 'react-native-size-matters';
import useAuth from '@hooks/useAuth';

const CustomSplashScreen = () => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(true);
  const {loggedInUser} = useAppSelector(store => store.user);
  const navigation = useNavigation<NavigationProps<'CustomSplashScreen'>>();
  const {checkProfileCompletion} = useAuth();

  console.log('USER DETAILS', loggedInUser);

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
    if (loader) return;
    if (loggedInUser) {
      checkProfileCompletion(navigation);
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthScreen'}],
      });
    }
  }, [loggedInUser, loader]);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={styles.main}>
      <Image
        source={require('@assets/images/app_logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default CustomSplashScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppConstants.redColor,
  },
  logo: {
    width: AppConstants.screenWidth,
    height: AppConstants.screenWidth,
  },
});
