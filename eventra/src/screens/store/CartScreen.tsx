import CartCard from '@components/cart/CartCard';
import CustomLoader from '@components/global/CustomLoader';
import CustomText from '@components/global/CustomText';
import EmptyData from '@components/global/EmptyData';
import HorizontalRow from '@components/global/HorizontalRow';
import Icon from '@components/global/Icon';
import RoundedButton from '@components/global/RoundedButton';
import { AppConstants } from '@constants/AppConstants';
import { useNavigation } from '@react-navigation/native';
import { createorderApi } from '@services/OrderService';
import { clearCart, deleteProductFromCart, readCart } from '@storage/CartStorage';
import { useAppSelector } from '@store/hooks';
import { showToast } from '@utils/Helper';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s, vs } from 'react-native-size-matters';
import { CartProductType, NavigationProps, OrderType, ProductOrderType, ProductType } from 'types/AppTypes';

const CartScreen = () => {

    const [loader, setLoader] = useState<boolean>(false);
    const { loggedInUser } = useAppSelector(store => store.user);
    const [cartDetail, setCartDetail] = useState<CartProductType[] | null>(null)

    const navigation = useNavigation<NavigationProps<'VenueDetailScreen'>>();

    const fetchCarts = async () => {
        setLoader(true);
        const data = await readCart();
        console.log("ITEMS FROM CART : ", data)
        if (data.length !== 0) {
            setCartDetail(data);
        }
        console.log("CART DETAILS : ", data);
        setLoader(false);
    }

    const removeFromCart = async (item: CartProductType) => {
        const data = await deleteProductFromCart(item.product);
        fetchCarts();
    }
    const calculateTotalCartPrice = (): number => {
        let totalPrice = 0;
        console.log("cartItems : ", cartDetail);

        cartDetail!.forEach(item => {
            const discountAmount = (item!.product!.price * item!.product!.discountPercentage) / 100;
            const finalPricePerItem = item!.product!.price - discountAmount;
            const totalItemPrice = finalPricePerItem * Number(item!.quantity);
            totalPrice += totalItemPrice;
        });

        return Number(totalPrice.toFixed());
    };
    const PlaceOrder = async () => {

        const newProducts: ProductOrderType[] = cartDetail?.map((item) => ({ product: item.product, quantity: item?.quantity!, size: "XS" }))!;

        const newOrder: OrderType = {
            orderStatus: "processing",
            paymentMethod: "COD",
            paymentStatus: "pending",
            products: newProducts,
            shippingAddress: { area: "Gautam Chowk, Gola Bazar", city: "Sonpur", country: "India", phone: "8282009110", postalCode: "121223", state: "Bihar" },
            totalAmount: calculateTotalCartPrice(),
            user: loggedInUser?._id!
        }

        console.log("newOrder : ", newOrder);

        const { success, data } = await createorderApi(newOrder);
        success ? clearCart() : showToast({ title: "Order Placed", description: "", type: "success" });

    }


    useEffect(() => {
        fetchCarts();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Icon icon='arrow-back' iconType='MaterialIcons' color={AppConstants.redColor} size={s(28)} />
                </Pressable>
                <CustomText variant='h3' style={{ flex: 1, textAlign: "center" }}>My Cart</CustomText>
            </View>

            {
                loader
                    ?
                    <CustomLoader />
                    :
                    cartDetail == null || cartDetail.length == 0
                        ?
                        <EmptyData title='NO DATA' showBtn={false} />
                        :
                        <View style={{ flex: 1 }}>

                            <FlatList
                                data={cartDetail}
                                renderItem={({ item }: { item: CartProductType }) => (
                                    <CartCard product={item} removeFromCart={removeFromCart} calculateTotalCartPrice={calculateTotalCartPrice} cartDetail={cartDetail} setCartDetail={setCartDetail} />
                                )}
                                contentContainerStyle={{ padding: AppConstants.screenPadding, gap: vs(20) }}
                            />

                            <View style={styles.bottom}>

                                <View style={styles.bottomBox1}>
                                    <CustomText variant='h4'>Total</CustomText>
                                    <CustomText variant='h4'>{`₹${calculateTotalCartPrice()}`}</CustomText>
                                </View>

                                <RoundedButton title='Buy Now' onPress={() => { PlaceOrder() }} />

                            </View>

                        </View>
            }

        </SafeAreaView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    header: { flexDirection: "row", paddingHorizontal: AppConstants.screenPadding, paddingVertical: s(10), alignItems: "center" },
    bottom: { position: "absolute", bottom: s(0), left: s(0), width: "100%", padding: s(20), backgroundColor: AppConstants.whiteColor, gap: vs(10) },
    bottomBox1: { flexDirection: "row", justifyContent: "space-between", padding: s(5), alignItems: "center" },

})