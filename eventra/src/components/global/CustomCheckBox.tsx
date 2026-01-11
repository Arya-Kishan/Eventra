import React, {FC, useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

interface CustomCheckBoxType {
  onSelected: () => void;
  onUnSelected: () => void;
  checked: boolean;
  setChecked: (val: boolean) => void;
}

const CustomCheckbox: FC<CustomCheckBoxType> = ({
  onSelected,
  onUnSelected,
  checked = false,
  setChecked,
}) => {
  const handleSelected = () => {
    onSelected();
    setChecked(true);
  };

  const handleUnSelected = () => {
    onUnSelected();
    setChecked(false);
  };

  return (
    <TouchableOpacity
      onPress={checked ? handleUnSelected : handleSelected}
      style={styles.checkboxContainer}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#2196f3',
    borderColor: '#2196f3',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
  },
});

export default CustomCheckbox;
