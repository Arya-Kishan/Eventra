import Blob3 from '@assets/blobs/blob3.svg';
import Blob4 from '@assets/blobs/blob4.svg';
import CustomText from '@components/global/CustomText';
import DropdownExample from '@components/global/DropdownExample';
import Icon from '@components/global/Icon';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {createUserApi} from '@services/UserService';
import {useAppDispatch} from '@store/hooks';
import {setLoggedInUser} from '@store/reducers/userSlice';
import {AsyncGetFCMToken, AsyncSetData} from '@utils/AsyncStorage';
import {showToast} from '@utils/Helper';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

const SignUpScreen = () => {
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {navigate} = useNavigation<NavigationProps<'SignUpScreen'>>();
  const dispathc = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const handleSignUp = async () => {
    setLoader(true);
    const FCMToken = (await AsyncGetFCMToken()) ?? '';
    const newUser = {name, email, password, role, FCMToken};
    console.log('CREATING NEW USER');
    const {data, success} = await createUserApi(newUser);
    console.log('NEW USER : ', data.data);
    if (success) {
      dispathc(setLoggedInUser(data.data));
      await AsyncSetData(data.data);
    } else {
      showToast({title: 'Not Created, Try Again'});
    }
    setLoader(false);
  };

  return (
    <View style={styles.safeAreaView}>
      <Blob4 width={s(700)} height={s(700)} style={styles.blob4} />
      <Blob3 width={s(600)} height={s(600)} style={styles.blob3} />

      <View>
        <CustomText variant="h1" style={styles.title}>
          Sign Up
        </CustomText>
        <CustomText style={styles.subtitle}>Let's Join with Us</CustomText>
      </View>

      <View style={styles.inputContainer}>
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

        <View style={styles.inputRow}>
          <Icon
            icon="shield"
            iconType="Feather"
            color={AppConstants.redColor}
          />
          <View style={styles.dropdownContainer}>
            <DropdownExample
              dataArr={[
                {label: 'User', value: 'user'},
                {label: 'Admin', value: 'admin'},
                {label: 'Organiser', value: 'organiser'},
              ]}
              onChange={(val: string) => {
                setRole(val);
              }}
              placeholder="Select Role"
            />
          </View>
        </View>
      </View>

      <RoundedButton
        title="SIGN UP"
        onPress={handleSignUp}
        disabled={loader}
        loading={loader}
      />

      <View style={styles.bottomContainer}>
        <CustomText variant="h6">Already have an account - </CustomText>
        <Pressable
          onPress={() => {
            navigate('LoginScreen');
          }}>
          <CustomText variant="h6" style={styles.signInText}>
            SignIn
          </CustomText>
        </Pressable>
      </View>
    </View>
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
});
