import CustomSafeScreen from '@components/CustomSafeScreen';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import SmallEventCard from '@components/home/SmallEventCard';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {createPostApi} from '@services/PostService';
import {useAppSelector} from '@store/hooks';
import {showToast} from '@utils/Helper';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {s, vs} from 'react-native-size-matters';
import {AssetType, EventType, NavigationProps} from 'types/AppTypes';

const CreatePostScreen = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [inputHeight, setInputHeight] = useState(40);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [event, setEvent] = useState<EventType | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [pic, setPic] = useState<AssetType>({uri: '', fileName: '', type: ''});
  const [selectEventModal, setSelectEventModal] = useState<boolean>(false);

  const {allEvents} = useAppSelector(store => store.event);
  const {loggedInUser} = useAppSelector(store => store.user);
  const navigation = useNavigation<NavigationProps<'CreatePostScreen'>>();

  const pickImage = () => {
    launchImageLibrary({mediaType: 'mixed'}, (response: any) => {
      if (response.didCancel) console.log('User cancelled image picker');
      else if (response.errorCode)
        console.log('ImagePicker Error: ', response.errorMessage);
      else setPic(response.assets[0]);
    });
  };

  const handleCreatePost = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('user', loggedInUser?._id);
    formData.append('event', event?._id ?? null);
    formData.append('tags', JSON.stringify(tags));

    let fileType = pic!.type!.startsWith('video/') ? 'video' : 'image';
    formData.append(fileType, {
      uri: pic.uri,
      name: pic.fileName,
      type: pic.type,
    });
    formData.append('type', fileType);

    const {success} = await createPostApi(formData);
    if (success) {
      navigation.navigate('Main', {screen: 'Social'});
      showToast({
        title: 'Success',
        description: 'New Post Created',
        type: 'success',
      });
    } else {
      showToast({
        title: 'Failed',
        description: 'New Post Not Created',
        type: 'error',
      });
    }
    setLoader(false);
  };

  const handleDeleteTag = (tag: string) =>
    setTags(prev => prev.filter(item => item !== tag));
  const handleAddTags = () => {
    setTags(prev => [...prev, tagText]);
    setTagText('');
  };

  return (
    <CustomSafeScreen style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon icon="arrow-left" iconType="FontAwesome5" size={s(20)} />
          </Pressable>
          <CustomText variant="h2" style={styles.headerTitle}>
            Create Post
          </CustomText>
        </View>

        <ScrollView>
          <View style={styles.content}>
            {/* Title */}
            <View style={styles.section}>
              <CustomText variant="h6">Title</CustomText>
              <TextInput
                value={title}
                placeholder="Enter Event Name"
                onChangeText={setTitle}
                style={styles.input}
                placeholderTextColor={AppConstants.grayColor}
              />
            </View>

            {/* Description */}
            <View style={styles.section}>
              <CustomText variant="h6">Description</CustomText>
              <TextInput
                multiline
                value={description}
                placeholder="Enter Description"
                onChangeText={setDescription}
                placeholderTextColor={AppConstants.grayColor}
                style={styles.input}
                onContentSizeChange={e =>
                  setInputHeight(e.nativeEvent.contentSize.height)
                }
              />
            </View>

            {/* Pic */}
            <View style={styles.section}>
              <CustomText variant="h6">Pic</CustomText>
              <View style={styles.picContainer}>
                {pic.uri === '' ? (
                  <Pressable onPress={pickImage} style={styles.pickImage}>
                    <RoundedBox size={s(40)} viewStyle={styles.pickImageBox}>
                      <Icon icon="image" iconType="Feather" size={s(20)} />
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
            </View>

            {/* Tags */}
            <CustomText variant="h6">Tags</CustomText>
            <View style={styles.tagInputContainer}>
              <TextInput
                placeholder="Select Start Time"
                value={tagText}
                style={styles.input}
                onChangeText={setTagText}
                placeholderTextColor={AppConstants.grayColor}
              />
              <RoundedBox
                size={s(20)}
                viewStyle={styles.addTagBtn}
                onPress={handleAddTags}>
                <Icon icon="plus" iconType="Feather" size={s(20)} />
              </RoundedBox>
            </View>

            {/* Selected Tags */}
            <FlatList
              data={tags}
              renderItem={({item}) => (
                <View style={styles.tagItem}>
                  <View style={styles.timeBox}>
                    <CustomText style={styles.tagText}>{item}</CustomText>
                  </View>
                  <RoundedBox
                    size={s(25)}
                    viewStyle={styles.removeTagBtn}
                    onPress={() => handleDeleteTag(item)}>
                    <Icon icon="x" iconType="Feather" size={s(20)} />
                  </RoundedBox>
                </View>
              )}
              horizontal
              keyExtractor={item => item}
              contentContainerStyle={styles.tagList}
              scrollEnabled={false}
            />

            {/* Event */}
            <View style={styles.section}>
              <CustomText variant="h6">Event (optional)</CustomText>
              <Pressable
                style={styles.eventSelect}
                onPress={() => setSelectEventModal(true)}>
                <TextInput
                  value={event?.title}
                  placeholder="Select Event"
                  onChangeText={setTitle}
                  editable={false}
                  style={styles.input}
                  placeholderTextColor={AppConstants.grayColor}
                />
                <Icon
                  icon="fireplace-off"
                  iconType="MaterialCommunityIcons"
                  size={s(18)}
                  color={AppConstants.redColor}
                />
              </Pressable>
            </View>

            <RoundedButton
              loading={loader}
              title="Create"
              onPress={handleCreatePost}
            />
          </View>
        </ScrollView>

        {/* Event Selection Modal */}
        <Modal
          visible={selectEventModal}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectEventModal(false)}>
          <View style={styles.modalOverlay}>
            <RoundedBox
              size={s(49)}
              viewStyle={styles.modalCloseBtn}
              onPress={() => setSelectEventModal(false)}>
              <Icon icon="x" iconType="Feather" size={s(30)} />
            </RoundedBox>
            <View style={styles.modalContent}>
              <FlatList
                data={allEvents}
                renderItem={({
                  item,
                  index,
                }: {
                  item: EventType;
                  index: number;
                }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setEvent(item);
                      setSelectEventModal(false);
                    }}
                    style={styles.modalEventItem}>
                    <SmallEventCard
                      item={item}
                      index={index}
                      navigationScreen="CreatePostScreen"
                    />
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.modalList}
                keyExtractor={item => item._id}
              />
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </CustomSafeScreen>
  );
};

export default CreatePostScreen;

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
  section: {
    gap: vs(6),
  },
  input: {
    backgroundColor: AppConstants.grayLightColor,
    flex: 1,
    padding: s(8),
    width: '100%',
    borderRadius: AppConstants.borderRadius,
  },
  picContainer: {
    backgroundColor: AppConstants.whiteColor,
    flex: 1,
    height: AppConstants.screenWidth - AppConstants.screenPadding * 2,
    borderRadius: AppConstants.borderRadius,
  },
  pickImage: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  pickImageBox: {backgroundColor: AppConstants.redColor},
  picWrapper: {position: 'relative'},
  pic: {width: '100%', height: '100%', aspectRatio: 1, resizeMode: 'cover'},
  removePicBtn: {
    backgroundColor: AppConstants.redColor,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  tagInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    alignItems: 'center',
    backgroundColor: AppConstants.grayLightColor,
    borderRadius: AppConstants.borderRadius,
    paddingRight: 10,
  },
  addTagBtn: {backgroundColor: AppConstants.redColor},
  tagList: {gap: vs(10)},
  tagItem: {
    flexDirection: 'row',
    gap: s(20),
    backgroundColor: AppConstants.whiteColor,
    alignItems: 'center',
    padding: 5,
  },
  timeBox: {
    padding: s(6),
    minWidth: s(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {textAlign: 'center'},
  removeTagBtn: {backgroundColor: AppConstants.redColor},
  eventSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppConstants.grayLightColor,
    alignItems: 'center',
    paddingRight: 10,
    borderRadius: AppConstants.borderRadius,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000D6',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: vs(10),
  },
  modalCloseBtn: {backgroundColor: AppConstants.redColor},
  modalContent: {
    width: '100%',
    backgroundColor: '#FF0000D6',
    padding: s(15),
    borderRadius: s(20),
    gap: vs(10),
    height: vs(300),
  },
  modalEventItem: {
    backgroundColor: AppConstants.whiteColor,
    padding: 10,
    borderRadius: 20,
  },
  modalList: {
    padding: AppConstants.screenPadding,
    gap: AppConstants.defaultGap,
  },
});
