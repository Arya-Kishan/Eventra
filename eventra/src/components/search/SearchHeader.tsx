import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { s, vs } from 'react-native-size-matters'
import { AppConstants } from '@constants/AppConstants'
import CustomText from '@components/global/CustomText'
import { SearchType } from 'types/AppTypes'
import Icon from '@components/global/Icon'
import Logo from "@assets/icons/logo.svg"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface SearchHeaderProps {
    searchType: SearchType;
    handleSearch: (val: string) => void;
    setSearchType: (val: SearchType) => void;
}

const SearchHeader: FC<SearchHeaderProps> = ({ searchType, handleSearch, setSearchType }) => {

    const [input, setInput] = useState<string>("");
    const [showCancel, setShowCancel] = useState<boolean>(false);
    const translateY = useSharedValue(0);

    const searchTypes: SearchType[] = ["venue", "event", "user"];

    const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

    const handleAnimate = (show: boolean) => {

        show ? translateY.value = withTiming(vs(150), { duration: 1000 }) : translateY.value = withTiming(vs(0), { duration: 1000 });
    }

    const handleCancel = () => {
        setInput("");
        setShowCancel(false);
    }

    const handleInput = (word: string) => {
        setInput(word);
        setShowCancel(true);
    }

    const handleChangeSearchType = (word: SearchType) => {
        setInput("");
        setShowCancel(false);
        setSearchType(word);
        handleAnimate(false);
    }

    useEffect(() => {
        input.length == 0 && setShowCancel(false);
    }, [input])

    return (
        <LinearGradient
            colors={['#FF0000FF', '#BE0000FF']}
            style={styles.main}>

            <Animated.View style={[animatedStyle, styles.searchTypeBox]}>

                <View style={[styles.justifyBtn]}>
                    <CustomText variant='h2' style={{ color: AppConstants.redColor }}>Select Search Category</CustomText>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => handleAnimate(false)}>
                        <Icon iconType='Feather' icon='x' color={AppConstants.redColor} />
                    </TouchableOpacity>

                </View>

                <View style={styles.typeContainer}>
                    {
                        searchTypes.map((item) => (
                            <TouchableOpacity activeOpacity={0.5} onPress={() => handleChangeSearchType(item)} key={item} style={styles.typeBox}>
                                <CustomText style={styles.typeBoxText}>{item}</CustomText>
                            </TouchableOpacity>
                        ))
                    }
                </View>

            </Animated.View>

            <View style={styles.justifyBtn}>
                <View style={[styles.justifyBtn]}>
                    <CustomText variant='h1' style={{ textTransform: "capitalize", color: AppConstants.whiteColor }}>{`Search ${searchType}`}</CustomText>
                    <Logo width={s(30)} height={s(30)} />
                </View>
                <TouchableOpacity activeOpacity={0.5} onPress={() => handleAnimate(true)}>
                    <Icon iconType='Feather' icon='menu' color={AppConstants.whiteColor} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>

                <TouchableOpacity activeOpacity={0.5} onPress={() => handleSearch(input)}>
                    <Icon iconType='Feather' icon='search' color={AppConstants.grayColor} />
                </TouchableOpacity>

                <TextInput placeholder='Search...' onChangeText={(val: string) => handleInput(val)} value={input} style={styles.input} onSubmitEditing={() => handleSearch(input)} />

                <TouchableOpacity activeOpacity={0.5} onPress={() => handleCancel()}>
                    {showCancel && <Icon iconType='Feather' icon='x-circle' color={AppConstants.redColor} />}
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )
}

export default SearchHeader

const styles = StyleSheet.create({
    main: {
        height: vs(150),
        backgroundColor: "blue",
        padding: AppConstants.screenPadding,
        gap: vs(30),
        position: "relative"
    },
    logo: {
        width: s(50),
        height: s(50)
    },
    searchBox: {
        backgroundColor: AppConstants.whiteColor,
        padding: s(10),
        alignItems: "center",
        gap: s(10),
        flexDirection: "row",
        borderRadius: s(10)
    },
    input: {
        flex: 1,
        fontSize: s(15)
    },
    searchTypeBox: {
        width: AppConstants.screenWidth,
        backgroundColor: AppConstants.whiteColor,
        padding: AppConstants.screenPadding,
        gap: s(30),
        position: "absolute",
        top: -vs(150),
        left: 0,
        zIndex: 10,
        height: vs(150),
    },
    typeBox: { width: s(80), backgroundColor: AppConstants.redColor, justifyContent: "center", alignItems: "center", padding: s(10), borderRadius: s(10) },
    typeContainer: { flexDirection: "row", justifyContent: "space-evenly" },
    typeBoxText: { color: AppConstants.whiteColor },
    justifyBtn: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
})