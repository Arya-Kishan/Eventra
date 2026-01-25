import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {s, vs} from 'react-native-size-matters';
import {AppConstants} from '@constants/AppConstants';

const SpotLightCardSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor="#E5E7EB" highlightColor="#F3F4F6">
      <View
        style={{
          width: s(120),
          height: vs(200),
          borderRadius: AppConstants.borderRadius,
          overflow: 'hidden',
        }}>
        {/* Image placeholder */}
        <View
          style={{
            flex: 1,
            borderRadius: AppConstants.borderRadius,
          }}
        />

        {/* Text area */}
        <View style={{paddingTop: s(6)}}>
          {/* Title line */}
          <View
            style={{
              width: '90%',
              height: s(14),
              borderRadius: 4,
            }}
          />

          {/* Description line */}
          <View
            style={{
              marginTop: s(4),
              width: '70%',
              height: s(12),
              borderRadius: 4,
            }}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default SpotLightCardSkeleton;
