import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {s, vs} from 'react-native-size-matters';

const BannerSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  const {width} = Dimensions.get('window');
  const PAGE_WIDTH = width - s(32);

  return (
    <SkeletonPlaceholder>
      <View style={styles.main}>
        <View style={[styles.card, {width: PAGE_WIDTH}]} />
        <View style={styles.dotContainer}>
          {arr.map(item => (
            <View key={item} style={styles.dot} />
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default BannerSkeleton;

const styles = StyleSheet.create({
  main: {
    height: '100%',
    flexDirection: 'column',
    gap: vs(10),
    overflow: 'hidden',
    borderRadius: 16,
  },
  card: {
    flex: 1,
    height: vs(110),
    borderRadius: 16,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dotContainer: {flexDirection: 'row', gap: s(10), justifyContent: 'center'},
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
});
