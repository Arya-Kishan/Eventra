import { CustomImage } from '@components/global/CustomImage'
import CustomLoader from '@components/global/CustomLoader'
import CustomText from '@components/global/CustomText'
import EmptyData from '@components/global/EmptyData'
import Icon from '@components/global/Icon'
import { AppConstants } from '@constants/AppConstants'
import { useSocket } from '@context/SocketContext'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createMessageApi, getConversationApi } from '@services/ChatService'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { setUnOpendedMessages } from '@store/reducers/chatSlice'
import { showToast } from '@utils/Helper'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s } from 'react-native-size-matters'
import { MessageType, NavigationProps, RouteProps, userType } from 'types/AppTypes'

const ChatScreen = () => {

    const [text, setText] = useState<string>("");
    const [messageLoading, setMessageLoading] = useState(true);
    const [messages, setMessages] = useState<any>([]);
    const { loggedInUser } = useAppSelector(store => store.user);
    const { params: { user } } = useRoute<RouteProps<'ChatScreen'>>();
    const navigation = useNavigation<NavigationProps<"ChatScreen">>();
    const opponentUser = user;
    const dispatch = useAppDispatch();

    const { globalSocket, onlineUsers } = useSocket();

    const fetchConversationMessages = async () => {
        setMessageLoading(true);
        const { data, success } = await getConversationApi({ sender: loggedInUser?._id!, receiver: opponentUser._id });
        success ? setMessages(data.data.messages) : "";
        setMessageLoading(false);
    }

    const handleSend = async () => {

        if (text.length < 1) {
            return showToast({ title: "Write Message" })
        }

        const newMessage = {
            sender: { _id: loggedInUser?._id!, name: loggedInUser?.name },
            receiver: { _id: opponentUser._id, name: opponentUser.name },
            message: { type: 'text', value: text }
        }

        setMessages((prev: any) => ([...prev, newMessage]))
        globalSocket.emit("send-message", newMessage)

        const { } = await createMessageApi({
            sender: loggedInUser?._id!,
            receiver: opponentUser._id,
            message: {
                type: "text",
                value: text
            }
        });



        // USED FOR CLEANING INPUT
        setText("");

    }

    useEffect(() => {

        // RECEIVING MESSAGE
        globalSocket.on("receive-message", ({ sender, receiver, message }: { sender: userType, receiver: userType, message: string }) => {
            console.log("RECEIVED MESSAGE : ", { sender, receiver, message });

            // ONLY SHOW MESSAGES WHEN OPPONENT USER IS SAME AS RECEIVER USER
            if (opponentUser?._id == sender._id) {
                setMessages((prev: any) => ([...prev, { sender, receiver, message }]))
                globalSocket.emit("delivered", { sender, receiver, message })
            } else {
                dispatch(setUnOpendedMessages({ sender, receiver, message }))
            }

        })

        return () => globalSocket?.off("receive-message");

    }, [])

    const isOpponentOnline = (): boolean => {
        return onlineUsers.includes(opponentUser._id);
    }

    useEffect(() => {
        fetchConversationMessages()
    }, [])


    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            setMessages([]);
        });

        return unsubscribe;
    }, [navigation]);


    // TO MAKE SCROLL TO END
    const flatListRef = useRef<FlatList<any>>(null);

    // Auto scroll to bottom when messages change
    useEffect(() => {
        if (flatListRef.current && messages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1, paddingBottom: s(50) }}>
                <View style={{ flexDirection: "row", gap: s(4), justifyContent: "space-between", alignItems: "center", backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding }}>

                    <CustomImage source={opponentUser?.profilePic.url !== "" ? opponentUser?.profilePic.url! : AppConstants.fallbackProfilePic} width={s(40)} height={s(40)} />

                    <View style={{ flex: 1, flexDirection: "row", gap: s(4), justifyContent: "space-between", alignItems: "center" }}>

                        <View style={{ justifyContent: "space-between", gap: s(0) }}>
                            <CustomText variant='h4'>{opponentUser.name}</CustomText>
                            <CustomText variant='overline' fontWeight='800' style={{ color: isOpponentOnline() ? AppConstants.greenColor : AppConstants.whiteColor }}>{isOpponentOnline() ? "Online" : "Offline"}</CustomText>
                        </View>

                        <Icon icon='dots-vertical' iconType='MaterialCommunityIcons' />

                    </View>


                </View>

                {
                    messageLoading
                        ?
                        <EmptyData title='Loading Messages' showBtn={false} />
                        :
                        messages.length == 0
                            ?
                            <EmptyData title='NO MESSAGES' showBtn={false} />
                            :
                            <FlatList
                                data={messages}
                                ref={flatListRef}
                                renderItem={({ item }: { item: MessageType }) => {
                                    const isMySelf = loggedInUser?._id == item.sender._id;
                                    return <View style={{ padding: s(10), alignItems: isMySelf ? "flex-end" : "flex-start" }}>

                                        <View style={{ width: "50%", backgroundColor: isMySelf ? AppConstants.redColor : AppConstants.grayColor, padding: s(10), borderRadius: s(10) }}>
                                            <CustomText style={{ textAlign: isMySelf ? "right" : "left" }}>{item.message.value}</CustomText>
                                        </View>

                                    </View>
                                }}
                                contentContainerStyle={{ gap: s(10) }}
                                onContentSizeChange={() =>
                                    flatListRef.current?.scrollToEnd({ animated: true })
                                }
                            />
                }

                <View style={{ width: "100%", height: s(50), padding: s(4), position: "absolute", bottom: s(0), left: 0, flexDirection: "row", backgroundColor: AppConstants.whiteColor, alignItems: "center", gap: s(10) }}>

                    <TextInput placeholder='Write a message....' value={text} onChangeText={setText} style={{ flex: 1, backgroundColor: AppConstants.whiteColor, padding: s(10), fontSize: s(15), borderRadius: s(10), gap: s(2) }} />

                    <Icon icon='send' iconType='Feather' onPress={handleSend} color={AppConstants.redColor} />

                </View>

            </View>

        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    onlineText: { color: AppConstants.greenColor },
    offlineText: { color: AppConstants.redColor },
})