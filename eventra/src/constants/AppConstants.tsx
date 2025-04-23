import { Dimensions } from "react-native"
import { s } from "react-native-size-matters"
import Config from 'react-native-config';

const { width, height } = Dimensions.get("window");

export const AppConstants = {

    // COLORS
    black: "#000000FF",
    redColor: "#FF0000FF",
    lightRedColor: "#FF00002D",
    darkRedColor: "#A30000FF",
    greenColor: "#26FF00FF",
    blueColor: "#0800FFFF",
    whiteColor: "#FFFFFF",
    grayColor: "#CCCCCCFF",
    darkGrayColor: "#797979FF",
    grayLightColor: "#ECECECFF",

    defaultGap: s(16),
    borderRadius: s(10),

    screenPadding: s(16),
    screenBgColor: "#FFFFFF",
    screenWidth: width,
    screenHeight: height,

    baseUrl : Config.BASE_URL,

}


// COMMANDS : 
// GET SHA FINGERPRINT : "keytool -list -v -keystore "$env:USERPROFILE\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android"