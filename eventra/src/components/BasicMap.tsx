// BasicMap.js
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { s } from 'react-native-size-matters';

const BasicMap = () => {
    const region = {
        latitude: 37.78825,     // Example: San Francisco
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
            >
                <Marker coordinate={region} title="Marker Title" description="Marker Description" />
            </MapView>
        </View>
    );
};

export default BasicMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: s(300),
        height: s(300),
    },
});
