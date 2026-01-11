import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC, ReactNode} from 'react';
import {s, vs} from 'react-native-size-matters';
import RoundedBox from './RoundedBox';
import Icon from './Icon';
import {AppConstants} from '@constants/AppConstants';

interface CustomModalType {
  children: ReactNode;
  setShow: (val: boolean) => void;
  show: boolean;
}

const CustomModal: FC<CustomModalType> = ({children, setShow, show}) => {
  return (
    <Modal
      visible={show}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShow(false)}>
      <View style={styles.main}>
        <View style={styles.main2}>{children}</View>
        <RoundedBox
          onPress={() => setShow(false)}
          size={s(40)}
          viewStyle={{backgroundColor: AppConstants.redColor}}>
          <Icon icon="x" iconType="Feather" />
        </RoundedBox>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000CE',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(10),
  },
  main2: {
    backgroundColor: '#FFFFFF',
    padding: s(10),
    maxHeight: '80%',
    maxWidth: '90%',
    borderRadius: s(20),
  },
});
