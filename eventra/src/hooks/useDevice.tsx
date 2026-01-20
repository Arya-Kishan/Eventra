import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
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
    isKeyboardVisible,
    keyboardHeight,
    deviceInfo,
    insets,
  };
};

export default useDevice;
