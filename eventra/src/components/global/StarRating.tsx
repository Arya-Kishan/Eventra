import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from './Icon';

type Props = {
  rating: number; // like 4.5 or 3
  maxStars?: number; // optional, default is 5
  size?: number;
  color?: string;
};

const StarRating: React.FC<Props> = ({
  rating,
  maxStars = 5,
  size = 24,
  color = '#FFD700',
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Icon
            key={i}
            iconType="FontAwesome"
            icon="star"
            size={size}
            color={color}
          />
        ))}
      {hasHalfStar && (
        <Icon
          iconType="FontAwesome"
          icon="star-half-full"
          size={size}
          color={color}
        />
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <Icon
            key={i}
            iconType="FontAwesome"
            icon="star-o"
            size={size}
            color={color}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StarRating;
