import {Dimensions} from 'react-native';
import {s} from 'react-native-size-matters';
import Config from 'react-native-config';

const {width, height} = Dimensions.get('window');

export const AppConstants = {
  // COLORS
  black: '#000000FF',
  white: '#FFFFFF',
  redColor: '#FF0000FF',
  lightRedColor: '#FF00002D',
  darkRedColor: '#A30000FF',
  greenColor: '#26FF00FF',
  blueColor: '#0800FFFF',
  whiteColor: '#FFFFFF',
  grayColor: '#CCCCCCFF',
  darkGrayColor: '#797979FF',
  grayLightColor: '#ECECECFF',
  inputBgColor: '#F9FAFB',

  defaultGap: s(16),
  borderRadius: s(10),

  screenPadding: s(16),
  screenBgColor: '#FFFFFF',
  screenWidth: width,
  screenHeight: height,

  baseUrl: Config.BASE_URL,
  socketBaseUrl: Config.SOCKET_BASE_URL,
  appUniversalLink: Config.APP_UNIVERSAL_LINK,
  EVENTRA_WEB_CLIENT_ID: Config.EVENTRA_WEB_CLIENT_ID,
  EVENTRA_WEB_CLIENT_SECRET: Config.EVENTRA_WEB_CLIENT_SECRET,
  EVENTRA_ANDROID_CLIENT_ID: Config.EVENTRA_ANDROID_CLIENT_ID,

  headerHeight: s(70),

  fallbackProfilePic:
    'https://i.pinimg.com/736x/7d/ef/87/7def87133b56ce7e8cb357d95cd2de4c.jpg',
};

// COMMANDS :
// GET SHA FINGERPRINT : "keytool -list -v -keystore "$env:USERPROFILE\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android"
