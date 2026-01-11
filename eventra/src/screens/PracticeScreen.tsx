import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomImage} from '@components/global/CustomImage';
import {AppConstants} from '@constants/AppConstants';
import CustomText from '@components/global/CustomText';
import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';
import {s} from 'react-native-size-matters';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
};

const PracticeScreen = () => {
  const [productData, setProductData] = useState<ProductType[] | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const prevScrollY = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const direction = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const currentOffset = event.contentOffset.y;

      if (currentOffset > offsetY.value + 10) {
        direction.value = 1; // scrolling down
      } else if (currentOffset < offsetY.value - 10) {
        direction.value = -1; // scrolling up
      }

      offsetY.value = currentOffset;
    },
  });

  const fetchProducts = async () => {
    setLoader(true);
    const {data} = await axios('https://dummyjson.com/products');
    console.log('PRODUCTS DATA : ', data);
    setProductData(data.products);
    setLoader(false);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateY: direction.value === 1 ? withTiming(100) : withTiming(0)},
    ],
  }));

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log('PRODUCT DATA : ', productData);

  return (
    <View style={{flex: 1, padding: AppConstants.screenPadding}}>
      <Animated.ScrollView
        style={{flex: 1, gap: s(40)}}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {loader ? (
          <CustomLoader />
        ) : productData && productData.length == 0 ? (
          <EmptyData title="NO PRODUCT" />
        ) : (
          productData?.map(item => (
            <View
              key={item.id}
              style={{
                backgroundColor: AppConstants.whiteColor,
                padding: AppConstants.screenPadding,
                marginVertical: s(10),
              }}>
              <CustomImage
                source={item.thumbnail}
                width={
                  AppConstants.screenWidth - AppConstants.screenPadding * 4
                }
                height={
                  AppConstants.screenWidth - AppConstants.screenPadding * 4
                }
              />

              <View style={{paddingVertical: AppConstants.screenPadding}}>
                <CustomText variant="h5">{item.title}</CustomText>
                <CustomText>{item.description}</CustomText>
              </View>
            </View>
          ))
        )}
      </Animated.ScrollView>

      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
};

export default PracticeScreen;

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    bottom: s(20),
    right: s(20),
    width: s(50),
    height: s(50),
    backgroundColor: 'red',
  },
});
