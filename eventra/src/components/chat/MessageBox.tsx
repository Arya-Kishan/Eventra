import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { MessageType } from 'types/AppTypes'
import { useAppSelector } from '@store/hooks'
import { s } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'
import CustomText from '@components/global/CustomText'
import { formatTime } from '@utils/Helper'

interface MessageBoxProps {
    message: MessageType
}

const MessageBox: FC<MessageBoxProps> = ({ message }) => {
    const { loggedInUser } = useAppSelector(store => store.user);

    const isMySelf = (): boolean => {
        return loggedInUser?._id == message.sender._id;
    }
    return (
        <View style={{ padding: s(8), alignItems: isMySelf() ? "flex-end" : "flex-start" }}>

            <View style={{ width: "50%", backgroundColor: isMySelf() ? AppConstants.redColor : AppConstants.grayColor, padding: s(10), borderRadius: s(10) }}>

                <Text style={{ textAlign: "left" }}>{message.message.value}</Text>
                <CustomText variant='overline' style={{ textAlign: "right", fontSize: s(8) }}>{formatTime(message.timestamp)}</CustomText>

            </View>

        </View>
    )
}

export default MessageBox

const styles = StyleSheet.create({})