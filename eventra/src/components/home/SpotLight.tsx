import EmptyData from '@components/global/EmptyData';
import SpotLightCard from '@components/spotlight/SpotLightCard';
import {AppConstants} from '@constants/AppConstants';
import {AppTemporaryContants} from '@constants/AppTemporaryConstants';
import {getAllSpotLightApi} from '@services/SpotLightServices';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import {SpotLightType} from 'types/AppTypes';

const SpotLight = () => {
  const [spotLights, setSpotLights] = useState<SpotLightType[] | null>(
    AppTemporaryContants.spotLightsArr,
  );

  const getAllSpotLights = async () => {
    const {data, success} = await getAllSpotLightApi();
    console.log('SPOTLIGHT DATA : ', data);
    success ? setSpotLights(data.data) : '';
  };

  useEffect(() => {
    // getAllSpotLights();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Button title="GET" onPress={getAllSpotLights} /> */}
      {spotLights !== null && spotLights.length == 0 ? (
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

const styles = StyleSheet.create({});
