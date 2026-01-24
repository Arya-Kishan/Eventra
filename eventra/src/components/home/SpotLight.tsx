import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';
import SpotLightCard from '@components/spotlight/SpotLightCard';
import {AppConstants} from '@constants/AppConstants';
import {AppTemporaryContants} from '@constants/AppTemporaryConstants';
import {getAllSpotLightApi} from '@services/SpotLightServices';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import {vs} from 'react-native-size-matters';
import {SpotLightType} from 'types/AppTypes';

const SpotLight = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [spotLights, setSpotLights] = useState<SpotLightType[] | null>(null);

  const getAllSpotLights = async () => {
    try {
      setLoading(true);
      const {data, success} = await getAllSpotLightApi();
      console.log('SPOTLIGHT DATA : ', data);
      success ? setSpotLights(data.data) : '';
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('SPOTLIGHT ERROR : ', error);
    }
  };

  useEffect(() => {
    getAllSpotLights();
  }, []);

  return (
    <View style={styles.main}>
      {/* <Button title="GET" onPress={getAllSpotLights} /> */}
      {loading ? (
        <CustomLoader />
      ) : spotLights !== null && spotLights.length == 0 ? (
        <EmptyData title="NO DATA" showBtn={false} />
      ) : (
        <FlatList
          data={spotLights}
          horizontal
          keyExtractor={(_, index) => `column-${index}`}
          renderItem={({item, index}) => (
            <SpotLightCard item={item} index={index} />
          )}
          contentContainerStyle={{gap: AppConstants.defaultGap}}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default SpotLight;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: vs(205),
  },
});
