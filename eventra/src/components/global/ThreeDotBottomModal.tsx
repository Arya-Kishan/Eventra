import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC, ReactNode, useState } from 'react'
import { s, vs } from 'react-native-size-matters'
import RoundedBox from './RoundedBox'
import Icon from './Icon'
import { AppConstants } from '@constants/AppConstants'
import CustomText from './CustomText'
import { showAlert } from '@utils/Helper'
import DeleteModal from './DeleteModal'

interface CustomModalType {
    setShow: (val: boolean) => void,
    onEdit: () => void,
    onDelete: () => void,
    show: boolean
}

const ThreeDotBottomModal: FC<CustomModalType> = ({ setShow, show, onEdit, onDelete }) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <>

            <RoundedBox onPress={() => setShow(true)} size={s(30)} viewStyle={{ position: "absolute", top: 10, right: 10, backgroundColor: AppConstants.redColor }}>
                <Icon icon='dots-vertical' iconType='MaterialCommunityIcons' size={s(25)} />
            </RoundedBox>

            <Modal
                visible={show}
                animationType='slide'
                transparent={true}
                onRequestClose={() => setShow(false)}
            >
                <Pressable onPress={() => { setShow(false) }} style={styles.main}>
                    <Pressable onPress={() => { }} style={styles.main2}>

                        <View style={{ gap: vs(10) }}>

                            <Pressable onPress={onEdit} style={styles.column}>
                                <CustomText variant='h6'>Edit</CustomText>
                                <Icon icon='edit' iconType='Feather' color={AppConstants.redColor} />
                            </Pressable>

                            <Pressable onPress={() => setShowDeleteModal(true)} style={styles.column}>
                                <CustomText variant='h6'>Delete</CustomText>
                                <Icon icon='x' iconType='Feather' color={AppConstants.redColor} />
                            </Pressable>

                        </View>

                        <DeleteModal onCancel={() => setShowDeleteModal(false)} onDelete={onDelete} setShow={setShowDeleteModal} show={showDeleteModal} />

                    </Pressable>
                </Pressable>

            </Modal>

        </>
    )
}

export default ThreeDotBottomModal

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#000000CE",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: vs(10)
    },
    main2: {
        backgroundColor: "#FFFFFF",
        padding: s(20),
        maxHeight: "80%",
        width: "100%",
        borderRadius: s(20)
    },
    column: { flexDirection: "row", justifyContent: "space-between" }
})