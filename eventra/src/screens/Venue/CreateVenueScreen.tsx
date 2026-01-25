import CustomSafeScreen from '@components/CustomSafeScreen';
import GetLocationModal from '@components/GetLocationModal';
import CustomText from '@components/global/CustomText';
import DateTimeSelector from '@components/global/DateTimeSelector';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createVenueApi, updateVenueApi} from '@services/VenueServices';
import {useAppSelector} from '@store/hooks';
import {formatTime, showToast} from '@utils/Helper';
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s, vs} from 'react-native-size-matters';
import uuid from 'react-native-uuid';
import {addressesType, NavigationProps, RouteProps} from 'types/AppTypes';

const CreateVenueScreen: FC = () => {
  const {
    params: {venue, method},
  } = useRoute<RouteProps<'CreateVenueScreen'>>();
  const isUpdate = method === 'update';
  const navigation = useNavigation<NavigationProps<'CreateVenueScreen'>>();
  const [addresses, setAddresses] = useState<addressesType | any>(null);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [addLoader, setAddLoader] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [pic, setPic] = useState<any>('');
  const [slots, setSlots] = useState<
    {start: string; end: string; id: string}[]
  >([]);
  const [time, setTime] = useState<{start: string; end: string}>({
    end: '',
    start: '',
  });

  const {loggedInUser} = useAppSelector(store => store.user);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (response.didCancel) return;
      else if (response.errorCode) return;
      else setPic(response.assets[0]);
    });
  };

  const checkValidation = () => {
    let error = {verified: true, message: ''};
    if (!addresses) {
      error = {verified: false, message: 'Location Not Selected'};
    }
    if (slots.length === 0) {
      error = {verified: false, message: 'Slots Not Created'};
    }

    if (title === '') {
      error = {verified: false, message: 'Title Not Created'};
    }
    if (description === '') {
      error = {verified: false, message: 'description Not Created'};
    }

    if (pic === '') {
      error = {verified: false, message: 'pic Not selected'};
    }

    return error;
  };

  const createVenue = async () => {
    const {verified, message} = checkValidation();
    if (!verified)
      return showToast({title: message, description: '', type: 'info'});
    setAddLoader(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('host', loggedInUser?._id);
    formData.append('image', {
      uri: pic.uri,
      name: pic.fileName,
      type: pic.type,
    });
    formData.append(
      'address',
      JSON.stringify({
        area: addresses?.area,
        state: addresses?.state,
        postalCode: addresses?.postalCode,
        country: addresses?.country,
      }),
    );
    formData.append(
      'location',
      JSON.stringify({
        type: 'Point',
        coordinates: addresses?.coords,
      }),
    );
    const allSlots = slots.map(item => ({
      time: {start: item.start, end: item.end},
      isBooked: false,
      event: null,
    }));
    formData.append('slots', JSON.stringify(allSlots));

    const {success} = await createVenueApi(formData);
    if (success) {
      navigation.navigate('VenueScreen');
      showToast({
        title: 'Success',
        description: 'New Venue Created',
        type: 'success',
      });
    }
    setAddLoader(false);
  };

  const updateVenue = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    const result = await updateVenueApi(formData, venue!._id);
    setAddLoader(true);
    if (result.success) {
      navigation.navigate('VenueScreen');
      showToast({
        title: 'Success',
        description: 'Venue Updated',
        type: 'success',
      });
    }
    setAddLoader(false);
  };

  const handleCreateSlots = () => {
    if (!time.start)
      return showToast({
        title: 'Warning !',
        description: 'Please select Start and End time',
        type: 'info',
      });

    setSlots(prev => [...prev, {...time, id: uuid.v4()}]);
    setTime({end: '', start: ''});
  };

  const handleDeleteSlot = (id: string) => {
    if (isUpdate) {
      showToast({
        title: 'Warning !',
        description: 'Cannot delete slot in update mode',
        type: 'info',
      });
      return;
    }
    setSlots(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (isUpdate) {
      setTitle(venue!.title);
      setDescription(venue!.description);
      setTime({end: '', start: ''});
      setPic(venue!.pic);
      setAddresses(typeof venue!.venue !== 'string' ? venue!.address : null);
      setSlots(venue!.slots.map(item => ({...item.time, id: item._id})));
    } else {
      setTitle('');
      setDescription('');
      setTime({end: '', start: ''});
      setPic('');
      setAddresses(null);
      setSlots([]);
    }
  }, [method]);

  return (
    <CustomSafeScreen style={styles.container}>
      {/* BACK HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon icon="arrow-left" iconType="FontAwesome5" size={s(20)} />
        </Pressable>
        <CustomText variant="h2" style={styles.headerTitle}>
          {isUpdate ? 'Update' : 'Create'} Venue
        </CustomText>
      </View>

      <ScrollView>
        <View style={styles.content}>
          {/* Venue NAME */}
          <View style={styles.section}>
            <CustomText variant="h6">Venue Name</CustomText>
            <TextInput
              value={title}
              placeholder="Enter Venue Name..."
              placeholderTextColor={AppConstants.grayLightColor}
              onChangeText={setTitle}
              style={styles.input}
            />
          </View>

          {/* DESCRIPTION */}
          <View style={styles.section}>
            <CustomText variant="h6">Description</CustomText>
            <TextInput
              multiline
              value={description}
              placeholder="Enter Description..."
              placeholderTextColor={AppConstants.grayLightColor}
              onChangeText={setDescription}
              style={styles.inputDesc}
              textAlign="left"
              textAlignVertical="top"
              onContentSizeChange={e =>
                setInputHeight(e.nativeEvent.contentSize.height)
              }
            />
          </View>

          {/* PIC */}
          <Pressable
            onPress={() => !isUpdate && pickImage()}
            style={[styles.section, isUpdate ? {opacity: 0.6} : {}]}>
            <CustomText variant="h6">Pic</CustomText>
            <View style={styles.picContainer}>
              {pic !== '' ? (
                <Image source={{uri: pic.uri ?? pic.url}} style={styles.pic} />
              ) : (
                <View style={styles.picWrapper}>
                  <Icon
                    icon="plus"
                    iconType="Feather"
                    size={s(20)}
                    color={AppConstants.redColor}
                  />
                </View>
              )}
            </View>
          </Pressable>

          {/* SLOTS */}
          <CustomText variant="h6">
            {isUpdate ? 'Slots' : 'Create Slots'}
          </CustomText>
          {!isUpdate && (
            <View style={styles.slotInputRow}>
              <DateTimeSelector
                onSet={val => setTime({...time, start: val})}
                mode="time"
                viewStyle={styles.timeBox}>
                <TextInput
                  placeholder="Start Time..."
                  placeholderTextColor={AppConstants.grayLightColor}
                  value={formatTime(time.start)}
                  editable={false}
                  style={styles.input}
                />
                <Icon
                  icon="clock"
                  iconType="Feather"
                  size={s(18)}
                  color="red"
                />
              </DateTimeSelector>

              <DateTimeSelector
                onSet={val => setTime({...time, end: val})}
                mode="time"
                viewStyle={styles.timeBox}>
                <TextInput
                  placeholder="End Time"
                  placeholderTextColor={AppConstants.grayLightColor}
                  value={formatTime(time.end)}
                  editable={false}
                  style={styles.input}
                />
                <Icon
                  icon="clock"
                  iconType="Feather"
                  size={s(18)}
                  color="red"
                />
              </DateTimeSelector>

              <RoundedBox
                size={s(25)}
                viewStyle={styles.addSlotBtn}
                onPress={handleCreateSlots}>
                <Icon icon="plus" iconType="Feather" size={s(20)} />
              </RoundedBox>
            </View>
          )}

          {/* SHOW SLOTS */}
          <FlatList
            data={slots}
            renderItem={({item}) => (
              <View style={styles.slotRow}>
                <View style={styles.slotBox}>
                  <CustomText>{formatTime(item.start)}</CustomText>
                  <Icon
                    icon="clock"
                    iconType="Feather"
                    size={s(18)}
                    color="red"
                  />
                </View>
                <View style={styles.slotBox}>
                  <CustomText>{formatTime(item.end)}</CustomText>
                  <Icon
                    icon="clock"
                    iconType="Feather"
                    size={s(18)}
                    color="red"
                  />
                </View>
                <RoundedBox
                  size={s(25)}
                  viewStyle={styles.removeSlotBtn}
                  onPress={() => handleDeleteSlot(item.id)}>
                  <Icon icon="x" iconType="Feather" size={s(20)} />
                </RoundedBox>
              </View>
            )}
            keyExtractor={item => `${item.start}-${item.end}`}
            contentContainerStyle={styles.slotList}
            scrollEnabled={false}
          />

          {/* LOCATION */}
          <CustomText variant="h6">Location</CustomText>
          {/* LOCATION */}
          <Pressable
            onPress={() => !isUpdate && setShowLocationModal(true)}
            style={styles.locationBox}>
            <Icon
              icon="location-pin"
              iconType="Entypo"
              color={AppConstants.redColor}
            />
            <TextInput
              value={addresses?.area}
              onChangeText={() => {}}
              placeholder="Location..."
              placeholderTextColor={AppConstants.grayLightColor}
              style={[
                styles.input,
                isUpdate && {color: AppConstants.grayColor},
              ]}
              editable={false}
            />
          </Pressable>

          <RoundedButton
            loading={addLoader}
            title={isUpdate ? 'Update' : 'Create'}
            onPress={() => (isUpdate ? updateVenue() : createVenue())}
          />
        </View>
      </ScrollView>

      <GetLocationModal
        show={showLocationModal}
        setShow={setShowLocationModal}
        setAddresses={setAddresses}
      />
    </CustomSafeScreen>
  );
};

export default CreateVenueScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    backgroundColor: AppConstants.redColor,
    padding: AppConstants.screenPadding,
    flexDirection: 'row',
    gap: s(10),
    alignItems: 'center',
  },
  headerTitle: {color: AppConstants.whiteColor},
  content: {
    flex: 1,
    paddingHorizontal: AppConstants.screenPadding,
    gap: vs(10),
    paddingBottom: vs(70),
    paddingTop: vs(10),
  },
  section: {gap: vs(6)},
  input: {
    backgroundColor: AppConstants.whiteColor,
    flex: 1,
    padding: s(8),
    height: vs(30),
    color: AppConstants.black,
  },
  inputDesc: {
    backgroundColor: AppConstants.whiteColor,
    flex: 1,
    padding: s(8),
    height: vs(80),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  picContainer: {
    backgroundColor: AppConstants.whiteColor,
    flex: 1,
    height: vs(200),
  },
  pic: {flex: 1},
  timeBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AppConstants.whiteColor,
    paddingHorizontal: s(5),
    height: vs(30),
  },
  slotInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    alignItems: 'center',
    marginBottom: vs(10),
  },
  addSlotBtn: {backgroundColor: AppConstants.redColor},
  slotRow: {
    flexDirection: 'row',
    gap: s(10),
    marginBottom: vs(5),
    alignItems: 'center',
  },
  slotBox: {
    flex: 1,
    padding: s(6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AppConstants.whiteColor,
  },
  removeSlotBtn: {backgroundColor: AppConstants.redColor},
  slotList: {gap: vs(10), marginVertical: vs(10)},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(20),
    marginBottom: vs(10),
  },
  locationBox: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppConstants.whiteColor,
  },
  picWrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
