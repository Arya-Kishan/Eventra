import { Alert } from "react-native";
import Toast from 'react-native-toast-message';

export const formatISODate = (isoString: any) => {
    const dateObj = new Date(isoString);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    // Format time as hh:mm AM/PM
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return {
        date: dateObj.getDate(),                // Day of the month (1-31)
        month: months[dateObj.getMonth()],          // Month (1-12)
        year: dateObj.getFullYear(),            // Year (e.g., 2025)
        day: days[dateObj.getDay()],            // Day of the week (e.g., "Thursday")
        time: formattedTime,                   // e.g., "03:54 PM"
        hours: dateObj.getHours(),
        mins: dateObj.getMinutes(),
    };
}

export const formatDate = (isoString: string) => {
    const { date, day, month, time, year } = formatISODate(isoString)
    return isoString ? `${date} ${month}, ${year}` : ""
}

export const formatTime = (isoString: string) => {
    const { date, day, month, time, year } = formatISODate(isoString)
    return isoString ? `${time}` : ""
}

export const showAlert = ({ title, description, text1, text2, handleText1, handleText2 }: { title: string, description?: string, handleText1: () => void, handleText2: () => void, text1: string, text2: string }) => {

    Alert.alert(
        title, // Title of the alert
        description, // Message content
        [
            {
                text: text1, // Button label
                onPress: handleText1, // Action when button is pressed
            },
            {
                text: text2, // Button label
                onPress: handleText2, // Action when button is pressed
            },
        ],
        { cancelable: true } // Optional, if set to true, the alert can be dismissed by tapping outside
    )

}

export const showErrorAlert = (title: string, description: string) => {

    Alert.alert(
        title, // Title of the alert
        description, // Message content
        [
            {
                text: 'OK', // Button label
                onPress: () => console.log('OK Pressed'), // Action when button is pressed
            },
        ],
        { cancelable: true } // Optional, if set to true, the alert can be dismissed by tapping outside
    )

}



export const showToast = ({ title, description = "", type = "success" }: { title: string, description?: string, type?: "success" | "error" | "info" }) => {
    Toast.show({
        type: type,
        text1: title,
        text2: description
    });
}