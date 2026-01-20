import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createOtpApi, verifyOtpApi} from '@services/OtpService';
import {verfiyGoogleTokenApi} from '@services/UserService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {resetLogout, setLoggedInUser} from '@store/reducers/userSlice';
import {AsyncDeleteData} from '@utils/AsyncStorage';
import {resolveDeepLink} from '@utils/DeepLinkService';
import {useState} from 'react';

const useAuth = () => {
  const {loggedInUser} = useAppSelector(store => store.user);
  const dispatch = useAppDispatch();
  const [googleLoader, setGoogleLoader] = useState<boolean>(false);
  const {pendingDeepLink} = useAppSelector(store => store.user);

  const signInWithGoogle = async () => {
    try {
      setGoogleLoader(true);
      await GoogleSignin.hasPlayServices();
      const {data, type} = await GoogleSignin.signIn();
      if (type !== 'success')
        return {sucess: false, message: 'User Cancelled', type: type};
      const userInfo = await verfiyGoogleTokenApi(data.idToken!);
      setGoogleLoader(false);
      return userInfo;
    } catch (error) {
      setGoogleLoader(false);
      console.error(error);
      throw error;
    }
  };

  const handleLogout = async (navigation: any) => {
    try {
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthScreen'}],
      });

      if (GoogleSignin.getCurrentUser()) {
        await GoogleSignin.signOut();
      }
      dispatch(setLoggedInUser(null));
      await AsyncDeleteData();
      dispatch(resetLogout());
    } catch (err) {
      console.error(err);
    }
  };

  const checkProfileCompletion = (
    navigation: any,
    currentUser = loggedInUser,
  ) => {
    if (!currentUser) return;

    if (currentUser.name === '' || !currentUser.name) {
      return navigation.reset({
        index: 0,
        routes: [{name: 'SignUpScreen'}],
      });
    }

    if (currentUser.isEmailVerified === false) {
      return navigation.reset({
        index: 0,
        routes: [{name: 'EmailVerificationScreen'}],
      });
    }

    if (currentUser.location?.coordinates.length !== 2) {
      return navigation.reset({
        index: 0,
        routes: [{name: 'CompleteProfileScreen', params: {user: currentUser}}],
      });
    }

    if (pendingDeepLink) {
      return resolveDeepLink({
        dispatch,
        navigation,
        openingFrom: 'pending',
        url: pendingDeepLink,
      });
    }

    navigation.reset({
      index: 0,
      routes: [{name: 'Main', params: {screen: 'Home'}}],
    });
  };
  const sendEmailOtp = async () => {
    const result = await createOtpApi(loggedInUser!);
    return result;
  };

  const verifyEmailOtp = async (otpCode: string) => {
    const result = await verifyOtpApi({
      code: otpCode,
      userId: loggedInUser!._id,
    });
    console.log('RESULT OTP USEAUTH', result);
    return result;
  };
  return {
    signInWithGoogle,
    checkProfileCompletion,
    sendEmailOtp,
    verifyEmailOtp,
    handleLogout,
    googleLoader,
  };
};

export default useAuth;
