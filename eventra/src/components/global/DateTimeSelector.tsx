import React, {FC, ReactNode, useState} from 'react';
import {View, Button, Platform, Pressable, ViewStyle} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RoundedButton from './RoundedButton';
import Icon from './Icon';
import RoundedBox from './RoundedBox';
import {s} from 'react-native-size-matters';
import {AppConstants} from '@constants/AppConstants';

interface DateTimeSelectorType {
  mode: 'date' | 'time';
  onSet: (val: string) => void;
  children: ReactNode;
  viewStyle?: ViewStyle;
  isEditable?: boolean;
}

const DateTimeSelector: FC<DateTimeSelectorType> = ({
  mode = 'date',
  onSet,
  children,
  viewStyle,
  isEditable = true,
}) => {
  const [show, setShow] = useState(false);

  const onChange = (_event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    onSet(currentDate.toISOString());
    setShow(false);
  };

  return (
    <Pressable onPress={() => isEditable && setShow(true)} style={viewStyle}>
      {children}

      {show && (
        <DateTimePicker
          value={new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </Pressable>
  );
};

export default DateTimeSelector;
