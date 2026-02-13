import {useEffect, useState} from 'react';
import {AppState, Keyboard} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useDevice = () => {
  const {top: statusBarHeight} = useSafeAreaInsets();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [appState, setAppState] = useState<'active' | 'inactive'>('active');
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

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'background') {
        setAppState('inactive');
      }

      if (nextAppState === 'active') {
        setAppState('active');
      }
    });

    fetchDeviceInfo();
    return () => {
      showSub.remove();
      hideSub.remove();
      subscription.remove();
    };
  }, []);

  return {
    statusBarHeight,
    isKeyboardVisible,
    keyboardHeight,
    deviceInfo,
    insets,
    appState,
  };
};

export default useDevice;
