import React from 'react';
import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {s} from 'react-native-size-matters';
import {AppConstants} from '@constants/AppConstants';

const SmallVenueSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor="#E5E7EB" highlightColor="#F3F4F6">
      <View style={styles.parent}>
        {[1, 2].map(item => (
          <View key={item} style={styles.main}>
            {/* Left Image */}
            <View
              style={{
                width: s(50),
                height: s(50),
                borderRadius: s(6),
              }}
            />

            {/* Right content */}
            <View style={styles.title}>
              {/* Title */}
              <View style={styles.right} />

              {/* Bottom row */}
              <View style={styles.bottom}>
                {/* Address */}
                <View style={styles.address} />

                {/* Button */}
                <View
                  style={{
                    width: s(45),
                    height: s(20),
                    borderRadius: s(8),
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );
};

export default SmallVenueSkeleton;

const styles = StyleSheet.create({
  parent: {flexDirection: 'column', gap: 2},
  main: {
    width: AppConstants.screenWidth * 0.8,
    minWidth: AppConstants.screenWidth * 0.6,
    flexDirection: 'row',
    gap: s(5),
    borderRadius: s(10),
    overflow: 'hidden',
    padding: s(6),
  },
  title: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingRight: 8,
  },
  right: {
    width: '50%',
    height: s(14),
    borderRadius: 4,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: s(6),
  },
  address: {
    width: '20%',
    height: s(11),
    borderRadius: 4,
  },
});
