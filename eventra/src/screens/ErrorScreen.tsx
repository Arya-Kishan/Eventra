import CustomText from '@components/global/CustomText';
import RoundedButton from '@components/global/RoundedButton';
import {AppConstants} from '@constants/AppConstants';
import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {NavigationProps} from 'types/AppTypes';

type ErrorScreenProps = {};

const ErrorScreen: FC<ErrorScreenProps> = ({}) => {
  const navigation = useNavigation<NavigationProps<'EventDetailScreen'>>();
  return (
    <View style={styles.main}>
      <View style={{width: s(200), height: s(200)}}>
        <Image
          source={require('@assets/images/error.png')}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </View>

      <CustomText variant="h2">Something Went Wrong</CustomText>

      <View style={{justifyContent: 'center'}}>
        <CustomText variant="body2" style={{textAlign: 'center'}}>
          We encounter an issue
        </CustomText>
        <CustomText variant="body2" style={{textAlign: 'center'}}>
          while trying to connect to server
        </CustomText>
      </View>

      <CustomText variant="body2">Please Try after sometime 😢</CustomText>

      <RoundedButton
        title="Return to home"
        onPress={() => {
          navigation.replace('Main');
        }}
      />
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(20),
    paddingHorizontal: AppConstants.screenPadding,
  },
});
