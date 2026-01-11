import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomImage} from './global/CustomImage';
import {s} from 'react-native-size-matters';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomImage source="" width={s(100)} height={s(100)} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
