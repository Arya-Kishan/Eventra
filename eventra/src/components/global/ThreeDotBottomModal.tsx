import {AppConstants} from '@constants/AppConstants';
import React, {FC, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import {ThreeDotBottomModalType} from 'types/AppTypes';
import CustomText from './CustomText';
import DeleteModal from './DeleteModal';
import Icon from './Icon';
import RoundedBox from './RoundedBox';

const ThreeDotBottomModal: FC<ThreeDotBottomModalType> = ({
  dataArr,
  show,
  setShow,
  onClick,
}) => {
  const handleBtnPress = (value: string) => {
    onClick(value);
    setShow(false);
  };

  return (
    <>
      <RoundedBox
        onPress={() => setShow(true)}
        size={s(30)}
        viewStyle={styles.close}>
        <Icon
          icon="dots-vertical"
          iconType="MaterialCommunityIcons"
          size={s(25)}
        />
      </RoundedBox>

      <Modal
        visible={show}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShow(false)}>
        <Pressable
          onPress={() => {
            setShow(false);
          }}
          style={styles.main}>
          <Pressable onPress={() => {}} style={styles.main2}>
            <View style={styles.main2}>
              {dataArr.map(item => (
                <TouchableOpacity
                  key={item.title}
                  activeOpacity={0.5}
                  onPress={() => handleBtnPress(item.value)}
                  style={styles.optionBox}>
                  <View style={{width: '90%'}}>
                    <CustomText variant="h4">{item.title}</CustomText>
                    <CustomText numberOfLines={2}>
                      {item.description}
                    </CustomText>
                  </View>

                  {item.icon}
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default ThreeDotBottomModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000CE',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: vs(10),
  },
  main2: {
    backgroundColor: '#FFFFFF',
    padding: s(20),
    maxHeight: '80%',
    width: '100%',
    borderRadius: s(20),
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: AppConstants.redColor,
  },
  column: {flexDirection: 'row', justifyContent: 'space-between'},
  optionBox: {
    padding: s(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
