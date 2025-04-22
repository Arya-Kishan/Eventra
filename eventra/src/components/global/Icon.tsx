import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IconType {
    iconType: "Entypo" | "Feather" | "FontAwesome" | "FontAwesome5" | "MaterialCommunityIcons" | "MaterialIcons",
    icon: string,
    size?: number,
    color?: string
}

const Icon: FC<IconType> = ({ color = "#FFFFFF", icon = "home", iconType = "Feather", size = 24 }) => {

    return (
        <>
            {
                iconType == "Entypo" && <Entypo name={icon} size={size} color={color} />
            }
            {
                iconType == "Feather" && <Feather name={icon} size={size} color={color} />
            }
            {
                iconType == "FontAwesome" && <FontAwesome name={icon} size={size} color={color} />
            }
            {
                iconType == "FontAwesome5" && <FontAwesome5 name={icon} size={size} color={color} />
            }
            {
                iconType == "MaterialCommunityIcons" && <MaterialCommunityIcons name={icon} size={size} color={color} />
            }
            {
                iconType == "MaterialIcons" && <MaterialIcons name={icon} size={size} color={color} />
            }
        </>
    )
}

export default Icon

const styles = StyleSheet.create({})

// "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "FontAwesome5Brands" | "FontAwesome6" | "FontAwesome6Brands" | "Fontisto" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial"