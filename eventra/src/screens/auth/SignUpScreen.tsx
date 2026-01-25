import Blob3 from '@assets/blobs/blob3.svg';
import Blob4 from '@assets/blobs/blob4.svg';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import useAuth from '@hooks/useAuth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {createUserApi} from '@services/UserService';
import {useAppDispatch} from '@store/hooks';
import {setLoggedInUser} from '@store/reducers/userSlice';
import {AsyncGetFCMToken, AsyncSetData} from '@utils/AsyncStorage';
import {showToast} from '@utils/Helper';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

const SignUpScreen = () => {
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const {signInWithGoogle, googleLoader} = useAuth();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProps<'SignUpScreen'>>();
  const [loader, setLoader] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(googleLoader);

  const checkValidation = () => {
    let errorData = {message: '', success: true};
    if (!confirmPassword) {
      errorData = {message: 'Confirm Password not selected', success: false};
    }

    if (!email) {
      errorData = {message: 'Email Not Available', success: false};
    }

    if (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const validEmail = email ? emailRegex.test(email.trim()) : false;
      errorData = {message: 'Email Not Correct', success: validEmail};
    }

    if (!password) {
      errorData = {message: 'Password Not Available', success: false};
    }

    if (!name) {
      errorData = {message: 'Name Not Available', success: false};
    }

    return errorData;
  };

  const handleSignUp = async (type: 'manual' | 'google') => {
    try {
      if (GoogleSignin.getCurrentUser()) {
        await GoogleSignin.signOut();
      }

      const isValid = checkValidation();
      if (!isValid.success && type === 'manual')
        return showToast({title: isValid.message, type: 'error'});

      type === 'manual' ? setLoader(true) : setGoogleLoading(true);
      const FCMToken = (await AsyncGetFCMToken()) ?? '';

      let newUser: any = {
        name,
        email,
        password,
        role: 'user',
        FCMToken,
        authType: type,
        isEmailVerified: type === 'manual' ? false : true,
      };

      if (type === 'google') {
        const userInfo: any = await signInWithGoogle();
        if (!userInfo?.success) throw Error('Google SignIn Cancelled/Failed');
        newUser = {
          ...newUser,
          name: userInfo.data.name,
          email: userInfo.data.email,
        };
      }

      const {data, success, message} = await createUserApi(newUser);
      if (success) {
        await AsyncSetData(data.data);
        dispatch(setLoggedInUser(data.data));
        type === 'manual'
          ? navigation.navigate('EmailVerificationScreen', {user: data.data})
          : navigation.navigate('CompleteProfileScreen', {user: data.data});
      } else {
        showToast({title: message ?? 'Not Created, Try Again'});
      }
      setLoader(false);
      setGoogleLoading(false);
    } catch (error) {
      showToast({title: 'Error Occured', type: 'error'});
      setLoader(false);
      setGoogleLoading(false);
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Blob4 width={s(700)} height={s(700)} style={styles.blob4} />
      <Blob3 width={s(600)} height={s(600)} style={styles.blob3} />

      <View>
        <CustomText variant="h1" style={styles.title}>
          Sign Up
        </CustomText>
        <CustomText style={styles.subtitle}>Let's Join with Us</CustomText>
      </View>

      <View style={styles.inputContainer}>
        {/* NAME */}
        <View style={styles.inputRow}>
          <Icon
            icon="person"
            iconType="MaterialIcons"
            color={AppConstants.redColor}
          />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name..."
            placeholderTextColor={AppConstants.black}
            style={styles.textInput}
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputRow}>
          <Icon
            icon="email"
            iconType="MaterialIcons"
            color={AppConstants.redColor}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email..."
            placeholderTextColor={AppConstants.black}
            keyboardType="email-address"
            style={styles.textInput}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputRow}>
          {!showPassword ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setShowPassword(true);
              }}>
              <Icon
                icon="eye"
                iconType="Feather"
                color={AppConstants.redColor}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setShowPassword(false);
              }}>
              <Icon
                icon="eye-off"
                iconType="Feather"
                color={AppConstants.redColor}
              />
            </TouchableOpacity>
          )}
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password..."
            placeholderTextColor={AppConstants.black}
            secureTextEntry={showPassword}
            style={styles.textInput}
          />
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.inputRow}>
          {!showConfirmPassword ? (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setShowConfirmPassword(true);
              }}>
              <Icon
                icon="eye"
                iconType="Feather"
                color={AppConstants.redColor}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setShowConfirmPassword(false);
              }}>
              <Icon
                icon="eye-off"
                iconType="Feather"
                color={AppConstants.redColor}
              />
            </TouchableOpacity>
          )}
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password..."
            placeholderTextColor={AppConstants.black}
            secureTextEntry={showConfirmPassword}
            style={styles.textInput}
          />
        </View>
      </View>

      <View style={{gap: 10}}>
        <RoundedButton
          title="SIGN UP"
          onPress={() => {
            handleSignUp('manual');
          }}
          disabled={loader}
          loading={loader}
        />

        <RoundedButton
          title="Google Sign Up"
          onPress={() => {
            handleSignUp('google');
          }}
          disabled={googleLoading}
          loading={googleLoading}
          icon={
            <Image
              source={require('@assets/icons/google_logo.png')}
              style={{width: s(20), height: s(20)}}
            />
          }
          style={styles.googleBtn}
          textStyle={styles.googleTxt}
          showIcon={true}
          loaderColor={AppConstants.redColor}
        />
      </View>

      <View style={styles.bottomContainer}>
        <CustomText variant="h6">Already have an account - </CustomText>
        <Pressable
          onPress={() => {
            navigation.replace('LoginScreen');
          }}>
          <CustomText variant="h6" style={styles.signInText}>
            SignIn
          </CustomText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: AppConstants.screenPadding,
    gap: vs(40),
    marginTop: vs(50),
  },
  blob4: {
    position: 'absolute',
    top: -s(420),
    right: -s(80),
    transform: [{rotate: '0deg'}],
  },
  blob3: {
    position: 'absolute',
    bottom: -s(260),
    left: -s(150),
    transform: [{rotate: '310deg'}],
  },
  title: {
    color: AppConstants.whiteColor,
    fontSize: s(40),
  },
  subtitle: {
    color: AppConstants.whiteColor,
  },
  inputContainer: {
    gap: vs(20),
    marginTop: vs(30),
  },
  inputRow: {
    flexDirection: 'row',
    gap: s(10),
    backgroundColor: AppConstants.whiteColor,
    padding: s(10),
    borderRadius: s(12),
  },
  textInput: {
    flex: 1,
    fontSize: s(14),
  },
  dropdownContainer: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: AppConstants.screenPadding,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppConstants.screenPadding,
    flexDirection: 'row',
  },
  signInText: {
    color: AppConstants.whiteColor,
  },
  googleBtn: {
    flexDirection: 'row',
    gap: s(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppConstants.whiteColor,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  googleTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: AppConstants.black,
  },
});
