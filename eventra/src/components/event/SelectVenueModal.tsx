import CustomModal from '@components/global/CustomModal';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setTime, setVenue } from '@store/reducers/eventSlice';
import React, { FC, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { slotType } from 'types/AppTypes';
import SelectVenueSlot from './SelectVenueSlot';

interface SelectVenueModalProps {
    show: boolean;
    setShow: (val: boolean) => void;
}

const SelectVenueModal: FC<SelectVenueModalProps> = ({ setShow, show }) => {


    const { allVenues } = useAppSelector(store => store.venue);
    const { venue } = useAppSelector(store => store.event);
    const dispatch = useAppDispatch();

    return (
        <CustomModal show={show} setShow={setShow}>
            <View style={{ height: vs(200) }}>

                <FlatList
                    data={allVenues}
                    renderItem={({ item, index }) => (
                        <SelectVenueSlot
                            handleSelectSlot={(slot: slotType) => { dispatch(setTime({ start: slot.time.start, end: slot.time.end })) }}
                            handleSelectVenue={(venue) => { dispatch(setVenue(venue)) }}
                            venue={item}
                            selectedVenue={venue}
                        />
                    )}
                    contentContainerStyle={{ width: s(250), gap: vs(10) }}
                    keyExtractor={(item, index) => (item._id).toString()}
                />

            </View>
        </CustomModal>
    )
}

export default SelectVenueModal

const styles = StyleSheet.create({})