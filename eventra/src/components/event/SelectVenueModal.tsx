import CustomModal from '@components/global/CustomModal';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setTime, setVenue} from '@store/reducers/eventSlice';
import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {slotType, userType, VenueType} from 'types/AppTypes';
import SelectVenueSlot from './SelectVenueSlot';
import {getAllVenueApi} from '@services/VenueServices';
import {AppConstants} from '@constants/AppConstants';
import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';

interface SelectVenueModalProps {
  show: boolean;
  setShow: (val: boolean) => void;
}

const SelectVenueModal: FC<SelectVenueModalProps> = ({setShow, show}) => {
  const [allVenues, setAllVenues] = useState<null | VenueType[]>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const {venue} = useAppSelector(store => store.event);
  const {loggedInUser} = useAppSelector(store => store.user);
  const dispatch = useAppDispatch();

  const fetchAllVenues = async ({
    searchQuery = '',
    type = 'all',
    location = loggedInUser?.location,
  }: {
    searchQuery?: string;
    type: 'all' | 'search' | 'nearBy';
    location?: userType['location'];
  }) => {
    setLoader(true);
    const {data, success} = await getAllVenueApi({
      searchQuery,
      type,
      location,
    });
    success && setAllVenues(data.data);
    setLoader(false);
  };

  useEffect(() => {
    fetchAllVenues({type: 'all'});
  }, []);

  console.log(allVenues);

  return (
    <CustomModal show={show} setShow={setShow}>
      <View style={styles.main}>
        {loader ? (
          <CustomLoader />
        ) : allVenues && allVenues.length === 0 ? (
          <EmptyData title="nO venues" />
        ) : (
          <FlatList
            data={allVenues}
            renderItem={({item}) => (
              <SelectVenueSlot
                handleSelectSlot={(slot: slotType) => {
                  dispatch(
                    setTime({start: slot.time.start, end: slot.time.end}),
                  );
                }}
                handleSelectVenue={() => {
                  dispatch(setVenue(item));
                }}
                venue={item}
                selectedVenue={venue}
              />
            )}
            contentContainerStyle={{
              width: AppConstants.screenWidth * 0.9 - s(20),
              gap: vs(15),
            }}
            keyExtractor={item => item._id.toString()}
          />
        )}
      </View>
    </CustomModal>
  );
};

export default SelectVenueModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: AppConstants.screenHeight,
    width: AppConstants.screenWidth * 0.9,
  },
  flex: {flex: 1},
});
