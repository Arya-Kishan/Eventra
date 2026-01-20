import Blob3 from '@assets/blobs/blob3.svg';
import Blob4 from '@assets/blobs/blob4.svg';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import useAuth from '@hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import {loginUserApi} from '@services/UserService';
import {useAppDispatch} from '@store/hooks';
import {setLoggedInUser} from '@store/reducers/userSlice';
import {AsyncSetData} from '@utils/AsyncStorage';
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
import {s, vs} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);

  const navigation = useNavigation<NavigationProps<'SignUpScreen'>>();
  const dispathc = useAppDispatch();
  const {signInWithGoogle, googleLoader, checkProfileCompletion} = useAuth();

  const checkValidation = () => {
    let errorData = {message: '', success: true};

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

    return errorData;
  };

  const handleLogin = async (authType: 'google' | 'manual') => {
    try {
      const isValid = checkValidation();
      if (!isValid.success && authType === 'manual')
        return showToast({title: isValid.message, type: 'error'});

      authType === 'manual' && setLoader(true);

      let newUser = {email, password, authType};
      if (authType === 'google') {
        const userInfo: any = await signInWithGoogle();
        if (!userInfo?.success)
          return showToast({title: userInfo.type ?? 'Google SignIn Failed'});

        newUser = {...newUser, email: userInfo.data.email};
      }
      const {data, success} = await loginUserApi(newUser);

      if (success) {
        dispathc(setLoggedInUser(data.data));
        await AsyncSetData(data.data);
        checkProfileCompletion(navigation, data.data);
      } else {
        showToast({title: 'Invalid Credential / Try Again'});
      }
      setLoader(false);
    } catch (error) {
      showToast({title: 'Error Occured', type: 'error'});
      console.error(error);
    }
  };

  return (
    <View style={styles.safeAreaView}>
      <Blob4 width={s(700)} height={s(700)} style={styles.blob4} />
      <Blob3 width={s(600)} height={s(600)} style={styles.blob3} />

      <View style={styles.container}>
        <View>
          <CustomText
            variant="h1"
            style={{color: AppConstants.whiteColor, fontSize: s(40)}}>
            Welcome
          </CustomText>
          <CustomText style={{color: AppConstants.whiteColor}}>
            Hey Good to see you again
          </CustomText>
        </View>

        <View style={styles.formBox}>
          <View style={styles.emailBox}>
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
              style={styles.input}
            />
          </View>

          <View style={styles.passwordBox}>
            {!showPassword ? (
              <TouchableOpacity
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
              style={styles.input}
            />
          </View>

          <View style={{gap: 10}}>
            <RoundedButton
              title="SIGN IN"
              onPress={() => {
                handleLogin('manual');
              }}
              disabled={loader}
              loading={loader}
            />

            <RoundedButton
              title="SIGN IN"
              onPress={() => {
                handleLogin('google');
              }}
              disabled={googleLoader}
              loading={googleLoader}
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
        </View>

        <View style={styles.elseBox}>
          <CustomText variant="h6">Don't have an account - </CustomText>
          <Pressable
            onPress={() => {
              navigation.replace('SignUpScreen');
            }}>
            <CustomText variant="h6" style={styles.txtWhite}>
              SignUp
            </CustomText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: AppConstants.screenPadding,
    gap: vs(40),
    justifyContent: 'flex-end',
  },
  blob4: {
    position: 'absolute',
    top: -s(300),
    right: -s(80),
    transform: [{rotate: '0deg'}],
  },
  blob3: {
    position: 'absolute',
    bottom: -s(220),
    left: -s(150),
    transform: [{rotate: '310deg'}],
  },
  container: {
    justifyContent: 'space-between',
    paddingTop: vs(60),
    height: '100%',
  },
  formBox: {
    gap: vs(20),
  },
  emailBox: {
    flexDirection: 'row',
    gap: s(10),
    backgroundColor: AppConstants.whiteColor,
    padding: s(10),
    borderRadius: s(12),
  },
  input: {
    flex: 1,
    fontSize: s(14),
  },
  passwordBox: {
    flexDirection: 'row',
    gap: s(10),
    backgroundColor: AppConstants.whiteColor,
    padding: s(10),
    borderRadius: s(12),
  },
  elseBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppConstants.screenPadding,
    flexDirection: 'row',
  },
  txtWhite: {
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
