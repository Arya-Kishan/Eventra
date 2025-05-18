import CustomHeader from '@components/global/CustomHeader'
import { CustomImage } from '@components/global/CustomImage'
import CustomLoader from '@components/global/CustomLoader'
import CustomText from '@components/global/CustomText'
import EmptyData from '@components/global/EmptyData'
import Icon from '@components/global/Icon'
import ProductCard from '@components/store/ProductCard'
import { AppConstants } from '@constants/AppConstants'
import { AppTemporaryContants } from '@constants/AppTemporaryConstants'
import { useSocket } from '@context/SocketContext'
import { useNavigation } from '@react-navigation/native'
import { getCategoryProductApi } from '@services/ProductService'
import { ensureCartFileExists } from '@storage/CartStorage'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, vs } from 'react-native-size-matters'
import { NavigationProps, ProductType } from 'types/AppTypes'

const StoreScreen = () => {

  const navigation = useNavigation<NavigationProps<'Main'>>();
  const dispatch = useAppDispatch();
  const { allEvents, upcomingEvents, eventLoader } = useAppSelector(store => store.event);
  const [loader, setLoader] = useState(false);
  const [categoryLoader, setCategoryLoader] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<ProductType[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const fetchProducts = async (category: string) => {
    setSelectedCategory(category);
    setLoader(true);
    const { data, success } = await getCategoryProductApi(category);
    success ? setAllProducts(data.data) : navigation.replace("ErrorScreen");
    setLoader(false);
  }

  const fetchCategoryProducts = async (category: string) => {
    setSelectedCategory(category);
    setCategoryLoader(true);
    const { data, success } = await getCategoryProductApi(category);
    success ? setAllProducts(data.data) : navigation.replace("ErrorScreen");
    setCategoryLoader(false);
  }

  const fetchCart = async () => {
    await ensureCartFileExists();
  }

  useEffect(() => {
    fetchProducts("jeans");
    fetchCart();
  }, [])

  console.log("ALL PRODUCTS : ", allProducts)

  // BOTTOM TAB BAR HIDE ANIMATED ----------------

  const { scrollDirection } = useSocket();

  const offsetY = useSharedValue(0);
  const direction = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentOffset = event.contentOffset.y;

      if (currentOffset > offsetY.value + 10) {
        direction.value = 1; // scrolling down
        scrollDirection.value = 1;
      } else if (currentOffset < offsetY.value - 10) {
        direction.value = -1; // scrolling up
        scrollDirection.value = -1;
      }

      offsetY.value = currentOffset;
    },
  });

  // BOTTOM TAB BAR HIDE ANIMATED ----------------

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={[styles.justifyBtn, { backgroundColor: AppConstants.redColor, padding: AppConstants.screenPadding }]}>
        <CustomText variant='h3' style={{ color: AppConstants.whiteColor }}>Store</CustomText>
        <Pressable onPress={() => navigation.navigate("CartScreen")}>
          <Icon icon='shopping-cart' iconType='Feather' />
        </Pressable>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={100}
        style={{ flex: 1 }}
      >

        <View style={{ gap: vs(10), padding: AppConstants.screenPadding }}>

          <CustomImage source='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6XQdX7t2CB-5y6DAwe95-jTtnWY4BS9iMSOVgDiRsCz31dZFd5uAoXnA9SEAX2asEeXc&usqp=CAU' width={"100%"} height={vs(100)} />

          <CustomHeader leftText='Categories' rightText='See All' />

          <FlatList
            data={AppTemporaryContants.storeCategoryArr}
            renderItem={({ item }: { item: { pic: string, title: string } }) => (
              <Pressable onPress={() => fetchCategoryProducts(item.title)} style={[{ backgroundColor: selectedCategory == item.title ? AppConstants.redColor : AppConstants.whiteColor, borderRadius: s(10) }]}>
                <CustomImage width={s(50)} height={s(50)} containerStyle={{ padding: s(15), backgroundColor: "transparent" }} source={item.pic} />
                {/* <CustomText>{item.title}</CustomText> */}
              </Pressable>
            )}
            horizontal
            contentContainerStyle={{ gap: s(10) }}
            showsHorizontalScrollIndicator={false}
          />

        </View>

        <View style={{ flex: 1, paddingHorizontal: AppConstants.screenPadding }}>
          {
            categoryLoader
              ?
              <CustomLoader />
              :
              allProducts && allProducts.length == 0
                ?
                <EmptyData title='NO PRODUCTS' handleAddClick={() => { }} showBtn={true} />
                :
                <>
                  <FlatList
                    data={allProducts!}
                    renderItem={({ item }: { item: ProductType }) => (
                      <ProductCard product={item} />
                    )}
                    numColumns={2}
                    contentContainerStyle={{ gap: s(2) }}
                    keyExtractor={(item) => (`${item?._id}`)}
                    scrollEnabled={false}
                  />
                </>

          }
        </View>

      </Animated.ScrollView>

    </SafeAreaView >
  )
}

export default StoreScreen

const styles = StyleSheet.create({
  justifyBtn: { justifyContent: "space-between", flexDirection: "row" }
})