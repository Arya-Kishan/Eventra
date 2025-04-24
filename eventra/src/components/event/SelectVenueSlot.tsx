import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { slotType, VenueType } from 'types/AppTypes'
import CustomCheckbox from '@components/global/CustomCheckBox'
import { formatISODate } from '@utils/Helper'
import TimeSlot from '@components/venue/TimeSlot'
import { s, vs } from 'react-native-size-matters'
import CustomText from '@components/global/CustomText'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { setTime, setVenue } from '@store/reducers/eventSlice'

interface SelectVenueSlotProps {
    venue: VenueType,
    handleSelectSlot: (slot: slotType) => void,
    handleSelectVenue: (venue: VenueType) => void,
    selectedVenue?: VenueType | string,
}

const SelectVenueSlot: FC<SelectVenueSlotProps> = ({ venue, handleSelectSlot, handleSelectVenue, selectedVenue }) => {

    const [showSlots, setShowSlots] = useState(false);
    const [checked, setChecked] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { time } = useAppSelector(store => store.event);

    useEffect(() => {
        if (typeof selectedVenue !== 'string' && selectedVenue?._id !== venue._id) {
            setShowSlots(false);
        }
    }, [selectedVenue])

    return (
        <View style={{ gap: vs(10) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s(10) }}>
                <CustomText variant='h4'>{venue.title}</CustomText>
                <CustomCheckbox
                    onSelected={() => {
                        handleSelectVenue(venue);
                        setShowSlots(true);
                    }}
                    onUnSelected={() => {
                        setShowSlots(false);
                        dispatch(setTime({ start: "", end: "" }))
                        if (typeof selectedVenue !== 'string' && selectedVenue?._id == venue._id) {
                            dispatch(setVenue(""));
                            setChecked(false);
                        }
                    }}
                    checked={typeof selectedVenue == 'string' ? checked : selectedVenue?._id == venue._id}
                    setChecked={setChecked}
                />
            </View>

            {
                showSlots
                &&
                <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: s(10), flexWrap: "wrap" }}>
                    {venue.slots.map((slot, index) => (
                        <TimeSlot
                            key={index}
                            start={formatISODate(slot.time.start).hours.toString()}
                            end={formatISODate(slot.time.end).hours.toString()}
                            isBooked={slot.isBooked}
                            onPress={() => { handleSelectSlot({ ...slot, isBooked: true, eventId: venue._id }) }}
                            selected={time.start == slot.time.start}
                        />
                    ))}
                </View>
            }

        </View>
    )
}

export default SelectVenueSlot

const styles = StyleSheet.create({})