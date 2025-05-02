import { CustomImage } from '@components/global/CustomImage'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import RoundedBox from '@components/global/RoundedBox'
import { AppConstants } from '@constants/AppConstants'
import { useRoute } from '@react-navigation/native'
import { createMessageApi, getConversationApi } from '@services/ChatService'
import { useAppSelector } from '@store/hooks'
import { showToast } from '@utils/Helper'
import { useSocket } from '@context/SocketContext'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { s } from 'react-native-size-matters'
import { RouteProps, userType } from 'types/AppTypes'

const ChatScreen = () => {

    const [text, setText] = useState<string>("");
    const [messages, setMessages] = useState<any>([]);
    const [clearMessages, setClearMessages] = useState(false);
    const { loggedInUser } = useAppSelector(store => store.user);
    const { params: { user } } = useRoute<RouteProps<'ChatScreen'>>();
    const opponentUser = user;

    const { globalSocket } = useSocket();

    const fetchConversationMessages = async () => {
        const { } = await getConversationApi({ sender: loggedInUser?._id!, receiver: opponentUser._id });
    }

    const handleSend = async () => {

        if (text.length < 1) {
            return showToast({ title: "Write Message" })
        }

        setMessages((prev: any) => ([...prev, { sender: { _id: loggedInUser?._id!, name: loggedInUser?.name }, receiver: { _id: opponentUser._id, name: opponentUser.name }, message: { type: 'text', value: text } }]))

        // SENDING MESSAGE
        globalSocket.emit("send-message", { sender: { _id: loggedInUser?._id, name: loggedInUser?.name }, receiver: { _id: opponentUser._id, name: opponentUser.name }, message: { type: 'text', value: text } })

        const { } = await createMessageApi({
            sender: loggedInUser?._id!,
            receiver: opponentUser._id,
            message: {
                type: "text",
                value: text
            }
        });



        // USED FOR CLEANING INPUT
        setClearMessages(!clearMessages);

    }

    useEffect(() => {

        // RECEIVING MESSAGE
        globalSocket.on("receive-message", ({ sender, receiver, message }: { sender: userType, receiver: userType, message: string }) => {
            setMessages((prev: any) => ([...prev, { sender, receiver, message }]))
            globalSocket.emit("delivered", { sender, receiver, message })
        })

        return () => globalSocket?.off("receive-message");

    }, [])

    useEffect(() => {
        // setMessages(data?.messages)
    }, [])

    useEffect(() => {
        fetchConversationMessages()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: "row", gap: s(4), justifyContent: "space-between", alignItems: "center", backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding }}>

                <CustomImage source={AppConstants.fallbackProfilePic} width={s(40)} height={s(40)} />

                <View style={{ flex: 1, flexDirection: "row", gap: s(4), justifyContent: "space-between", alignItems: "center" }}>

                    <View style={{ justifyContent: "space-between", gap: s(0) }}>
                        <CustomText variant='h4'>Arya </CustomText>
                        <CustomText variant='subtitle2'>Online</CustomText>
                    </View>

                    <Icon icon='dots-vertical' iconType='MaterialCommunityIcons' />

                </View>


            </View>

            <ScrollView style={{ flex: 1 }}>

            </ScrollView>

            <View style={{ width: "100%", padding: AppConstants.screenPadding, position: "absolute", bottom: 0, left: 0, flexDirection: "row", backgroundColor: AppConstants.redColor }}>
                <TextInput placeholder='Write a message....' value={text} onChangeText={setText} style={{ flex: 1, backgroundColor: AppConstants.whiteColor, padding: s(2), borderRadius: s(10), gap: s(2) }} />
                <RoundedBox size={s(35)} onPress={() => { }} viewStyle={{ justifyContent: "center", alignItems: "center" }}>
                    <Icon icon='send' iconType='Feather' />
                </RoundedBox>
            </View>

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})