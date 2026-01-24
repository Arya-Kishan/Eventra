import {CustomImage} from '@components/global/CustomImage';
import CustomText from '@components/global/CustomText';
import DeleteModal from '@components/global/DeleteModal';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import ThreeDotBottomModal from '@components/global/ThreeDotBottomModal';
import TimeSlot from '@components/venue/TimeSlot';
import VenueReviewCard from '@components/venue/VenueReviewCard';
import {AppConstants} from '@constants/AppConstants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {getSingleVenueApi, updateVenueApi} from '@services/VenueServices';
import {useAppSelector} from '@store/hooks';
import {createShareLink} from '@utils/DeepLinkService';
import {openLocationInMaps} from '@utils/DeviceHelper';
import {formatISODate, showToast} from '@utils/Helper';
import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {
  CommentType,
  NavigationProps,
  RootStackParamList,
  ThreeDotBottomModalType,
  VenueType,
} from 'types/AppTypes';

type VenueDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'VenueDetailScreen'
>;

interface VenueDetailScreenType {
  isCreatingEvent?: boolean;
}

const VenueDetailScreen: FC<VenueDetailScreenType> = ({
  isCreatingEvent = false,
}) => {
  const {params} = useRoute<VenueDetailScreenRouteProp>();
  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComments] = useState<string>('');
  const {loggedInUser} = useAppSelector(store => store.user);
  const [venueDetail, setVenueDetail] = useState<VenueType | null>(null);
  const navigation = useNavigation<NavigationProps<'VenueDetailScreen'>>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const bottomModalDataArr: ThreeDotBottomModalType['dataArr'] = [
    {
      title: 'Edit',
      description: 'Edit Your Details',
      icon: (
        <Icon icon="edit" iconType="Feather" color={AppConstants.redColor} />
      ),
      value: 'edit',
    },
    {
      title: 'Delete',
      description: 'Delete Your Details',
      icon: (
        <Icon
          icon="delete"
          iconType="MaterialIcons"
          color={AppConstants.redColor}
        />
      ),
      value: 'delete',
    },
    {
      title: 'Share',
      description: 'Share This Event',
      icon: (
        <Icon icon="share" iconType="Entypo" color={AppConstants.redColor} />
      ),
      value: 'share',
    },
  ];

  const handleThreeDotModalClick = (val: string) => {
    if (val === 'edit') {
      navigation.navigate('CreateVenueScreen', {
        venue: venueDetail,
        method: 'update',
      });
    } else if (val === 'delete') {
      setShowDeleteModal(true);
    } else if (val === 'share') {
      createShareLink({
        feature: 'venue',
        action: 'share',
        docId: params.venueId ?? venueDetail!._id,
      });
    }
  };

  const handleDelete = async () => {};

  const addComment = async () => {
    const formdata = new FormData();
    formdata.append(
      'reviews',
      JSON.stringify({user: loggedInUser?._id, comment: comment}),
    );
    const {success} = await updateVenueApi(formdata, venueDetail!._id);
    if (success) {
      setCommentModal(false);
      setComments('');
    } else {
      showToast({
        title: 'Not Added !',
        description: 'Some Error Occured',
        type: 'error',
      });
    }
  };

  const fetchSingleEvent = async () => {
    const {data, success} = await getSingleVenueApi(params.venueId);
    success ? setVenueDetail(data.data) : navigation.navigate('ErrorScreen');
  };

  useEffect(() => {
    fetchSingleEvent();
  }, []);

  return (
    <View style={styles.flex}>
      {venueDetail && (
        <ScrollView style={styles.scrollView}>
          {/* TITLE,LOCATION,ORICE */}
          <View
            style={{
              padding: AppConstants.screenPadding,
              gap: vs(6),
              paddingBottom: vs(60),
            }}>
            <CustomImage
              source={venueDetail.pic.url}
              width={'100%'}
              height={vs(250)}
            />

            <View style={styles.shadowContainer}>
              <View style={styles.venueBox}>
                <CustomText numberOfLines={2} variant="h3" fontWeight="700">
                  {venueDetail.title}
                </CustomText>

                <View style={styles.addressBox}>
                  <Icon
                    icon="map-marker"
                    iconType="MaterialCommunityIcons"
                    color={AppConstants.grayColor}
                    size={s(16)}
                  />
                  <CustomText
                    numberOfLines={2}
                    fontWeight="500"
                    style={
                      styles.address
                    }>{`${venueDetail.address?.area}`}</CustomText>
                </View>
              </View>

              <RoundedBox
                size={s(60)}
                rounded={s(10)}
                viewStyle={{backgroundColor: AppConstants.redColor}}>
                <Icon
                  icon="fireplace-off"
                  iconType="MaterialCommunityIcons"
                  color={AppConstants.whiteColor}
                  size={s(30)}
                />
              </RoundedBox>
            </View>

            {/* ABOUT VENUE,LOCATION IN MAP, SLOTS,REVIEW */}
            <View style={[styles.commomShade, {gap: vs(10)}]}>
              {/* ABOUT */}
              <View>
                <View style={styles.aboutBox}>
                  <CustomText variant="h5">About Venue</CustomText>

                  <RoundedBox
                    viewStyle={{backgroundColor: AppConstants.redColor}}
                    onPress={() => {
                      openLocationInMaps(
                        Number(venueDetail.location?.coordinates[1]),
                        Number(venueDetail.location?.coordinates[0]),
                      );
                    }}
                    size={s(25)}>
                    <Icon
                      icon="location-arrow"
                      iconType="FontAwesome5"
                      color={AppConstants.whiteColor}
                      size={s(12)}
                    />
                  </RoundedBox>
                </View>
                <CustomText variant="body1" numberOfLines={8}>
                  {venueDetail.description}
                </CustomText>
              </View>

              {/* SLOTS */}
              <View style={styles.reviewBox}>
                <CustomText variant="h5">Slots</CustomText>
              </View>

              <View style={styles.slot}>
                {venueDetail.slots.map((item, index) => (
                  <TimeSlot
                    key={index}
                    end={formatISODate(item.time.end).hours.toString()}
                    start={formatISODate(item.time.start).hours.toString()}
                    isBooked={item.isBooked}
                    selected={false}
                  />
                ))}
              </View>

              {/* REVIEWS */}
              <View style={styles.reviewBox}>
                <CustomText variant="h5">Reviews</CustomText>
                <RoundedBox
                  size={s(25)}
                  viewStyle={{backgroundColor: AppConstants.redColor}}
                  onPress={() => setCommentModal(true)}>
                  <Icon icon="add" iconType="MaterialIcons" />
                </RoundedBox>
              </View>

              <FlatList
                data={venueDetail!.reviews}
                renderItem={({item}: {item: CommentType}) => (
                  <VenueReviewCard
                    createAt={item.createdAt}
                    name={item.user.name}
                    profilePic={item.user.profilePic!.url}
                    review={item.comment}
                    star={Number(item.star)}
                  />
                )}
                scrollEnabled={false}
                ListEmptyComponent={() => (
                  <View>
                    <Text>NO REVIEWS</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      )}

      {isCreatingEvent && (
        <View style={styles.priceBox}>
          <CustomText fontWeight="800">$120</CustomText>

          <RoundedButton
            onPress={() => {}}
            title="Select"
            style={{paddingVertical: s(8)}}
          />
        </View>
      )}

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

      <DeleteModal
        onCancel={() => setShowDeleteModal(false)}
        onDelete={() => handleDelete()}
        setShow={setShowDeleteModal}
        show={showDeleteModal}
      />

      {/* MODAL FOR ADDING COMMENT */}
      <Modal
        visible={commentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCommentModal(false)}>
        <Pressable
          onPress={() => setCommentModal(false)}
          style={styles.modalBox}>
          <View style={styles.commentBox}>
            <CustomText variant="h5" style={{color: AppConstants.whiteColor}}>
              Write a comment !
            </CustomText>

            <TextInput
              multiline
              style={styles.input}
              value={comment}
              onChangeText={setComments}
              placeholder="assssss"
            />

            <RoundedButton title="Add Comment" onPress={addComment} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default VenueDetailScreen;

const styles = StyleSheet.create({
  flex: {flex: 1},
  scrollView: {flex: 1, backgroundColor: AppConstants.screenBgColor},
  commomShade: {
    width: '100%',
    padding: s(10),
    backgroundColor: AppConstants.whiteColor,
    elevation: 2,
    borderRadius: s(10),
  },
  shadowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    padding: s(10),
    backgroundColor: AppConstants.whiteColor,
    elevation: 2,
    borderRadius: s(10),
  },
  venueBox: {
    justifyContent: 'space-between',
    width: '70%',
    gap: vs(6),
  },
  aboutBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontSize: s(14),
    color: AppConstants.darkGrayColor,
  },
  addressBox: {flexDirection: 'row', gap: s(2), alignItems: 'center'},
  slot: {
    flexDirection: 'row',
    gap: s(10),
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: vs(8),
  },
  reviewBox: {flexDirection: 'row', justifyContent: 'space-between'},
  modalBox: {
    flex: 1,
    backgroundColor: '#000000D6',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  input: {
    height: vs(100),
    textAlignVertical: 'top',
    backgroundColor: AppConstants.whiteColor,
    borderRadius: s(10),
    padding: s(10),
  },
  commentBox: {
    width: '100%',
    backgroundColor: '#FF0000D6',
    padding: s(15),
    borderRadius: s(20),
    gap: vs(10),
  },
  priceBox: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppConstants.whiteColor,
    elevation: 4,
    paddingHorizontal: AppConstants.screenPadding,
    paddingVertical: vs(6),
  },
  threeDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
});
