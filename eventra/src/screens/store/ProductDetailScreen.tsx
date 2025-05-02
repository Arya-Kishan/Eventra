import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, ProductSizesType, ProductType, RouteProps } from 'types/AppTypes';
import { useAppSelector } from '@store/hooks';
import { getSingleProductApi } from '@services/ProductService';
import { CustomImage } from '@components/global/CustomImage';
import { AppConstants } from '@constants/AppConstants';
import CustomText from '@components/global/CustomText';
import StarRating from '@components/global/StarRating';
import RoundedButton from '@components/global/RoundedButton';
import { s, vs } from 'react-native-size-matters';
import CustomLoader from '@components/global/CustomLoader';
import EmptyData from '@components/global/EmptyData';
import { addProductToCart } from '@storage/CartStorage';
import { showToast } from '@utils/Helper';

const ProductDetailScreen = () => {

    const { params } = useRoute<RouteProps<'ProductDetailScreen'>>();
    const [loader, setLoader] = useState<boolean>(false);
    const [commentModal, setCommentModal] = useState(false);
    const [selectedsize, setSelectedSize] = useState<ProductSizesType>("M");
    const { loggedInUser } = useAppSelector(store => store.user);
    const [productDetail, setProductDetail] = useState<ProductType | null>(null)

    const navigation = useNavigation<NavigationProps<'VenueDetailScreen'>>();

    const fetchSingleProduct = async () => {
        setLoader(true);
        const { data, success } = await getSingleProductApi(params.productId);
        console.log("SINGLE PRODUCT DETAILS : ", data.data);
        if (success) {
            setProductDetail(data.data);
            setSelectedSize(data.data.sizes[0]);
        } else {
            navigation.navigate("ErrorScreen")
        }
        setLoader(false);
    }

    const handleAddToCart = async () => {
        await addProductToCart({ product: productDetail, quantity: 1, selectedsize: selectedsize });
        showToast({ title: "Added", description: "", type: "success" })
    }

    const handleSelectSize = (size: ProductSizesType) => {
        if (productDetail?.sizes?.includes(size)) {
            setSelectedSize(size);
        } else {
            showToast({ title: "SIZE NOT AVAILABLE", description: "", type: "error" })
        }

    }


    useEffect(() => {
        fetchSingleProduct();
    }, [])

    return (
        <SafeAreaView style={styles.SafeAreaView}>

            {
                loader
                    ?
                    <CustomLoader />
                    :
                    productDetail == null
                        ?
                        <EmptyData title='NO DATA' showBtn={false} />
                        :
                        <ScrollView style={styles.ScrollView}>

                            <View style={styles.main}>
                                <CustomImage width={AppConstants.screenWidth} height={AppConstants.screenHeight * 0.45} source={productDetail?.pic!} />

                                <View style={styles.parent}>
                                    <View style={styles.gap}>

                                        <CustomText variant='h2'>{`${productDetail?.title}`}</CustomText>

                                        <StarRating rating={productDetail?.rating!} />

                                        <View style={styles.stock}>
                                            <CustomText variant='h5'>{`₹${productDetail?.price}`}</CustomText>
                                            <CustomText>{`${productDetail.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}`}</CustomText>
                                        </View>

                                    </View>

                                    <CustomText variant='h4'>About</CustomText>

                                    <Text>{`${productDetail?.description}`}</Text>

                                    <CustomText variant='h4'>Size</CustomText>

                                    <View style={{ flexDirection: "row", gap: s(10) }}>

                                        {
                                            ["XS", "S", "M", "L", "XL", "XXL"].map((item, index) => (
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    key={index}
                                                    style={[styles.sizesBox, { backgroundColor: selectedsize == item ? AppConstants.redColor : productDetail.sizes?.includes(item) ? AppConstants.whiteColor : AppConstants.grayColor }]}
                                                    onPress={() => handleSelectSize(item as ProductSizesType)}
                                                >
                                                    <CustomText>{item}</CustomText>
                                                </TouchableOpacity>
                                            ))
                                        }

                                    </View>


                                </View>

                            </View>

                        </ScrollView>

            }

            <View style={styles.addBtn}>
                <RoundedButton title='Add to cart' onPress={handleAddToCart} style={{ borderRadius: 0 }} />
            </View>
        </SafeAreaView>
    )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    SafeAreaView: { flex: 1 },
    ScrollView: { flex: 1, gap: vs(10) },
    stock: { justifyContent: "space-between", flexDirection: "row", alignItems: "center" },
    sizesBox: { borderWidth: 2, width: s(40), height: s(40), justifyContent: "center", alignItems: "center", borderRadius: s(8) },
    addBtn: { width: "100%", position: "absolute", bottom: s(0), left: s(0) },
    gap: { gap: vs(10) },
    main: { gap: vs(10), paddingBottom: vs(50) },
    parent: { paddingHorizontal: AppConstants.screenPadding, gap: vs(10) }
})