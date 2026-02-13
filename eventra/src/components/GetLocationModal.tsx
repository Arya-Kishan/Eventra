import {AppConstants} from '@constants/AppConstants';
import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {s} from 'react-native-size-matters';
import CustomModal from './global/CustomModal';
import CustomText from './global/CustomText';

interface GetLocationModalProps {
  show: any;
  setShow: any;
  setAddresses: any;
}

const GetLocationModal: FC<GetLocationModalProps> = ({
  show,
  setShow,
  setAddresses,
}) => {
  return (
    <CustomModal show={show} setShow={setShow}>
      <View style={styles.parent}>
        <GooglePlacesAutocomplete
          placeholder="Search Your Location..."
          textInputProps={{
            placeholderTextColor: AppConstants.grayColor,
          }}
          fetchDetails={true}
          debounce={2000}
          minLength={3}
          onFail={error => {
            console.log('Google Places Error:', error);
          }}
          onTimeout={() => console.log('Places timeout')}
          onPress={(data, details = null) => {
            const userLocation: any = {};

            if (details?.address_components?.length) {
              for (const item of details.address_components) {
                const types = item.types;

                if (types.includes('country')) {
                  userLocation.country = item.long_name;
                } else if (types.includes('postal_code')) {
                  userLocation.postalCode = item.long_name;
                } else if (types.includes('administrative_area_level_1')) {
                  userLocation.state = item.long_name;
                }
              }

              userLocation.area = data?.description ?? '';
              userLocation.coords = [
                details.geometry.location.lng,
                details.geometry.location.lat,
              ];
            }

            setAddresses(userLocation);
            setShow(false);
          }}
          query={{
            key: 'AIzaSyAHv_z_vgUGrfNpIQjBN0N52YunphIUKP4',
            language: 'en',
            components: 'country:in',
          }}
          styles={{
            container: {
              flex: 0,
              width: AppConstants.screenWidth * 0.9 - s(20),
            },
            textInput: {
              borderRadius: 10,
              fontSize: 16,
              backgroundColor: AppConstants.whiteColor,
              borderBottomColor: AppConstants.grayColor,
              borderWidth: 2,
            },
            listView: {
              backgroundColor: '#fff',
              borderRadius: 10,
              marginTop: 8,
              elevation: 5, // Android shadow
            },
            row: {
              padding: 14,
            },
            description: {
              fontSize: 14,
              color: '#333',
            },
            separator: {
              height: 0.5,
              backgroundColor: '#E0E0E0',
            },
            poweredContainer: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
          listLoaderComponent={
            <View style={{paddingVertical: 10, alignItems: 'center'}}>
              <ActivityIndicator />
            </View>
          }
        />
      </View>
      <CustomText
        numberOfLines={2}
        fontWeight="700"
        style={{textAlign: 'center'}}>
        Note: Search results may take a few seconds to load
      </CustomText>
    </CustomModal>
  );
};

export default GetLocationModal;

const styles = StyleSheet.create({
  parent: {
    width: AppConstants.screenWidth - AppConstants.screenPadding * 2,
    flex: 1,
  },
});
