import { CustomImage } from '@components/global/CustomImage'
import CustomText from '@components/global/CustomText'
import Icon from '@components/global/Icon'
import RoundedBox from '@components/global/RoundedBox'
import { AppConstants } from '@constants/AppConstants'
import React, { FC, useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { s } from 'react-native-size-matters'
import { CartProductType } from 'types/AppTypes'

interface CartCardProps {
    product: CartProductType,
    removeFromCart: (product: CartProductType) => {}
    calculateTotalCartPrice: () => {}
    cartDetail: CartProductType[]
    setCartDetail: (val: CartProductType[]) => void
}

const CartCard: FC<CartCardProps> = ({ product, removeFromCart, calculateTotalCartPrice, cartDetail, setCartDetail }) => {

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const data: CartProductType[] = cartDetail.map((item: CartProductType) => {
            if (item && product && item?.product!._id == product?.product!._id) {
                return { ...item, quantity: quantity }
            }
            return item;
        })
        setCartDetail(data);
    }, [quantity])


    return (
        <View style={styles.main}>

            <CustomImage width={s(80)} height={s(80)} source={product.product?.pic!} containerStyle={styles.image} style={{ objectFit: "cover" }} />

            <View style={styles.horizontal}>

                <View style={styles.spcBtn}>
                    <CustomText variant='h6' numberOfLines={2}>{`${product.product?.title}`}</CustomText>
                    <CustomText variant='body1'>{`₹${product.product?.price}`}</CustomText>
                </View>

                <View style={styles.right}>

                    <Pressable onPress={() => removeFromCart(product)}>
                        <Icon icon='delete' iconType='MaterialCommunityIcons' color={AppConstants.redColor} size={s(14)} />
                    </Pressable>

                    <View style={{ flexDirection: "row", gap: s(5) }}>
                        <RoundedBox size={s(20)} viewStyle={styles.sizeBox} rounded={s(5)} onPress={() => setQuantity(quantity - 1)}>
                            <Icon icon='minus' iconType='MaterialCommunityIcons' color={AppConstants.redColor} size={s(14)} />
                        </RoundedBox>
                        <RoundedBox size={s(20)} viewStyle={styles.sizeBox} rounded={s(5)}>
                            <CustomText variant='subtitle2'>{`${quantity}`}</CustomText>
                        </RoundedBox>
                        <RoundedBox size={s(20)} viewStyle={styles.sizeBox} rounded={s(5)} onPress={() => setQuantity(quantity + 1)}>
                            <Icon icon='add' iconType='MaterialIcons' color={AppConstants.redColor} size={s(14)} />
                        </RoundedBox>
                    </View>

                </View>

            </View>

            <View style={styles.floatBtn}>
                <CustomText variant='caption' fontWeight='700' style={{ color: AppConstants.whiteColor }}>{`${product.product!.discountPercentage.toString()}% off`}</CustomText>
            </View>

        </View>
    )
}

export default CartCard

const styles = StyleSheet.create({
    main: { flexDirection: "row", gap: s(10), backgroundColor: AppConstants.whiteColor, padding: s(10), borderRadius: s(10) },
    image: { padding: s(10), backgroundColor: AppConstants.whiteColor },
    horizontal: { flex: 1, flexDirection: "row" },
    spcBtn: { flex: 1, justifyContent: "space-between" },
    right: { width: "10%", justifyContent: "space-between", alignItems: "flex-end" },
    sizeBox: { backgroundColor: AppConstants.grayLightColor },
    floatBtn: { position: "absolute", top: s(8), left: (8), backgroundColor: AppConstants.redColor, paddingVertical: s(2), paddingHorizontal: s(5), borderRadius: s(10) }

})