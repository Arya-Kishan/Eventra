import DetailCard1 from '@components/event/DetailCard1';
import {CustomImage} from '@components/global/CustomImage';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import ThreeDotBottomModal from '@components/global/ThreeDotBottomModal';
import SmallVenueCard from '@components/venue/SmallVenueCard';
import {AppConstants} from '@constants/AppConstants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {bookEventApi, getSingleEvent} from '@services/EventService';
import {useAppSelector} from '@store/hooks';
import {formatDate, formatISODate, formatTime, showToast} from '@utils/Helper';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {EventType, NavigationProps, RootStackParamList} from 'types/AppTypes';

type EventDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventDetailScreen'
>;

const EventDetailScreen = () => {
  const {params} = useRoute<EventDetailsScreenRouteProp>();
  const navigation = useNavigation<NavigationProps<'EventDetailScreen'>>();
  const [showEditModal, setShowEditModal] = useState(false);
  const {loggedInUser} = useAppSelector(store => store.user);
  const [loader, setLoader] = useState(false);
  const [eventDetail, setEventDetail] = useState<EventType | null>(null);

  const handleDelete = () => {
    console.log('yes delete it');
  };

  const handleEdit = () => {
    console.log('PLEASE  EDIT ME');
    navigation.navigate('CreateEventScreen', {
      event: eventDetail,
      method: 'update',
    });
    setShowEditModal(false);
  };

  const handleJoin = async () => {
    if (eventDetail?.headcount == eventDetail?.participants.length) {
      return showToast({title: 'Sit is Full !'});
    }

    setLoader(true);
    const {success, data} = await bookEventApi(
      {participant: loggedInUser?._id},
      eventDetail!._id,
    );
    if (success) {
      setEventDetail(data.data);
      showToast({
        title: 'Joined',
        description: 'You joined The Event',
        type: 'success',
      });
    } else {
      showToast({
        title: 'Not Joined',
        description: "Didn't join The Event",
        type: 'error',
      });
    }

    setLoader(false);
  };

  const fetchSingleEvent = async () => {
    const {data, success} = await getSingleEvent(params.eventId);
    success ? setEventDetail(data.data) : navigation.navigate('ErrorScreen');
  };

  const eventStatus = (): {isBookingAllowed: boolean; title: string} => {
    if (eventDetail?.headcount == eventDetail?.participants.length) {
      return {isBookingAllowed: false, title: 'Filled'};
    }

    const userIdArr = eventDetail?.participants.map(
      (item: EventType) => item._id,
    );

    if (userIdArr?.includes(loggedInUser?._id!)) {
      return {isBookingAllowed: false, title: 'Joined'};
    }

    return {isBookingAllowed: true, title: 'Join'};
  };

  useEffect(() => {
    fetchSingleEvent();
  }, []);

  return (
    <View style={styles.flex}>
      {eventDetail == null ? (
        <CustomLoader />
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.imageBox}>
              <CustomImage
                source={eventDetail.pic.url}
                width={AppConstants.screenWidth}
                height={vs(200)}
                borderRadius={0}
              />

              <View style={styles.headerInvite}>
                <Text>Join and Invite {eventDetail.participants.length}+</Text>

                <RoundedButton
                  title="Invite"
                  onPress={() => {}}
                  style={{paddingVertical: s(2)}}
                />
              </View>

              <RoundedBox
                onPress={() => setShowEditModal(true)}
                size={s(30)}
                viewStyle={styles.threeDot}>
                <ThreeDotBottomModal
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  setShow={setShowEditModal}
                  show={showEditModal}
                />
              </RoundedBox>
            </View>

            <View
              style={{
                paddingHorizontal: AppConstants.screenPadding,
                paddingBottom: s(50),
                gap: AppConstants.defaultGap,
              }}>
              <CustomText style={styles.detailTitle} numberOfLines={2}>
                {eventDetail.title}
              </CustomText>

              {/* EVENT DETAILS DATE,TIME, HOST INFO */}
              <View style={{gap: AppConstants.defaultGap}}>
                <DetailCard1
                  icon={
                    <Icon
                      iconType="MaterialIcons"
                      icon="calendar-month"
                      color={AppConstants.redColor}
                    />
                  }
                  title={`${formatDate(eventDetail.date)}`}
                  subTitle={`${formatISODate(eventDetail.date).day} ${formatTime(eventDetail.time.start)} - ${formatTime(eventDetail.time.start)}`}
                />

                <DetailCard1
                  icon={
                    <Icon
                      iconType="FontAwesome"
                      icon="map-marker"
                      color={AppConstants.redColor}
                    />
                  }
                  title="Gala Convention Center"
                  subTitle="34 GB Road, Near Kaushal Enterprise, Patna"
                />

                <DetailCard1
                  icon={
                    <Icon
                      iconType="MaterialIcons"
                      icon="calendar-month"
                      color={AppConstants.redColor}
                    />
                  }
                  title={
                    typeof eventDetail.host !== 'string'
                      ? `${eventDetail.host.name}`
                      : 'Host Of The Event'
                  }
                  subTitle={
                    typeof eventDetail.host !== 'string'
                      ? eventDetail.host.bio
                      : 'Enjoy the Event'
                  }
                  isPic={true}
                  picUrl={
                    typeof eventDetail.host !== 'string'
                      ? `${eventDetail.host.profilePic?.url}`
                      : 'https://i.pinimg.com/736x/2d/7a/c4/2d7ac424de1f7ca83011beb9f8b25b59.jpg'
                  }
                  showBtn={true}
                />
              </View>

              {/* ABOUT */}
              <View>
                <CustomText style={styles.aboutEvent}>About Event</CustomText>
                <Text style={styles.aboutEventDesc}>
                  {eventDetail.description}
                </Text>
              </View>

              <View style={styles.venueBox}>
                <View style={styles.venueHeading}>
                  <CustomText style={styles.price}>Venue</CustomText>
                  <Icon
                    icon="fireplace-off"
                    iconType="MaterialCommunityIcons"
                    size={s(20)}
                    color={AppConstants.redColor}
                  />
                </View>

                {typeof eventDetail.venue !== 'string' && (
                  <SmallVenueCard venue={eventDetail.venue} />
                )}
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomBox}>
            <Text style={styles.price}>$120</Text>

            <RoundedButton
              onPress={handleJoin}
              title={eventStatus().title}
              style={{paddingVertical: s(8), width: s(130)}}
              loading={loader}
              disabled={!eventStatus().isBookingAllowed}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  flex: {flex: 1},
  headerInvite: {
    position: 'absolute',
    bottom: -s(20),
    left: '50%',
    transform: [{translateX: '-50%'}],
    flexDirection: 'row',
    gap: s(20),
    backgroundColor: 'white',
    borderRadius: s(10),
    width: '70%',
    padding: s(6),
    height: s(40),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  scrollView: {
    flex: 1,
    backgroundColor: AppConstants.screenBgColor,
  },
  imageBox: {position: 'relative', marginBottom: s(20)},
  threeDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  aboutEvent: {fontWeight: '800', fontSize: s(18)},
  aboutEventDesc: {
    fontWeight: '400',
    fontSize: s(14),
    marginTop: vs(4),
  },
  venueBox: {flexDirection: 'column', gap: s(15)},
  venueHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  detailTitle: {fontSize: s(30), fontWeight: '800'},
  price: {fontWeight: '800', fontSize: s(18)},
  bottomBox: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppConstants.whiteColor,
    elevation: 4,
    paddingHorizontal: AppConstants.screenPadding,
    paddingVertical: vs(6),
  },
});
