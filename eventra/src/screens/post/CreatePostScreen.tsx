import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import SmallEventCard from '@components/home/SmallEventCard';
import { AppConstants } from '@constants/AppConstants';
import { useNavigation } from '@react-navigation/native';
import { createPostApi } from '@services/PostService';
import { useAppSelector } from '@store/hooks';
import { showToast } from '@utils/Helper';
import React, { useState } from 'react';
import { FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';
import { AssetType, EventType, NavigationProps } from 'types/AppTypes';

const CreatePostScreen = () => {

    const [loader, setLoader] = useState<boolean>(false);
    const [inputHeight, setInputHeight] = useState(40);
    const [title, setTitle] = useState<string>('asss');
    const [description, setDescription] = useState<string>('asss assss assss asssss')
    const [event, setEvent] = useState<EventType | null>(null)
    const [tags, setTags] = useState<string[]>(["cute", "anime"])
    const [tagText, setTagText] = useState<string>("HII HANDSOME BUDDY OP")
    const [selectedTag, setSelectedTag] = useState<string>('')
    const [pic, setPic] = useState<AssetType>({ uri: "", fileName: "", type: "" });
    const [selectEventModal, setSelectEventModal] = useState<boolean>(false);

    const { allEvents } = useAppSelector(store => store.event);

    const { loggedInUser } = useAppSelector(store => store.user);

    const navigation = useNavigation<NavigationProps<'CreatePostScreen'>>();


    const pickImage = () => {
        launchImageLibrary({ mediaType: 'mixed' }, (response: any) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                const image: AssetType = response.assets[0];
                setPic(image)
            }
        });
    };


    const handleCreatePost = async () => {
        setLoader(true);

        const formData = new FormData();
        formData.append('title', title); // Additional data you want to send
        formData.append('description', description);
        formData.append('user', loggedInUser?._id);
        formData.append('event', event?._id ?? null);
        formData.append('tags', JSON.stringify(tags));

        console.log("pic", pic)
        let fileType = "image";
        if (pic!.type!.startsWith('image/')) {
            fileType = "image";
        } else if (pic!.type!.startsWith('video/')) {
            fileType = "video";
        }

        formData.append(`${fileType}`, { uri: pic.uri, name: pic.fileName, type: pic.type });
        formData.append("type", fileType);

        const { data, error, success, message } = await createPostApi(formData);
        // console.log(data.data)
        if (success) {
            navigation.navigate("Main",{screen:"Social"});
            showToast({ title: "Success", description: "New Post Created", type: "success" });
        } else {
            showToast({ title: "Failed", description: "New Post Not Created", type: "error" });

        }
        setLoader(false);

    }

    const handleDeleteTag = (tag: string) => {
        s
        setTags((prev) => {
            const updatedSlots = prev.filter((item) => (item !== tag))
            return updatedSlots;
        })
    }


    const handleAddTags = () => {
        setTags((prev) => ([...prev, tagText]))
        setTagText("")
    }

    console.log("TAGS : ", tags)



    return (
        <SafeAreaView>

            <View style={{ backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding, flexDirection: "row", gap: s(10), alignItems: "center" }}>
                <Pressable onPress={() => navigation.goBack()}><Icon icon='arrow-left' iconType='FontAwesome5' size={s(20)} /></Pressable>
                <CustomText variant='h2' style={{ color: AppConstants.whiteColor }}>Create Post</CustomText>
            </View>

            <ScrollView>

                <View style={{ flex: 1, paddingHorizontal: AppConstants.screenPadding, gap: vs(10), paddingBottom: vs(70), paddingTop: vs(10) }}>

                    {/* TITLEE */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Title</CustomText>
                        <TextInput value={title} placeholder='Enter Event Name' onChangeText={setTitle} style={styles.input} />
                    </View>

                    {/* Post Description */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Description</CustomText>
                        <TextInput
                            multiline={true}
                            value={description}
                            placeholder='Enter Description'
                            onChangeText={setDescription}
                            style={[styles.input]}
                            onContentSizeChange={(e) =>
                                setInputHeight(e.nativeEvent.contentSize.height)
                            }
                        />
                    </View>

                    {/* PIC */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Pic</CustomText>
                        <View style={{ backgroundColor: AppConstants.whiteColor, flex: 1, height: AppConstants.screenWidth - AppConstants.screenPadding * 2 }}>
                            {
                                pic.uri == ""
                                    ?
                                    <Pressable onPress={pickImage} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        <RoundedBox size={s(25)} viewStyle={{ backgroundColor: AppConstants.redColor }}>
                                            <Icon icon='plus' iconType='Feather' size={s(20)} />
                                        </RoundedBox>
                                    </Pressable>
                                    :
                                    <View style={{ position: "relative" }}>
                                        <Image source={{ uri: pic.uri }} style={{ width: "100%", height: "100%", aspectRatio: 1 / 1, objectFit: "cover" }} />
                                        <RoundedBox size={s(25)} viewStyle={{ backgroundColor: AppConstants.redColor, position: "absolute", top: 10, right: 10 }} onPress={() => { setPic({ uri: "", fileName: "", type: "" }) }}>
                                            <Icon icon='x' iconType='Feather' size={s(20)} />
                                        </RoundedBox>
                                    </View>
                            }

                        </View>
                    </View>

                    {/* ADDING TAGS */}
                    <CustomText variant='h6'>Tags</CustomText>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10), alignItems: "center" }}>

                        <TextInput placeholder='Select Start Time' value={tagText} style={styles.input} onChangeText={setTagText} />

                        <RoundedBox size={s(25)} viewStyle={{ backgroundColor: AppConstants.redColor }} onPress={() => { handleAddTags() }}>
                            <Icon icon='plus' iconType='Feather' size={s(20)} />
                        </RoundedBox>

                    </View>

                    {/* SHOWING SELECTED TAGS */}
                    <View>
                        {
                            <FlatList
                                data={tags}
                                renderItem={({ item, index }) => (
                                    <View style={{ flexDirection: "row", gap: s(20), backgroundColor: AppConstants.whiteColor, alignItems: "center", padding: 5 }}>
                                        <View style={[styles.timeBox, { padding: s(6), minWidth: s(40), justifyContent: "center", alignItems: "center" }]}>
                                            <CustomText style={{ textAlign: "center" }}>{item}</CustomText>
                                        </View>
                                        <RoundedBox size={s(25)} viewStyle={{ backgroundColor: AppConstants.redColor }} onPress={() => { handleDeleteTag(item) }}>
                                            <Icon icon='x' iconType='Feather' size={s(20)} />
                                        </RoundedBox>
                                    </View>
                                )}
                                horizontal
                                keyExtractor={(item) => (`${item}`)}
                                contentContainerStyle={{ gap: vs(10) }}
                                scrollEnabled={false}
                            />
                        }
                    </View>

                    {/* EVENT */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Event (optional)</CustomText>
                        <Pressable onPress={() => { setSelectEventModal(true) }} style={{ flexDirection: "row", justifyContent: "space-between", padding: s(10), backgroundColor: AppConstants.whiteColor }}>
                            <TextInput value={event?.title} placeholder='Select Event' onChangeText={setTitle} editable={false} style={styles.input} />
                            <Icon icon='fireplace-off' iconType='MaterialCommunityIcons' size={s(18)} color={AppConstants.redColor} />
                        </Pressable>
                    </View>

                    <RoundedButton loading={loader} title='Create' onPress={handleCreatePost} />

                </View>

            </ScrollView>

            {/* MODAL FOR ADDING COMMENT */}
            <Modal
                visible={selectEventModal}
                transparent={true}
                animationType='slide'
                onRequestClose={() => setSelectEventModal(false)}
            >
                <View style={{ flex: 1, backgroundColor: "#000000D6", justifyContent: "flex-end", alignItems: "center", gap: vs(10) }}>

                    <RoundedBox size={s(49)} viewStyle={{ backgroundColor: AppConstants.redColor }} onPress={() => { setSelectEventModal(false) }}>
                        <Icon icon='x' iconType='Feather' size={s(30)} />
                    </RoundedBox>

                    <View style={{ width: "100%", backgroundColor: "#FF0000D6", padding: s(15), borderRadius: s(20), gap: vs(10), height: vs(300) }}>
                        <FlatList
                            data={allEvents}
                            renderItem={({ item, index }: { item: EventType, index: number }) => (
                                <TouchableOpacity activeOpacity={0.8} onPress={() => { setEvent(item), setSelectEventModal(false) }} style={{ backgroundColor: AppConstants.whiteColor, padding: 10, borderRadius: 20 }}>
                                    <SmallEventCard item={item} index={index} navigationScreen='CreatePostScreen' />
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{ padding: AppConstants.screenPadding, gap: AppConstants.defaultGap }}
                            keyExtractor={(item) => (`${item._id}`)}
                        />
                    </View>
                </View>

            </Modal>

        </SafeAreaView>
    )
}

export default CreatePostScreen

const styles = StyleSheet.create({
    input: {
        backgroundColor: AppConstants.whiteColor,
        flex: 1,
        padding: s(8),
        width: "100%"
    },
    timeBox: { flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "space-between", backgroundColor: AppConstants.whiteColor, paddingHorizontal: s(5) },
})