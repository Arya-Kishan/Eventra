import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomText from '@components/global/CustomText'
import { s, vs } from 'react-native-size-matters'
import Icon from '@components/global/Icon'
import { AppConstants } from '@constants/AppConstants'
import RoundedButton from '@components/global/RoundedButton'
import Blob3 from '@assets/blobs/blob3.svg'
import Blob4 from '@assets/blobs/blob4.svg'
import DropdownExample from '@components/global/DropdownExample'
import { createUserApi } from '@services/UserService'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from 'types/AppTypes'
import { useAppDispatch } from '@store/hooks'
import { setLoggedInUser } from '@store/reducers/userSlice'
import { showToast } from '@utils/Helper'
import { AsyncSetData } from '@utils/AsyncStorage'

const SignUpScreen = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { navigate } = useNavigation<NavigationProps<"SignUpScreen">>();
  const dispathc = useAppDispatch();
  const [loader, setLoader] = useState(false);

  const handleSignUp = async () => {

    setLoader(true);
    const newUser = { name, email, password, role };
    console.log("CREATING NEW USER")
    const { data, success } = await createUserApi(newUser);
    console.log("NEW USER : ", data.data);
    if (success) {
      dispathc(setLoggedInUser(data.data));
      await AsyncSetData(data.data);
    } else {
      showToast({ title: "Not Created, Try Again" })
    }
    setLoader(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: AppConstants.screenPadding, gap: vs(40), marginTop: vs(50) }}>

      <Blob4 width={s(700)} height={s(700)} style={{ position: "absolute", top: -s(420), right: -s(80), transform: [{ rotate: "0deg" }] }} />
      <Blob3 width={s(600)} height={s(600)} style={{ position: "absolute", bottom: -s(260), left: -s(150), transform: [{ rotate: "310deg" }] }} />

      <View>
        <CustomText variant='h1' style={{ color: AppConstants.whiteColor, fontSize: s(40) }}>Sign Up</CustomText>
        <CustomText style={{ color: AppConstants.whiteColor }}>Let's Join with Us</CustomText>
      </View>

      <View style={{ gap: vs(20), marginTop: vs(30) }}>

        <View style={{ flexDirection: "row", gap: s(10), backgroundColor: AppConstants.whiteColor, padding: s(10), borderRadius: s(12) }}>
          <Icon icon='person' iconType='MaterialIcons' color={AppConstants.redColor} />
          <TextInput value={name} onChangeText={setName} placeholder='Name...' style={{ flex: 1, fontSize: s(14) }} />
        </View>

        <View style={{ flexDirection: "row", gap: s(10), backgroundColor: AppConstants.whiteColor, padding: s(10), borderRadius: s(12) }}>
          <Icon icon='email' iconType='MaterialIcons' color={AppConstants.redColor} />
          <TextInput value={email} onChangeText={setEmail} placeholder='Email...' keyboardType='email-address' style={{ flex: 1, fontSize: s(14) }} />
        </View>

        <View style={{ flexDirection: "row", gap: s(10), backgroundColor: AppConstants.whiteColor, padding: s(10), borderRadius: s(12) }}>
          {
            !showPassword
              ?
              <Icon onPress={() => { setShowPassword(true) }} icon='eye' iconType='Feather' color={AppConstants.redColor} />
              :
              <Icon onPress={() => { setShowPassword(false) }} icon='eye-off' iconType='Feather' color={AppConstants.redColor} />
          }
          <TextInput value={password} onChangeText={setPassword} placeholder='Password...' secureTextEntry={showPassword} style={{ flex: 1, fontSize: s(14) }} />
        </View>

        <View style={{ flexDirection: "row", gap: s(10), backgroundColor: AppConstants.whiteColor, padding: s(10), borderRadius: s(12) }}>
          <Icon icon='shield' iconType='Feather' color={AppConstants.redColor} />
          <View style={{ flex: 1 }}>
            <DropdownExample dataArr={[{ label: "User", value: "user" }, { label: "Admin", value: "admin" }, { label: "Organiser", value: "organiser" }]} onChange={(val: string) => { setRole(val) }} placeholder='Select Role' />
          </View>
        </View>

      </View>


      <RoundedButton title='SIGN IN' onPress={handleSignUp} disabled={loader} loading={loader} />

      <View style={{ position: "absolute", bottom: 0, left: AppConstants.screenPadding, width: "100%", justifyContent: "center", alignItems: "center", padding: AppConstants.screenPadding, flexDirection: "row" }}>
        <CustomText variant='h6'>Don't have an account, </CustomText>
        <CustomText variant='h6' style={{ color: AppConstants.whiteColor }}>SignUp</CustomText>
      </View>




    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({})