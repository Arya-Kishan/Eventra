import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { CustomImage } from '@components/global/CustomImage'
import CustomText from '@components/global/CustomText'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'
import { NavigationProps, ProductType } from 'types/AppTypes'
import { useNavigation } from '@react-navigation/native'

interface ProductCardProps {
    product: ProductType
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {

    const navigation = useNavigation<NavigationProps<'Main'>>();

    return (
        <Pressable onPress={() => navigation.navigate("ProductDetailScreen", { productId: product?._id! })} style={{ flex: 1, height: AppConstants.screenWidth * 0.6, backgroundColor: AppConstants.whiteColor, margin: s(5), gap: vs(6), borderRadius: s(10), position: "relative" }} >

            <CustomImage width={"100%"} height={"70%"} containerStyle={{}} source={product!.pic} style={{ objectFit: "cover" }} />

            <View style={{ padding: s(5) }}>

                <CustomText variant='h5'>{product!.title}</CustomText>

                <View style={styles.justifyBtn}>
                    <CustomText variant='body2'>{`₹${product!.price}`}</CustomText>
                </View>

            </View>

            <View style={{ position: "absolute", top: s(5), right: (5), backgroundColor: AppConstants.redColor, paddingVertical: s(5), paddingHorizontal: s(10), borderRadius: s(10) }}>
                <CustomText variant='caption' fontWeight='700' style={{ color: AppConstants.whiteColor }}>{`${product!.discountPercentage.toString()}%`}</CustomText>
            </View>

        </Pressable>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    justifyBtn: { justifyContent: "space-between", flexDirection: "row" }

})