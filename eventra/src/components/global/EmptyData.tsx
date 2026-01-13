import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {FC} from 'react';
import RoundedBox from './RoundedBox';
import Icon from './Icon';
import {s, vs} from 'react-native-size-matters';

interface EmptyDataProps {
  title: string;
  handleAddClick?: () => void;
  showBtn?: boolean;
  textStyle?: TextStyle;
}

const EmptyData: FC<EmptyDataProps> = ({
  title,
  handleAddClick,
  showBtn = true,
  textStyle,
}) => {
  return (
    <View style={styles.main}>
      <Text style={textStyle}>{title}</Text>
      {showBtn && (
        <RoundedBox size={s(25)} onPress={handleAddClick}>
          <Icon icon="plus" iconType="Feather" />
        </RoundedBox>
      )}
    </View>
  );
};

export default EmptyData;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: vs(20),
  },
});
