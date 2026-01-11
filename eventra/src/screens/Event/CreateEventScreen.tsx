import SelectVenueModal from '@components/event/SelectVenueModal';
import CustomText from '@components/global/CustomText';
import DateTimeSelector from '@components/global/DateTimeSelector';
import Icon from '@components/global/Icon';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createEventApi} from '@services/EventService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {
  setAllEvents,
  setCategory,
  setDate,
  setDescription,
  setHeadcount,
  setPic,
  setTime,
  setTitle,
  setVenue,
} from '@store/reducers/eventSlice';
import {formatDate, formatTime, showToast} from '@utils/Helper';
import React, {FC, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s, vs} from 'react-native-size-matters';
import {
  AssetType,
  NavigationProps,
  RouteProps,
  VenueType,
} from 'types/AppTypes';

const CreateEventScreen: FC = () => {
  const {
    params: {event, method},
  } = useRoute<RouteProps<'CreateEventScreen'>>();
  const [addLoader, setAddLoader] = useState(false);
  const navigation = useNavigation<NavigationProps<'CreateEventScreen'>>();
  const {allVenues} = useAppSelector(store => store.venue);

  const [showVenues, setShowVenues] = useState(false);
  console.log('event : ', event);

  const {
    category,
    date,
    description,
    headcount,
    pic,
    time,
    title,
    venue,
    allEvents,
  } = useAppSelector(store => store.event);
  const {loggedInUser} = useAppSelector(store => store.user);
  const dispatch = useAppDispatch();

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const image: AssetType = response.assets[0];
        dispatch(setPic(image));
      }
    });
  };

  const createEvent = async () => {
    setAddLoader(true);

    const formData = new FormData();
    formData.append('title', title); // Additional data you want to send
    formData.append('description', description);
    formData.append('time', JSON.stringify(time));
    formData.append('date', date);
    formData.append('host', loggedInUser?._id);
    formData.append('image', {
      uri: pic.uri,
      name: pic.fileName,
      type: pic.type,
    });
    formData.append('venue', (venue as VenueType)._id);
    formData.append('headCount', headcount);
    formData.append('category', category);

    console.log('formData : ', formData);

    const {data, error, success, message} = await createEventApi(formData);
    // console.log(data.data)
    if (success) {
      navigation.navigate('Main');
      showToast({
        title: 'Success',
        description: 'New Event Created',
        type: 'success',
      });
      dispatch(setAllEvents([...allEvents!]));
    }
    setAddLoader(false);
  };

  useEffect(() => {
    if (method == 'update') {
      dispatch(setTitle(event!.title));
      dispatch(setDescription(event!.description));
      dispatch(setDate(event!.date));
      dispatch(setTime(event!.time));
      dispatch(
        setVenue(typeof event!.venue !== 'string' ? event!.venue.title : ''),
      );
      dispatch(setPic(event!.pic));
      dispatch(setCategory(event!.category));
      dispatch(setHeadcount(event!.headcount.toString()));
    } else {
      dispatch(setTitle(''));
      dispatch(setDescription(''));
      dispatch(setDate(''));
      dispatch(setTime({start: '', end: ''}));
      dispatch(setVenue(''));
      dispatch(setPic(''));
      dispatch(setCategory(''));
      dispatch(setHeadcount(''));
    }
  }, [method]);

  return (
    <View>
      <StatusBar hidden={false} backgroundColor={AppConstants.redColor} />

      {/* BACK HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon icon="arrow-left" iconType="FontAwesome5" size={s(20)} />
        </Pressable>
        <CustomText variant="h2" style={styles.headerText}>
          Create Event
        </CustomText>
      </View>

      <ScrollView>
        <View style={styles.container}>
          {/* EVENT NAME */}
          <View style={styles.fieldContainer}>
            <CustomText variant="h6">Event Name</CustomText>
            <TextInput
              value={title}
              placeholder="Enter Event Name"
              onChangeText={val => dispatch(setTitle(val))}
              style={styles.input}
            />
          </View>

          {/* EVENT Description */}
          <View style={styles.fieldContainer}>
            <CustomText variant="h6">Description</CustomText>
            <TextInput
              numberOfLines={4}
              value={description}
              placeholder="Enter Description"
              onChangeText={val => dispatch(setDescription(val))}
              style={styles.input}
            />
          </View>

          {/*VENUE, DATE TIME */}
          <View style={styles.sectionContainer}>
            {/* DATE */}

            <CustomText variant="h6">Date</CustomText>

            <DateTimeSelector
              onSet={val => dispatch(setDate(val))}
              mode="date"
              viewStyle={styles.dateSelector}>
              <TextInput
                placeholder="Select Date"
                value={formatDate(date)}
                onChangeText={setDate}
                editable={false}
                style={styles.input}
              />
              <Icon
                icon="calendar"
                iconType="FontAwesome"
                size={s(18)}
                color="red"
              />
            </DateTimeSelector>

            {/* VENUE */}
            <View style={styles.fieldContainer}>
              <CustomText variant="h6">Venue</CustomText>

              <Pressable
                onPress={() => {
                  setShowVenues(true);
                }}
                style={styles.venue}>
                <TextInput
                  value={typeof venue !== 'string' ? venue.title : ''}
                  placeholder="Enter Description"
                  onChangeText={() => {}}
                  style={styles.input}
                  editable={false}
                />
                <Icon
                  icon="fireplace-off"
                  iconType="MaterialCommunityIcons"
                  size={s(18)}
                  color={AppConstants.redColor}
                />
              </Pressable>
            </View>

            {/* TIME */}
            <View style={styles.timeContainer}>
              <View style={styles.timeInputWrapper}>
                <TextInput
                  placeholder="Select Start Time"
                  value={formatTime(time.start)}
                  onChangeText={() => {}}
                  editable={false}
                  style={styles.input}
                />
                <Icon
                  icon="clock"
                  iconType="Feather"
                  size={s(18)}
                  color="red"
                />
              </View>
              <View style={styles.timeInputWrapper}>
                <TextInput
                  placeholder="Select End Time"
                  value={formatTime(time.end)}
                  onChangeText={() => {}}
                  editable={false}
                  style={styles.input}
                />
                <Icon
                  icon="clock"
                  iconType="Feather"
                  size={s(18)}
                  color="red"
                />
              </View>
            </View>
          </View>

          {/* PIC */}
          <View style={styles.fieldContainer}>
            <CustomText variant="h6">Pic</CustomText>
            <View style={styles.imageContainer}>
              {pic !== '' && (
                <Image
                  source={{uri: pic.uri ?? pic.url}}
                  style={styles.image}
                />
              )}
            </View>
            <RoundedButton title="Choose" onPress={pickImage} />
          </View>

          {/* CATEGORY */}
          <View style={styles.fieldContainer}>
            <CustomText variant="h6">Category</CustomText>
            <TextInput
              value={category}
              placeholder="music, game, sports, party"
              onChangeText={(val: string) => {
                dispatch(setCategory(val));
              }}
              style={styles.input}
            />
          </View>

          {/* HEADCOUNT */}
          <View style={styles.fieldContainer}>
            <CustomText variant="h6">Number of People</CustomText>
            <TextInput
              value={headcount}
              placeholder="Enter Description"
              keyboardType="numeric"
              onChangeText={val => dispatch(setHeadcount(val))}
              style={styles.input}
            />
          </View>

          <RoundedButton
            loading={addLoader}
            title="Create"
            onPress={() => {
              createEvent();
            }}
          />
        </View>
      </ScrollView>

      <SelectVenueModal setShow={setShowVenues} show={showVenues} />
    </View>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppConstants.redColor,
    padding: AppConstants.screenPadding,
    flexDirection: 'row',
    gap: s(10),
    alignItems: 'center',
  },
  headerText: {
    color: AppConstants.whiteColor,
  },
  container: {
    flex: 1,
    paddingHorizontal: AppConstants.screenPadding,
    gap: vs(10),
    paddingBottom: vs(70),
    paddingTop: vs(10),
  },
  fieldContainer: {
    gap: vs(6),
  },
  sectionContainer: {
    gap: vs(10),
  },
  input: {
    backgroundColor: AppConstants.whiteColor,
    flex: 1,
    height: vs(30),
    padding: s(10),
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppConstants.whiteColor,
    alignItems: 'center',
    paddingHorizontal: s(5),
  },
  venue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppConstants.whiteColor,
    alignItems: 'center',
    paddingHorizontal: s(5),
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
  },
  timeInputWrapper: {
    backgroundColor: AppConstants.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    width: '48%',
    paddingVertical: s(2),
    paddingHorizontal: s(6),
  },
  imageContainer: {
    backgroundColor: AppConstants.whiteColor,
    flex: 1,
    height: vs(200),
  },
  image: {
    flex: 1,
  },
});
