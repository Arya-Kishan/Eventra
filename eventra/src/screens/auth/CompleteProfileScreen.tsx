import Blob3 from '@assets/blobs/blob3.svg';
import Blob4 from '@assets/blobs/blob4.svg';
import GetLocationModal from '@components/GetLocationModal';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {createUserApi, updateUserApi} from '@services/UserService';
import {useAppDispatch} from '@store/hooks';
import {setLoggedInUser} from '@store/reducers/userSlice';
import {AsyncSetData} from '@utils/AsyncStorage';
import {showToast} from '@utils/Helper';
import React, {useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {s, vs} from 'react-native-size-matters';
import {
  addressesType,
  AssetType,
  NavigationProps,
  RootStackParamList,
} from 'types/AppTypes';

type CompleteProfileScreenRouteProp = RouteProp<
  RootStackParamList,
  'CompleteProfileScreen'
>;

const CompleteProfileScreen = () => {
  const {params} = useRoute<CompleteProfileScreenRouteProp>();
  console.log('PARAMS :', params);

  const [fullName, setFullName] = useState<string>('');
  const [addresses, setAddresses] = useState<addressesType | null>(null);
  const [bio, setBio] = useState<string>('');
  const [pic, setPic] = useState<AssetType>({uri: '', fileName: '', type: ''});
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);

  const navigation = useNavigation<NavigationProps<'CompleteProfileScreen'>>();
  const dispathc = useAppDispatch();

  const checkValidation = () => {
    let errorData = {message: '', success: true};
    if (!fullName) {
      errorData = {message: 'FullName Password not selected', success: false};
    }

    if (!bio) {
      errorData = {message: 'Bio Not Available', success: false};
    }

    if (!addresses) {
      errorData = {message: 'Address Not Available', success: false};
    }

    if (!pic.uri) {
      errorData = {message: 'Pic Not Available', success: false};
    }

    return errorData;
  };

  const handleCompleteProfile = async () => {
    try {
      const isValid = checkValidation();
      if (!isValid.success)
        return showToast({title: isValid.message, type: 'error'});

      setLoader(true);
      const formdata = new FormData();
      formdata.append('fullName', fullName);
      formdata.append('bio', bio);
      formdata.append(
        'address',
        JSON.stringify({
          area: addresses?.area,
          state: addresses?.state,
          postalCode: addresses?.postalCode,
          country: addresses?.country,
        }),
      );
      formdata.append(
        'location',
        JSON.stringify({
          type: 'Point',
          coordinates: addresses?.coords,
        }),
      );
      formdata.append('image', {
        uri: pic.uri,
        name: pic.fileName,
        type: pic.type,
      });
      const {data, success} = await updateUserApi(formdata, params.user._id);
      if (success) {
        dispathc(setLoggedInUser(data.data));
        await AsyncSetData(data.data);
        navigation.reset({
          index: 0,
          routes: [{name: 'Main', params: {screen: 'Home'}}],
        });
      } else {
        showToast({title: 'Not Created, Try Again'});
      }
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  const pickImage = () => {
    launchImageLibrary({mediaType: 'mixed'}, (response: any) => {
      if (response.didCancel) return;
      else if (response.errorCode) return;
      else setPic(response.assets[0]);
    });
  };

  return (
    <View style={styles.safeAreaView}>
      <Blob4 width={s(700)} height={s(700)} style={styles.blob4} />
      <Blob3 width={s(600)} height={s(600)} style={styles.blob3} />

      <View style={styles.inputContainer}>
        {/* Pic */}
        <View style={styles.picContainer}>
          {pic.uri === '' ? (
            <Pressable onPress={pickImage} style={styles.pickImage}>
              <RoundedBox
                onPress={pickImage}
                size={s(40)}
                viewStyle={styles.pickImageBox}>
                <Icon icon="plus" iconType="Feather" size={s(20)} />
              </RoundedBox>
            </Pressable>
          ) : (
            <View style={styles.picWrapper}>
              <Image source={{uri: pic.uri}} style={styles.pic} />
              <RoundedBox
                size={s(25)}
                viewStyle={styles.removePicBtn}
                onPress={() => setPic({uri: '', fileName: '', type: ''})}>
                <Icon icon="x" iconType="Feather" size={s(20)} />
              </RoundedBox>
            </View>
          )}
        </View>

        {/* FULL NAME */}
        <View style={styles.inputRow}>
          <Icon
            icon="person"
            iconType="MaterialIcons"
            color={AppConstants.redColor}
          />
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name..."
            placeholderTextColor={AppConstants.grayColor}
            style={styles.textInput}
          />
        </View>

        {/* BIO */}
        <View style={styles.inputRow}>
          <Icon
            icon="email"
            iconType="MaterialIcons"
            color={AppConstants.redColor}
          />
          <TextInput
            value={bio}
            onChangeText={setBio}
            placeholder="Bio..."
            placeholderTextColor={AppConstants.grayColor}
            style={styles.textInput}
          />
        </View>

        {/* LOCATION */}
        <Pressable
          onPress={() => setShowLocationModal(true)}
          style={styles.inputRow}>
          <Icon
            icon="location-pin"
            iconType="Entypo"
            color={AppConstants.redColor}
          />
          <TextInput
            value={addresses?.area}
            onChangeText={() => {}}
            placeholder="Location..."
            placeholderTextColor={AppConstants.grayColor}
            style={styles.textInput}
            editable={false}
          />
        </Pressable>
      </View>

      <RoundedButton
        title="SUBMIT"
        onPress={handleCompleteProfile}
        disabled={loader}
        loading={loader}
      />

      <GetLocationModal
        show={showLocationModal}
        setShow={setShowLocationModal}
        setAddresses={setAddresses}
      />
    </View>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: AppConstants.screenPadding,
    gap: vs(40),
    marginTop: vs(50),
  },
  section: {gap: vs(6)},
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
  inputContainer: {
    gap: vs(20),
    marginTop: vs(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    gap: s(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppConstants.whiteColor,
    padding: s(10),
    borderRadius: s(12),
  },
  locationIcon: {
    height: '100%',
    justifyContent: 'center',
    paddingLeft: 12,
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
  picContainer: {
    backgroundColor: AppConstants.whiteColor,
    height: AppConstants.screenWidth * 0.5,
    width: AppConstants.screenWidth * 0.5,
    borderRadius: AppConstants.screenWidth * 0.5,
    borderColor: AppConstants.redColor,
    borderWidth: 2,
    overflow: 'hidden',
  },
  pickImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickImageBox: {backgroundColor: AppConstants.redColor},
  picWrapper: {position: 'relative'},
  pic: {width: '100%', height: '100%', aspectRatio: 1, resizeMode: 'cover'},
  removePicBtn: {
    backgroundColor: AppConstants.redColor,
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: [{translateX: '-50%'}],
  },
});
