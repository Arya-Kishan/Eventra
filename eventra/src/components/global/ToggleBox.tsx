import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {AppConstants} from '@constants/AppConstants';
import {s} from 'react-native-size-matters';

interface ToggleBoxType {
  wordArr: string[];
  onChange: (word: string) => void;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ToggleBox: FC<ToggleBoxType> = ({
  onChange,
  wordArr = ['Arya', 'Mohan'],
  viewStyle,
  textStyle,
}) => {
  const [selectedWord, setSelectedWord] = useState('');

  const handleChange = (word: string) => {
    setSelectedWord(word);
    onChange(word);
  };

  useEffect(() => {
    setSelectedWord(wordArr[0]);
  }, []);

  return (
    <View style={[styles.main, viewStyle]}>
      {wordArr.map((item: string) => (
        <Pressable
          onPress={() => handleChange(item)}
          style={[
            styles.main,
            selectedWord == item ? styles.selected : styles.unSelected,
            viewStyle,
          ]}>
          <Text
            style={[
              styles.text,
              selectedWord == item
                ? styles.selectedText
                : styles.unSelectedText,
              textStyle,
            ]}>
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ToggleBox;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    backgroundColor: AppConstants.grayColor,
    padding: s(4),
    borderRadius: s(10),
  },
  selected: {
    backgroundColor: AppConstants.redColor,
    color: AppConstants.whiteColor,
  },
  unSelected: {backgroundColor: AppConstants.grayColor},
  selectedText: {color: AppConstants.whiteColor},
  unSelectedText: {},
  text: {fontSize: s(10)},
});
