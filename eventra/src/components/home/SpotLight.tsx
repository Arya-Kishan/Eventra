import SpotLightCard from '@components/spotlight/SpotLightCard';
import { AppConstants } from '@constants/AppConstants';
import { AppTemporaryContants } from '@constants/AppTemporaryConstants';
import { getAllSpotLightApi } from '@services/SpotLightServices';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SpotLightType } from 'types/AppTypes';

const SpotLight = () => {

    const [spotLights, setSpotLights] = useState<SpotLightType[] | null>(null);

    const getAllSpotLights = async () => {
        const { data, success } = await getAllSpotLightApi();
        success ? setSpotLights(data.data) : "";
    }

    useEffect(() => {
        getAllSpotLights();
    }, [])

    return (
        <View>
            {
                spotLights !== null &&
                <FlatList
                    data={AppTemporaryContants.spotLightsArr}
                    horizontal
                    keyExtractor={(_, index) => `column-${index}`}
                    renderItem={({ item, index }) => (
                        <SpotLightCard item={item} index={index} />
                    )}
                    contentContainerStyle={{ gap: AppConstants.defaultGap }}
                    showsHorizontalScrollIndicator={false}
                />
            }
        </View>
    )
}

export default SpotLight

const styles = StyleSheet.create({})