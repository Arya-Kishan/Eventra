import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';
import SmallVenueSkeleton from '@components/Skeletons/SmallVenueSkeleton';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {getAllVenueApi} from '@services/VenueServices';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {vs} from 'react-native-size-matters';
import {NavigationProps, VenueType} from 'types/AppTypes';

type Props<T> = {
  data: T[];
  itemsPerColumn?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
};

const chunkData = <T,>(arr: T[], size: number): T[][] => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

function DoubleHorizontalFlatList<T>({
  data,
  itemsPerColumn = 2,
  renderItem,
}: Props<T>) {
  const navigate = useNavigation<NavigationProps<'Main'>>();

  const [allVenues, setAllVenues] = useState<null | VenueType[]>(null);
  const [loader, setLoader] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoader(true);
      const {data: venueData, success} = await getAllVenueApi({type: 'all'});
      if (success) setAllVenues(venueData.data);
      if (!success) console.error('Error in getting all venues in homescreen');
      setLoader(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loader ? (
        <SmallVenueSkeleton />
      ) : allVenues && allVenues.length === 0 ? (
        <EmptyData
          title="No Venues"
          textStyle={styles.empty}
          handleAddClick={() =>
            navigate.navigate('CreateVenueScreen', {method: 'create'})
          }
        />
      ) : (
        <FlatList
          data={allVenues && chunkData(allVenues, itemsPerColumn)}
          horizontal
          keyExtractor={(_, index) => `column-${index}`}
          renderItem={({item, index}) => (
            <View style={styles.column}>
              {item.map((itemData, idx) =>
                renderItem(itemData, idx + index * itemsPerColumn),
              )}
            </View>
          )}
          contentContainerStyle={styles.container}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: AppConstants.defaultGap,
    minHeight: vs(120),
  },
  column: {
    gap: AppConstants.defaultGap,
  },
  empty: {fontWeight: '600'},
});

export default DoubleHorizontalFlatList;
