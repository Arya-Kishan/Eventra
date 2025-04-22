import CustomCheckbox from '@components/global/CustomCheckBox';
import CustomModal from '@components/global/CustomModal';
import CustomText from '@components/global/CustomText';
import DateTimeSelector from '@components/global/DateTimeSelector';
import Icon from '@components/global/Icon';
import RoundedButton from '@components/global/RoundedButton';
import { AppConstants } from '@constants/AppConstants';
import { AppTemporaryContants } from '@constants/AppTemporaryConstants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createEventApi } from '@services/EventService';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setAllEvents, setCategory, setDate, setDescription, setHeadcount, setPic, setTime, setTitle, setVenue } from '@store/reducers/eventSlice';
import { formatDate, formatTime, showToast } from '@utils/Helper';
import React, { FC, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';
import { AssetType, NavigationProps, RouteProps } from 'types/AppTypes';

const CreateEventScreen: FC = () => {

    const { params: { eventId } } = useRoute<RouteProps<'CreateEventScreen'>>();
    const [addLoader, setAddLoader] = useState(false);
    const navigation = useNavigation<NavigationProps<'CreateEventScreen'>>();

    const [showVenues, setShowVenues] = useState(false);

    const { category, date, description, headcount, pic, time, title, venue, allEvents } = useAppSelector(store => store.event);
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
                dispatch(setPic(image))
            }
        });
    };

    const createEvent = async () => {
        setAddLoader(true);

        const formData = new FormData();
        formData.append('title', title); // Additional data you want to send
        formData.append('description', description);
        formData.append('time', JSON.stringify(time));
        formData.append('date', date);
        formData.append('host', loggedInUser?._id);
        formData.append('pic', { uri: pic.uri, name: pic.fileName, type: pic.type });
        formData.append('venue', venue);
        formData.append('headCount', headcount);
        formData.append('category', category);

        const { data, error, success, message } = await createEventApi(formData);
        // console.log(data.data)
        if (success) {
            navigation.navigate("Main");
            showToast({ title: "Success", description: "New Event Created", type: "success" });
            dispatch(setAllEvents([...allEvents!]))
        }
        setAddLoader(false);

    }


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
                        <TextInput value={title} placeholder='Enter Event Name' onChangeText={(val) => dispatch(setTitle(val))} style={styles.input} />
                    </View>

                    {/* EVENT Description */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Description</CustomText>
                        <TextInput numberOfLines={4} value={description} placeholder='Enter Description' onChangeText={(val) => dispatch(setDescription(val))} style={styles.input} />
                    </View>

                    {/* DATE TIME */}
                    <View style={{ gap: vs(10) }}>

                        {/* DATE */}

                        <CustomText variant='h6'>Date</CustomText>

                        <DateTimeSelector onSet={(val) => dispatch(setDate(val))} mode='date' viewStyle={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: AppConstants.whiteColor, alignItems: "center", paddingHorizontal: s(5) }}>
                            <TextInput placeholder='Select Date' value={formatDate(date)} onChangeText={setDate} editable={false} style={styles.input} />
                            <Icon icon='calendar' iconType='FontAwesome' size={s(18)} color='red' />
                        </DateTimeSelector>


                        <CustomText variant='h6'>Time</CustomText>

                        {/* TIME */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10) }}>


                            <DateTimeSelector onSet={(val) => dispatch(setTime({ ...time, start: val }))} mode='time' viewStyle={{ flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "space-between", backgroundColor: AppConstants.whiteColor, paddingHorizontal: s(5) }}>
                                <TextInput placeholder='Select Start Time' value={formatTime(time.start)} onChangeText={() => { }} editable={false} style={styles.input} />
                                <Icon icon='clock' iconType='Feather' size={s(18)} color='red' />

                            </DateTimeSelector>

                            <DateTimeSelector onSet={(val) => dispatch(setTime({ ...time, end: val }))} mode='time' viewStyle={{ flex: 1, alignItems: "center", flexDirection: "row", justifyContent: "space-between", backgroundColor: AppConstants.whiteColor, paddingHorizontal: s(5) }}>
                                <TextInput placeholder='Select End Time' value={formatTime(time.end)} onChangeText={() => { }} editable={false} style={styles.input} />
                                <Icon icon='clock' iconType='Feather' size={s(18)} color='red' />

                            </DateTimeSelector>

                        </View>

                    </View>

                    {/* VENUE */}
                    <View style={{ gap: vs(6) }}>

                        <CustomText variant='h6'>Venue</CustomText>

                        <Pressable onPress={() => { setShowVenues(true) }} style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: AppConstants.whiteColor, alignItems: "center", paddingHorizontal: s(5) }}>
                            <TextInput value={venue} placeholder='Enter Description' onChangeText={() => { }} style={styles.input} editable={false} />
                            <Icon icon='fireplace-off' iconType='MaterialCommunityIcons' size={s(18)} color={AppConstants.redColor} />
                        </Pressable>

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

                    {/* CATEGORY */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Category</CustomText>
                        <TextInput value={category} placeholder='music, game, sports, party' onChangeText={(val: string) => { dispatch(setCategory(val)) }} style={styles.input} />
                    </View>

                    {/* HEADCOUNT */}
                    <View style={{ gap: vs(6) }}>
                        <CustomText variant='h6'>Number of People</CustomText>
                        <TextInput value={headcount} placeholder='Enter Description' keyboardType='numeric' onChangeText={(val) => dispatch(setHeadcount(val))} style={styles.input} />
                    </View>

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

export default CreateEventScreen

const styles = StyleSheet.create({
    input: {
        backgroundColor: AppConstants.whiteColor,
        flex: 1
    }
})