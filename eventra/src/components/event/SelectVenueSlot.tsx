import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {slotType, VenueType} from 'types/AppTypes';
import CustomCheckbox from '@components/global/CustomCheckBox';
import {formatISODate} from '@utils/Helper';
import TimeSlot from '@components/venue/TimeSlot';
import {s, vs} from 'react-native-size-matters';
import CustomText from '@components/global/CustomText';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setTime, setVenue} from '@store/reducers/eventSlice';
import RoundedBox from '@components/global/RoundedBox';
import {AppConstants} from '@constants/AppConstants';

interface SelectVenueSlotProps {
  venue: VenueType;
  handleSelectSlot: (slot: slotType) => void;
  handleSelectVenue: (venue: VenueType) => void;
  selectedVenue?: VenueType | string;
}

const SelectVenueSlot: FC<SelectVenueSlotProps> = ({
  venue,
  handleSelectSlot,
  handleSelectVenue,
  selectedVenue,
}) => {
  const [showSlots, setShowSlots] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {time} = useAppSelector(store => store.event);

  useEffect(() => {
    if (typeof selectedVenue !== 'string' && selectedVenue?._id !== venue._id) {
      setShowSlots(false);
    }
  }, [selectedVenue]);

  return (
    <View style={[styles.main, showSlots && styles.selected]}>
      <View style={styles.parent}>
        <RoundedBox size={s(40)}>
          <Image
            source={{uri: venue.pic.url}}
            style={{width: s(40), height: s(40), borderRadius: s(4)}}
          />
        </RoundedBox>
        <CustomText variant="h4">{venue.title}</CustomText>
        <CustomCheckbox
          onSelected={() => {
            handleSelectVenue(venue);
            setShowSlots(true);
          }}
          onUnSelected={() => {
            setShowSlots(false);
            dispatch(setTime({start: '', end: ''}));
            if (
              typeof selectedVenue !== 'string' &&
              selectedVenue?._id == venue._id
            ) {
              dispatch(setVenue(''));
              setChecked(false);
            }
          }}
          checked={
            typeof selectedVenue === 'string'
              ? checked
              : selectedVenue?._id == venue._id
          }
          setChecked={setChecked}
        />
      </View>

      {showSlots && (
        <View style={styles.slotBox}>
          <CustomText fontWeight="800">Select Time Slot :- </CustomText>
          <View style={styles.slotBox2}>
            {venue.slots.map((slot, index) => (
              <TimeSlot
                key={index}
                start={formatISODate(slot.time.start).hours.toString()}
                end={formatISODate(slot.time.end).hours.toString()}
                isBooked={slot.isBooked}
                onPress={() => {
                  handleSelectSlot({
                    ...slot,
                    isBooked: true,
                    eventId: venue._id,
                  });
                }}
                selected={time.start === slot.time.start}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default SelectVenueSlot;

const styles = StyleSheet.create({
  main: {
    gap: s(10),
  },
  selected: {
    backgroundColor: AppConstants.grayColor,
    padding: 10,
    borderRadius: 10,
  },
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(10),
    width: '100%',
    flex: 1,
  },
  slotBox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: s(10),
    flexWrap: 'wrap',
  },
  slotBox2: {flexDirection: 'row', gap: 10},
});
