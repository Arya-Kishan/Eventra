import {AppConstants} from '@constants/AppConstants';
import {useEffect, useState} from 'react';
import {Keyboard, Share} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useDevice = () => {
  const {top: statusBarHeight} = useSafeAreaInsets();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const insets = useSafeAreaInsets();
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: '',
    deviceName: '',
    os: '',
    osVersion: '',
    appVersion: '',
    buildNumber: '',
  });

  const fetchDeviceInfo = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const deviceName = await DeviceInfo.getDeviceName();
      const os = DeviceInfo.getSystemName();
      const osVersion = DeviceInfo.getSystemVersion();
      const appVersion = DeviceInfo.getVersion(); // e.g. "1.2.3"
      const buildNumber = DeviceInfo.getBuildNumber();

      const deviceData = {
        deviceId,
        deviceName,
        os,
        osVersion,
        appVersion,
        buildNumber,
      };

      setDeviceInfo(deviceData);
    } catch (error) {
      console.error('❌ Error fetching device info:', error);
    }
  };

  const shareLink = async (link: string) => {
    try {
      const result = await Share.share({
        message: `${AppConstants.appUniversalLink}${link}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Link shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing link:', error);
    }
  };

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setIsKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });

    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    fetchDeviceInfo();
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return {
    statusBarHeight,
    shareLink,
    isKeyboardVisible,
    keyboardHeight,
    deviceInfo,
    insets,
  };
};

export default useDevice;
