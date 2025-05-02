import { AppConstants } from '@constants/AppConstants';
import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { s } from 'react-native-size-matters';

const data = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
];

interface DropdownExampleProps {
    dataArr: { label: string, value: string }[];
    onChange: (val: string) => void;
    placeholder?: string;
}

const DropdownExample: FC<DropdownExampleProps> = ({ dataArr = data, onChange, placeholder = "Select Item" }) => {
    const [value, setValue] = useState<string>("");
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        onChange(value!);
    }, [value])

    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={dataArr}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? placeholder : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setValue(item.value);
                setIsFocus(false);
            }}
        />
    );
}

export default DropdownExample

const styles = StyleSheet.create({
    label: { marginBottom: 10 },
    dropdown: {
        height: 28,
        borderRadius: s(12),
        paddingHorizontal: 10,
        backgroundColor: AppConstants.whiteColor
    },
    placeholderStyle: {
        color: 'gray',
    },
    selectedTextStyle: {
        color: 'black',
    },
});
