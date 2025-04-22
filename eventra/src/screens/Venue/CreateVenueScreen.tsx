import CustomCheckbox from '@components/global/CustomCheckBox';
import CustomModal from '@components/global/CustomModal';
import CustomText from '@components/global/CustomText';
import DateTimeSelector from '@components/global/DateTimeSelector';
import Icon from '@components/global/Icon';
import RoundedBox from '@components/global/RoundedBox';
import RoundedButton from '@components/global/RoundedButton';
import { AppConstants } from '@constants/AppConstants';
import { AppTemporaryContants } from '@constants/AppTemporaryConstants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createEventApi } from '@services/EventService';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setVenue } from '@store/reducers/eventSlice';
import { formatTime, showToast } from '@utils/Helper';
import React, { FC, useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';
import { AssetType, NavigationProps, RouteProps, slotType } from 'types/AppTypes';
import uuid from 'react-native-uuid';

const CreateVenueScreen: FC = () => {

    const { params: { venueId } } = useRoute<RouteProps<'CreateVenueScreen'>>();
    const [addLoader, setAddLoader] = useState(false);
    const navigation = useNavigation<NavigationProps<'CreateVenueScreen'>>();

    const [showVenues, setShowVenues] = useState(false);

    const [inputHeight, setInputHeight] = useState(40);
    const [title, setTitle] = useState<string>('Sport Talent Venue ');
    const [description, setDescription] = useState<string>('This is our sprt venue mainly for all womens who want to be fit and fine, goof looking and young, time is never late but u will get old so before getting old utilise you time lady');
    const [pic, setPic] = useState<any>("");
    const [slots, setSlots] = useState<{ start: string, end: string, id: string }[]>([]);
    const [time, setTime] = useState<{ start: string, end: string }>({ end: "", start: "" });
    const [location, setLocation] = useState<{ latitude: string, longitude: string }>({ latitude: "28.6139", longitude: "77.2088" })
    const [address, setAddress] = useState<{ state: string, city: string, area: string }>({ area: "VIP Colony", city: "Patna", state: "Bihar" })

    const { loggedInUser } = useAppSelector(store => store.user);
    const dispatch = useAppDispatch();


    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
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

    const createEvent = async () => {
        setAddLoader(true);

        const formData = new FormData();
        formData.append('title', title); // Additional data you want to send
        formData.append('description', description);
        formData.append('host', loggedInUser?._id);
        formData.append('pic', { uri: pic.uri, name: pic.fileName, type: pic.type });

        const { data, error, success, message } = await createEventApi(formData);
        // console.log(data.data)
        if (success) {
            navigation.navigate("Main");
            showToast({ title: "Success", description: "New Event Created", type: "success" });
            // dispatch(setAllEvents([...allEvents!]))
        }
        setAddLoader(false);

    }

    const handleCreateSlots = () => {

        if (!time.start) {
            return showToast({ title: "Warning !", description: "Please select Start and End time", type: "info" })
        }

        setSlots((prev) => ([...prev, { ...time, id: uuid.v4() }]))
        setTime({ end: "", start: "" })

    }

    const handleDeleteSlot = (id: string) => {
        setSlots((prev) => {
            const updatedSlots = prev.filter((item) => (item.id !== id))
            return updatedSlots;
        })
    }

    console.log("slots : ", slots)
    console.log("uuid : ", uuid.v4())


    return (
        <SafeAreaView>

            <StatusBar hidden={false} backgroundColor={AppConstants.redColor} />

            {/* BACK HEADER */}
            <View style={{ backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding, flexDirection: "row", gap: s(10), alignItems: "center" }}>
                <Icon icon='arrow-left' iconType='FontAwesome5' size={s(20)} />
                <CustomText variant='h2' style={{ color: AppConstants.whiteColor }}>Create Event</CustomText>
            </View>

            <ScrollView>
                <View style={{ flex: 1, paddingHorizontal: AppConstants.screenPadding, gap: vs(10), paddingBottom: vs(70), paddingTop: vs(10) }}>

                    {/* EVENT NAME */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Event Name</CustomText>
                        <TextInput value={title} placeholder='Enter Event Name' onChangeText={(val) => setTitle(val)} style={styles.input} />
                    </View>

                    {/* EVENT Description */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Description</CustomText>
                        <TextInput
                            multiline={true}
                            value={description}
                            placeholder='Enter Description'
                            onChangeText={(val) => setDescription(val)}
                            style={[styles.input]}
                            onContentSizeChange={(e) =>
                                setInputHeight(e.nativeEvent.contentSize.height)
                            }
                        />
                    </View>

                    {/* PIC */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Pic</CustomText>
                        <View style={{ backgroundColor: AppConstants.whiteColor, flex: 1, height: vs(200) }}>
                            {
                                pic !== ""
                                &&
                                <Image source={{ uri: pic.uri }} style={{ flex: 1 }} />
                            }

                        </View>
                        <RoundedButton title='Choose' onPress={pickImage} />
                    </View>

                    {/* SLOTS */}

                    {/* ADDING SLOTS */}
                    <CustomText variant='h6'>Create Slots</CustomText>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10), alignItems: "center" }}>


                        <DateTimeSelector onSet={(val) => setTime({ ...time, start: val })} mode='time' viewStyle={styles.timeBox}>
                            <TextInput placeholder='Select Start Time' value={formatTime(time.start)} onChangeText={() => { }} editable={false} style={styles.input} />
                            <Icon icon='clock' iconType='Feather' size={s(18)} color='red' />

                        </DateTimeSelector>

                        <DateTimeSelector onSet={(val) => setTime({ ...time, end: val })} mode='time' viewStyle={styles.timeBox}>
                            <TextInput placeholder='Select End Time' value={formatTime(time.end)} onChangeText={() => { }} editable={false} style={styles.input} />
                            <Icon icon='clock' iconType='Feather' size={s(18)} color='red' />

                        </DateTimeSelector>

                        <RoundedBox size={s(25)} viewStyle={{ backgroundColor: AppConstants.redColor }} onPress={() => { handleCreateSlots() }}>
                            <Icon icon='plus' iconType='Feather' size={s(20)} />
                        </RoundedBox>

                    </View>

                    {/* SHOWING SELECTED SLOTS */}
                    <View>
                        {
                            <FlatList
                                data={slots}
                                renderItem={({ item, index }) => (
                                    <View style={{ flexDirection: "row", gap: s(20) }}>
                                        <View style={[styles.timeBox, { padding: s(6) }]}>
                                            <CustomText>{formatTime(item.start)}</CustomText>
                                        </View>
                                        <View style={[styles.timeBox, { padding: s(6) }]}>
                                            <CustomText>{formatTime(item.end)}</CustomText>
                                        </View>
                                        <RoundedBox size={s(25)} viewStyle={{ backgroundColor: AppConstants.redColor }} onPress={() => { handleDeleteSlot(item.id) }}>
                                            <Icon icon='x' iconType='Feather' size={s(20)} />
                                        </RoundedBox>
                                    </View>
                                )}
                                keyExtractor={(item) => (`${item.id}`)}
                                contentContainerStyle={{ gap: vs(10) }}
                                scrollEnabled={false}
                            />
                        }
                    </View>


                    {/* LOCATION : LATITUDE & LONGITUDE */}

                    <CustomText variant='h6'>Location</CustomText>

                    <View style={{ flexDirection: "row", gap: s(20), justifyContent: "space-between" }}>
                        <TextInput style={styles.timeBox} value={location.latitude} placeholder='latitude' onChangeText={(val) => (setLocation((prev) => ({ ...prev, latitude: val })))} />

                        <TextInput style={styles.timeBox} value={location.longitude} placeholder='longitude' onChangeText={(val) => (setLocation((prev) => ({ ...prev, longitude: val })))} />
                    </View>


                    {/* ADDRESS : STATE, CITY & AREA */}

                    <CustomText variant='h6'>Address</CustomText>

                    <View style={{ flexDirection: "row", gap: s(20), justifyContent: "space-between" }}>

                        <TextInput style={styles.timeBox} value={address.state} placeholder='State' onChangeText={(val) => (setAddress((prev) => ({ ...prev, state: val })))} />

                        <TextInput style={styles.timeBox} value={address.city} placeholder='City' onChangeText={(val) => (setAddress((prev) => ({ ...prev, city: val })))} />


                    </View>

                    <TextInput style={styles.timeBox} value={address.area} placeholder='Area' onChangeText={(val) => (setAddress((prev) => ({ ...prev, area: val })))} />


                    <RoundedButton loading={addLoader} title='Create' onPress={() => { createEvent() }} />

                </View>

            </ScrollView>

            <CustomModal show={showVenues} setShow={setShowVenues}>
                <View style={{ height: "60%" }}>
                    <FlatList
                        data={AppTemporaryContants.temporaryVenueArr}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10) }}>
                                <Text>{item.title}</Text>
                                <CustomCheckbox onChange={(val: boolean) => { dispatch(setVenue(item._id.toString())), setShowVenues(false) }} />
                            </View>
                        )}
                        contentContainerStyle={{ gap: vs(10) }}
                        keyExtractor={(item, index) => (item._id).toString()}
                    />
                </View>
            </CustomModal>

        </SafeAreaView>
    )
}

export default CreateVenueScreen

const styles = StyleSheet.create({
    input: {
        backgroundColor: AppConstants.whiteColor,
        flex: 1,
        padding: s(8)
    },
    timeBox: { flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "space-between", backgroundColor: AppConstants.whiteColor, paddingHorizontal: s(5) },
})