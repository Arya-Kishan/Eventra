import AsyncStorage from '@react-native-async-storage/async-storage';
import {userType} from 'types/AppTypes';

const auth = '@user_data';
const TOKEN_KEY = 'fcmToken';

// Create/Update
export const AsyncSetData = async (value: userType) => {
  try {
    await AsyncStorage.setItem(auth, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error storing data:', e);
    return false;
  }
};

// Read
export const AsyncGetData = async () => {
  try {
    const value = await AsyncStorage.getItem(auth);
    return value;
  } catch (e) {
    console.error('Error reading data:', e);
    return null;
  }
};

// Delete
export const AsyncDeleteData = async () => {
  try {
    await AsyncStorage.removeItem(auth);
    return true;
  } catch (e) {
    console.error('Error deleting data:', e);
    return false;
  }
};

export const AsyncGetFCMToken = async () => {
  try {
    const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
    return storedToken;
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

export const AsyncSetFCMToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};
