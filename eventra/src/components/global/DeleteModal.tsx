import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from './CustomText'
import Icon from './Icon'
import { s, vs } from 'react-native-size-matters'
import RoundedButton from './RoundedButton'
import { AppConstants } from '@constants/AppConstants'

interface DeleteModalType {
    setShow: (val: boolean) => void,
    onCancel: () => void,
    onDelete: () => void,
    show: boolean
}

const DeleteModal: FC<DeleteModalType> = ({ setShow, show, onCancel, onDelete }) => {
    return (
        <Modal
            visible={show}
            animationType='fade'
            transparent={true}
            onRequestClose={() => setShow(false)}
        >
            <Pressable onPress={() => { setShow(false) }} style={styles.main}>
                <Pressable onPress={() => { }} style={styles.main2}>

                    <CustomText variant='h4'>Are You Sure To Delete !</CustomText>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                        <RoundedButton title='Delete' onPress={onDelete} />
                        <RoundedButton title='Cancel' onPress={onCancel} />

                    </View>

                </Pressable>
            </Pressable>

        </Modal>
    )
}

export default DeleteModal

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#000000CE",
        justifyContent: "center",
        alignItems: "center",
        gap: vs(10),
        padding: s(40)
    },
    main2: {
        backgroundColor: "#FFFFFF",
        padding: s(20),
        maxHeight: "80%",
        width: "100%",
        borderRadius: s(20),
        gap: vs(50)
    },
})