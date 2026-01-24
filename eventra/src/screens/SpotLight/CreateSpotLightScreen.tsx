import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createspotLightApi} from '@services/SpotLightServices';
import {showToast} from '@utils/Helper';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {s, vs} from 'react-native-size-matters';
import {RouteProps} from 'types/AppTypes';

const CreateSpotLightScreen = () => {
  const {
    params: {category, categoryId},
  } = useRoute<RouteProps<'CreateSpotLightScreen'>>();
  const navigation = useNavigation();
  const [image, setImage] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (response: any) => {
      if (response.didCancel) return;
      if (response.errorCode) return;
      const selectedImage = response.assets[0];
      setImage(selectedImage);
    });
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert('Missing Image', 'Please select an image for your spotlight');
      return;
    }
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title for your spotlight');
      return;
    }
    if (!description.trim()) {
      Alert.alert(
        'Missing Description',
        'Please enter a description for your spotlight',
      );
      return;
    }

    setLoading(true);
    console.log('aimge : ', image);
    try {
      // Your API call or submission logic
      console.log('Submitting spotlight request...');
      const formdata = new FormData();
      formdata.append('title', title);
      formdata.append('description', description);
      formdata.append('category', category);
      formdata.append('categoryId', categoryId);
      formdata.append(
        'deepLink',
        `${AppConstants.appUniversalLink}/${category}/share/${categoryId}`,
      );
      formdata.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      } as any);
      const {data, success} = await createspotLightApi(formdata);
      if (!success)
        return showToast({
          title: 'Error in submitting spotlight request',
          type: 'error',
        });
      // Reset form
      setImage(null);
      setTitle('');
      setDescription('');
      navigation.goBack();
      showToast({
        title: 'Spotlight request submitted successfully',
        type: 'success',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to submit spotlight request');
      console.log('ERROR IN CREATING SPOT LIGHT : ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden={false} backgroundColor={AppConstants.redColor} />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon icon="arrow-left" iconType="FontAwesome5" size={s(20)} />
        </Pressable>
        <CustomText variant="h2" style={styles.headerText}>
          Create Spotlight
        </CustomText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* SPOTLIGHT IMAGE */}
          <Pressable onPress={pickImage} style={styles.fieldContainer}>
            <CustomText variant="h6">Spotlight Image</CustomText>
            <View style={styles.picContainer}>
              {image ? (
                <Image
                  source={{uri: image.uri}}
                  style={styles.pic}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.picWrapper}>
                  <Icon
                    icon="image"
                    iconType="Feather"
                    size={s(40)}
                    color={AppConstants.redColor}
                  />
                  <CustomText variant="body1" style={styles.uploadText}>
                    Tap to Upload Image
                  </CustomText>
                  <CustomText variant="subtitle1" style={styles.uploadSubtext}>
                    Vertical photos work best (9:16)
                  </CustomText>
                </View>
              )}
            </View>
          </Pressable>

          {/* TITLE */}
          <View style={styles.fieldContainer}>
            <CustomText variant="h6">Title</CustomText>
            <TextInput
              value={title}
              placeholder="Enter spotlight title..."
              placeholderTextColor={AppConstants.grayLightColor}
              onChangeText={setTitle}
              maxLength={60}
              style={styles.input}
            />
            <CustomText variant="subtitle1" style={styles.characterCount}>
              {title.length}/60
            </CustomText>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.fieldContainer}>
            <CustomText variant="h6">Description</CustomText>
            <TextInput
              numberOfLines={4}
              multiline
              value={description}
              placeholder="Enter spotlight description..."
              placeholderTextColor={AppConstants.grayLightColor}
              onChangeText={setDescription}
              maxLength={200}
              style={[styles.input, styles.textArea]}
              textAlignVertical="top"
            />
            <CustomText variant="subtitle1" style={styles.characterCount}>
              {description.length}/200
            </CustomText>
          </View>

          {/* INFO SECTION */}
          <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
              <Icon
                icon="info-circle"
                iconType="FontAwesome"
                size={s(18)}
                color={AppConstants.redColor}
              />
              <CustomText variant="h6" style={styles.infoTitle}>
                What is a Spotlight?
              </CustomText>
            </View>
            <CustomText
              variant="body1"
              style={styles.infoText}
              numberOfLines={5}>
              Spotlights feature your content prominently on the home screen,
              increasing visibility and engagement. Your content will be seen by
              more users across Eventra.
            </CustomText>
          </View>

          {/* SUBMIT BUTTON */}
          <RoundedButton
            loading={loading}
            title="Request Spotlight"
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateSpotLightScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppConstants.whiteColor,
  },
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
  input: {
    backgroundColor: AppConstants.whiteColor,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: vs(45),
    padding: s(10),
    borderRadius: s(6),
    fontSize: s(14),
  },
  textArea: {
    height: vs(100),
    paddingTop: s(12),
  },
  characterCount: {
    textAlign: 'right',
    color: AppConstants.grayColor,
    fontSize: s(11),
    marginTop: vs(-3),
  },
  picContainer: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: s(6),
    height: vs(280),
    overflow: 'hidden',
  },
  pic: {
    flex: 1,
    width: '100%',
  },
  picWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(8),
  },
  uploadText: {
    fontSize: s(15),
    fontWeight: '600',
    color: AppConstants.black,
  },
  uploadSubtext: {
    fontSize: s(12),
    color: AppConstants.grayColor,
  },
  infoCard: {
    backgroundColor: AppConstants.lightRedColor,
    borderWidth: 1,
    borderColor: AppConstants.redColor + '30',
    borderRadius: s(8),
    padding: s(14),
    gap: vs(8),
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  infoTitle: {
    fontSize: s(15),
    fontWeight: '600',
    color: AppConstants.black,
  },
  infoText: {
    fontSize: s(13),
    color: '#333',
    lineHeight: s(18),
  },
});
