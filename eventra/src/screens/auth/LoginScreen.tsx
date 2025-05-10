import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomText from '@components/global/CustomText'
import { s, vs } from 'react-native-size-matters'
import Icon from '@components/global/Icon'
import { AppConstants } from '@constants/AppConstants'
import RoundedButton from '@components/global/RoundedButton'
import Blob3 from '@assets/blobs/blob3.svg'
import Blob4 from '@assets/blobs/blob4.svg'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from 'types/AppTypes'
import { useAppDispatch } from '@store/hooks'
import { loginUserApi } from '@services/UserService'
import { setLoggedInUser } from '@store/reducers/userSlice'
import { showToast } from '@utils/Helper'
import { AsyncSetData } from '@utils/AsyncStorage'

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);

  const { navigate } = useNavigation<NavigationProps<"SignUpScreen">>();
  const dispathc = useAppDispatch();

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  };


  const handleLogin = async () => {

    if (email.length < 1 || password.length < 1) {
      return showToast({ title: "Write Email/Password" })
    }

    if (!isValidEmail(email)) {
      return showToast({ title: "Check Your Email" })
    }

    setLoader(true);
    const newUser = { email, password };
    console.log("LOGGING USER")
    const { data, success } = await loginUserApi(newUser);
    console.log("LOGIN USER : ", data);
    if (success) {
      dispathc(setLoggedInUser(data.data));
      await AsyncSetData(data.data);
    } else {
      showToast({ title: "Invalid Credential / Try Again" })
    }
    setLoader(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: AppConstants.screenPadding, gap: vs(40), justifyContent: "flex-end" }}>

      <Blob4 width={s(700)} height={s(700)} style={{ position: "absolute", top: -s(300), right: -s(80), transform: [{ rotate: "0deg" }] }} />
      <Blob3 width={s(600)} height={s(600)} style={{ position: "absolute", bottom: -s(220), left: -s(150), transform: [{ rotate: "310deg" }] }} />

      <View style={{ justifyContent: "space-between", paddingTop: vs(60), height: "100%" }}>

        <View>
          <CustomText variant='h1' style={{ color: AppConstants.whiteColor, fontSize: s(40) }}>Welcome</CustomText>
          <CustomText style={{ color: AppConstants.whiteColor }}>Hey Good to see you again</CustomText>
        </View>

        <View style={{ gap: vs(20) }}>

          <View style={{ flexDirection: "row", gap: s(10), backgroundColor: AppConstants.whiteColor, padding: s(10), borderRadius: s(12) }}>
            <Icon icon='email' iconType='MaterialIcons' color={AppConstants.redColor} />
            <TextInput value={email} onChangeText={setEmail} placeholder='Email...' keyboardType='email-address' style={{ flex: 1, fontSize: s(14) }} />
          </View>

          <View style={{ flexDirection: "row", gap: s(10), backgroundColor: AppConstants.whiteColor, padding: s(10), borderRadius: s(12) }}>
            {
              !showPassword
                ?
                <TouchableOpacity onPress={() => { setShowPassword(true) }}>
                  <Icon icon='eye' iconType='Feather' color={AppConstants.redColor} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => { setShowPassword(false) }}>
                  <Icon icon='eye-off' iconType='Feather' color={AppConstants.redColor} />
                </TouchableOpacity>
            }
            <TextInput value={password} onChangeText={setPassword} placeholder='Password...' secureTextEntry={showPassword} style={{ flex: 1, fontSize: s(14) }} />
          </View>

          <RoundedButton title='SIGN IN' onPress={handleLogin} disabled={loader} loading={loader} />

        </View>

        <View style={{ width: "100%", justifyContent: "center", alignItems: "center", padding: AppConstants.screenPadding, flexDirection: "row" }}>
          <CustomText variant='h6'>Don't have an account, </CustomText>
          <Pressable onPress={() => { navigate("SignUpScreen") }}>
            <CustomText variant='h6' style={{ color: AppConstants.whiteColor }}>SignUp</CustomText>
          </Pressable>
        </View>

      </View>

    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})