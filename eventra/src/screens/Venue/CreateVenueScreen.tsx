import BasicMap from '@components/BasicMap';
import CustomCheckbox from '@components/global/CustomCheckBox';
import CustomModal from '@components/global/CustomModal';
import CustomText from '@components/global/CustomText';
import DateTimeSelector from '@components/global/DateTimeSelector';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {AppTemporaryContants} from '@constants/AppTemporaryConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createVenueApi} from '@services/VenueServices';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setVenue} from '@store/reducers/eventSlice';
import {formatTime, showToast} from '@utils/Helper';
import React, {FC, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {s, vs} from 'react-native-size-matters';
import uuid from 'react-native-uuid';
import {AssetType, NavigationProps, RouteProps} from 'types/AppTypes';

const CreateVenueScreen: FC = () => {
  const {
    params: {venue},
  } = useRoute<RouteProps<'CreateVenueScreen'>>();

  const [addLoader, setAddLoader] = useState(false);
  const navigation = useNavigation<NavigationProps<'CreateVenueScreen'>>();
  const [inputHeight, setInputHeight] = useState(40);
  const [title, setTitle] = useState<string>('Sport Talent Venue ');
  const [description, setDescription] = useState<string>(
    'This is our sprt venue mainly for all womens who want to be fit and fine, goof looking and young, time is never late but u will get old so before getting old utilise you time lady',
  );
  const [pic, setPic] = useState<any>('');
  const [slots, setSlots] = useState<
    {start: string; end: string; id: string}[]
  >([]);
  const [time, setTime] = useState<{start: string; end: string}>({
    end: '',
    start: '',
  });
  const [location, setLocation] = useState<{
    latitude: string;
    longitude: string;
  }>({
    latitude: '28.6139',
    longitude: '77.2088',
  });
  const [address, setAddress] = useState<{
    state: string;
    city: string;
    area: string;
  }>({
    area: 'VIP Colony',
    city: 'Patna',
    state: 'Bihar',
  });

  const {loggedInUser} = useAppSelector(store => store.user);
  const dispatch = useAppDispatch();

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (response.didCancel) return;
      else if (response.errorCode) return;
      else setPic(response.assets[0]);
    });
  };

  const createVenue = async () => {
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
    formData.append('location', JSON.stringify(location));
    formData.append('address', JSON.stringify(address));
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

  const handleDeleteSlot = (id: string) =>
    setSlots(prev => prev.filter(item => item.id !== id));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppConstants.redColor} translucent={false} />

      {/* BACK HEADER */}
      <View style={styles.header}>
        <Icon icon="arrow-left" iconType="FontAwesome5" size={s(20)} />
        <CustomText variant="h2" style={styles.headerTitle}>
          Create Venue
        </CustomText>
      </View>

      <ScrollView>
        <View style={styles.content}>
          {/* Venue NAME */}
          <View style={styles.section}>
            <CustomText variant="h6">Venue Name</CustomText>
            <TextInput
              value={title}
              placeholder="Enter Venue Name"
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
              placeholder="Enter Description"
              onChangeText={setDescription}
              style={styles.input}
              onContentSizeChange={e =>
                setInputHeight(e.nativeEvent.contentSize.height)
              }
            />
          </View>

          {/* PIC */}
          <View style={styles.section}>
            <CustomText variant="h6">Pic</CustomText>
            <View style={styles.picContainer}>
              {pic !== '' && (
                <Image source={{uri: pic.uri}} style={styles.pic} />
              )}
            </View>
            <RoundedButton title="Choose" onPress={pickImage} />
          </View>

          {/* SLOTS */}
          <CustomText variant="h6">Create Slots</CustomText>
          <View style={styles.slotInputRow}>
            <DateTimeSelector
              onSet={val => setTime({...time, start: val})}
              mode="time"
              viewStyle={styles.timeBox}>
              <TextInput
                placeholder="Select Start Time"
                value={formatTime(time.start)}
                editable={false}
                style={styles.input}
              />
              <Icon icon="clock" iconType="Feather" size={s(18)} color="red" />
            </DateTimeSelector>

            <DateTimeSelector
              onSet={val => setTime({...time, end: val})}
              mode="time"
              viewStyle={styles.timeBox}>
              <TextInput
                placeholder="Select End Time"
                value={formatTime(time.end)}
                editable={false}
                style={styles.input}
              />
              <Icon icon="clock" iconType="Feather" size={s(18)} color="red" />
            </DateTimeSelector>

            <RoundedBox
              size={s(25)}
              viewStyle={styles.addSlotBtn}
              onPress={handleCreateSlots}>
              <Icon icon="plus" iconType="Feather" size={s(20)} />
            </RoundedBox>
          </View>

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
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={styles.slotList}
            scrollEnabled={false}
          />

          {/* LOCATION */}
          <CustomText variant="h6">Location</CustomText>
          <View style={styles.row}>
            <TextInput
              style={styles.timeBox}
              value={location.latitude}
              placeholder="Latitude"
              onChangeText={val =>
                setLocation(prev => ({...prev, latitude: val}))
              }
            />
            <TextInput
              style={styles.timeBox}
              value={location.longitude}
              placeholder="Longitude"
              onChangeText={val =>
                setLocation(prev => ({...prev, longitude: val}))
              }
            />
          </View>

          {/* ADDRESS */}
          <CustomText variant="h6">Address</CustomText>
          <View style={styles.row}>
            <TextInput
              style={styles.timeBox}
              value={address.state}
              placeholder="State"
              onChangeText={val => setAddress(prev => ({...prev, state: val}))}
            />
            <TextInput
              style={styles.timeBox}
              value={address.city}
              placeholder="City"
              onChangeText={val => setAddress(prev => ({...prev, city: val}))}
            />
          </View>
          <TextInput
            style={styles.timeBox}
            value={address.area}
            placeholder="Area"
            onChangeText={val => setAddress(prev => ({...prev, area: val}))}
          />

          <RoundedButton
            loading={addLoader}
            title="Create"
            onPress={createVenue}
          />
        </View>
      </ScrollView>
    </View>
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
});
