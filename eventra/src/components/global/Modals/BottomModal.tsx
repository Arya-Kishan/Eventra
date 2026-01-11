import {AppConstants} from '@constants/AppConstants';
import React, {FC} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {s, vs} from 'react-native-size-matters';
import CustomText from '../CustomText';
import RoundedButton from '../RoundedButton';

interface BottomModalType {
  setShow: (val: boolean) => void;
  show: boolean;
}

const BottomModal: FC<BottomModalType> = ({setShow, show}) => {
  return (
    <Modal
      visible={show}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShow(false)}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000D6',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#FF0000D6',
            padding: s(15),
            borderRadius: s(20),
            gap: vs(10),
          }}>
          <CustomText variant="h5" style={{color: AppConstants.whiteColor}}>
            Write a comment !
          </CustomText>

          <TextInput
            multiline
            style={{
              height: vs(100),
              textAlignVertical: 'top',
              backgroundColor: AppConstants.whiteColor,
              borderRadius: s(10),
              padding: s(10),
            }}
            value=""
            onChangeText={() => {}}
            placeholder="assssss"
          />

          <RoundedButton title="Add Comment" onPress={() => {}} />
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({});
