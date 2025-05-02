import AsyncStorage from '@react-native-async-storage/async-storage';
import { userType } from 'types/AppTypes';

const auth = '@user_data';

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
