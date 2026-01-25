import CustomSafeScreen from '@components/CustomSafeScreen';
import DetailCard1 from '@components/event/DetailCard1';
import {CustomImage} from '@components/global/CustomImage';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import DeleteModal from '@components/global/DeleteModal';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import ThreeDotBottomModal from '@components/global/ThreeDotBottomModal';
import SmallVenueCard from '@components/venue/SmallVenueCard';
import {AppConstants} from '@constants/AppConstants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  bookEventApi,
  deleteEventApi,
  getSingleEvent,
  updateEventApi,
} from '@services/EventService';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {deleteEventFromAllEvents} from '@store/reducers/eventSlice';
import {createShareLink} from '@utils/DeepLinkService';
import {
  formatDate,
  formatISODate,
  formatTime,
  getTimeDifference,
  showToast,
} from '@utils/Helper';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s, vs} from 'react-native-size-matters';
import {
  EventType,
  NavigationProps,
  RootStackParamList,
  ThreeDotBottomModalType,
} from 'types/AppTypes';

type EventDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'EventDetailScreen'
>;

const EventDetailScreen = () => {
  const {params} = useRoute<EventDetailsScreenRouteProp>();
  const navigation = useNavigation<NavigationProps<'EventDetailScreen'>>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const {loggedInUser} = useAppSelector(store => store.user);
  const [loader, setLoader] = useState(false);
  const [cancelLoader, setCancelLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [eventDetail, setEventDetail] = useState<EventType | null>(null);
  const dispatch = useAppDispatch();
  const bottomModalDataArr: ThreeDotBottomModalType['dataArr'] = [
    {
      title: 'Edit',
      description: 'Edit Your Event Details',
      icon: (
        <Icon icon="edit" iconType="Feather" color={AppConstants.redColor} />
      ),
      value: 'edit',
    },
    {
      title: 'Cancel',
      description: 'Cancel this event and notify all participants',
      icon: (
        <Icon
          icon="calendar-times"
          iconType="FontAwesome5"
          color={AppConstants.redColor}
        />
      ),
      value: 'cancel',
    },
    {
      title: 'Share',
      description: 'Share This Event with others and Invite',
      icon: (
        <Icon icon="share" iconType="Entypo" color={AppConstants.redColor} />
      ),
      value: 'share',
    },
    {
      title: 'Spotlight',
      description: 'SpotLight Your Event to reach more audience',
      icon: (
        <Icon
          icon="star-outlined"
          iconType="Entypo"
          color={AppConstants.redColor}
        />
      ),
      value: 'spotlight',
    },
    {
      title: 'Delete',
      description: 'Remove Your Event Permanently',
      icon: (
        <Icon
          icon="delete"
          iconType="MaterialIcons"
          color={AppConstants.redColor}
        />
      ),
      value: 'delete',
    },
  ];

  const handleThreeDotModalClick = (val: string) => {
    if (val === 'edit') {
      if (loggedInUser?._id !== eventDetail?.host._id) {
        showToast({title: 'Not Authorized to edit event', type: 'error'});
        setShowDeleteModal(false);
        return;
      }
      navigation.navigate('CreateEventScreen', {
        event: eventDetail,
        method: 'update',
      });
    }

    if (val === 'delete') {
      setShowDeleteModal(true);
    }

    if (val === 'cancel') {
      setShowCancelModal(true);
    }

    if (val === 'spotlight') {
      navigation.navigate('CreateSpotLightScreen', {
        categoryId: eventDetail!._id,
        category: 'event',
      });
    }

    if (val === 'share') {
      createShareLink({
        feature: 'event',
        action: 'share',
        docId: params.eventId ?? eventDetail!._id,
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (loggedInUser?._id !== eventDetail?.host._id) {
        showToast({title: 'Not Authorized to delete event', type: 'error'});
        setShowDeleteModal(false);
        return;
      }

      if (
        !getTimeDifference(eventDetail?.date, new Date().toISOString()).isPassed
      ) {
        showToast({title: 'Cannot delete future events', type: 'error'});
        setShowDeleteModal(false);
        return;
      }

      setDeleteLoader(true);
      const {success} = await deleteEventApi(
        eventDetail!._id ?? params.eventId,
      );
      if (success) {
        dispatch(deleteEventFromAllEvents(eventDetail!._id ?? params.eventId));
        showToast({title: 'Event Deleted', type: 'success'});
        navigation.goBack();
      }
      setDeleteLoader(false);
    } catch (error) {
      setDeleteLoader(false);
      showToast({title: 'Error in Deleting Event', type: 'error'});
    }
  };

  const handleCancel = async () => {
    if (loggedInUser?._id !== eventDetail?.host._id) {
      showToast({title: 'Not Authorized to cancel event', type: 'error'});
      setShowCancelModal(false);
      return;
    }

    if (eventDetail?.isCancelled) {
      showToast({title: 'Event has been cancelled', type: 'info'});
      setShowCancelModal(false);
      return;
    }

    try {
      setCancelLoader(true);
      const formData = new FormData();
      formData.append('isCancelled', true);
      const {success} = await updateEventApi(
        formData,
        eventDetail!._id ?? params.eventId,
      );
      if (success) {
        showToast({title: 'Event Cancelled', type: 'success'});
        setShowCancelModal(false);
        setEventDetail(prev => (prev ? {...prev, isCancelled: true} : prev));
      } else {
        showToast({title: 'Error in Cancelling Event', type: 'error'});
      }
      setCancelLoader(false);
    } catch (error) {
      setCancelLoader(false);
      showToast({title: 'Error in Cancelling Event', type: 'error'});
    }
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
    if (success) setEventDetail(data.data);
    if (!success) console.error('Error in getting event details');
  };

  const eventStatus = (): {isBookingAllowed: boolean; title: string} => {
    if (eventDetail?.headcount == eventDetail?.participants.length) {
      return {isBookingAllowed: false, title: 'Filled'};
    }

    if (eventDetail?.isCancelled) {
      return {isBookingAllowed: false, title: 'Cancelled'};
    }

    if (eventDetail?.host._id === loggedInUser?._id) {
      return {isBookingAllowed: false, title: 'Owner'};
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
    <CustomSafeScreen style={styles.flex}>
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
                  onPress={() => {
                    createShareLink({
                      feature: 'event',
                      action: 'invite',
                      docId: eventDetail._id,
                    });
                  }}
                  style={{paddingVertical: s(2)}}
                />
              </View>

              <RoundedBox
                onPress={() => setShowEditModal(true)}
                size={s(30)}
                viewStyle={styles.threeDot}>
                <ThreeDotBottomModal
                  setShow={setShowEditModal}
                  show={showEditModal}
                  dataArr={bottomModalDataArr}
                  onClick={handleThreeDotModalClick}
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
                  onPress={() => {
                    navigation.navigate('ProfileScreen', {
                      userId: eventDetail.host._id,
                    });
                  }}
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

          <DeleteModal
            onCancel={() => setShowDeleteModal(false)}
            onDelete={() => handleDelete()}
            setShow={setShowDeleteModal}
            show={showDeleteModal}
            loader={deleteLoader}
          />

          <DeleteModal
            onCancel={() => setShowCancelModal(false)}
            onDelete={() => handleCancel()}
            setShow={setShowCancelModal}
            show={showCancelModal}
            loader={cancelLoader}
            title="Are you sure to cancel event !"
            deleteBtnText="cancel"
            cancelBtnText="keep"
          />
        </>
      )}
    </CustomSafeScreen>
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
