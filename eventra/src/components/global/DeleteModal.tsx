import React, {FC} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import {s, vs} from 'react-native-size-matters';
import CustomText from './CustomText';
import RoundedButton from './RoundedButton';

interface DeleteModalType {
  setShow: (val: boolean) => void;
  onCancel: () => void;
  onDelete: () => void;
  show: boolean;
  loader?: boolean;
  title?: string;
  deleteBtnText?: string;
  cancelBtnText?: string;
}

const DeleteModal: FC<DeleteModalType> = ({
  setShow,
  show,
  onCancel,
  onDelete,
  loader,
  title = 'Are you sure you want to delete this item?',
  deleteBtnText = 'Delete',
  cancelBtnText = 'Cancel',
}) => {
  return (
    <Modal
      visible={show}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShow(false)}>
      <Pressable
        onPress={() => {
          setShow(false);
        }}
        style={styles.main}>
        <Pressable onPress={() => {}} style={styles.main2}>
          <CustomText variant="h4" numberOfLines={3}>
            {title}
          </CustomText>

          <View style={styles.buttonContainer}>
            <RoundedButton
              title={deleteBtnText}
              onPress={onDelete}
              disabled={loader}
              loading={loader}
              style={{width: s(100)}}
            />
            <RoundedButton
              title={cancelBtnText}
              onPress={onCancel}
              style={{width: s(100)}}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000000CE',
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(10),
    padding: s(40),
  },
  main2: {
    backgroundColor: '#FFFFFF',
    padding: s(20),
    maxHeight: '80%',
    width: '100%',
    borderRadius: s(20),
    gap: vs(50),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
