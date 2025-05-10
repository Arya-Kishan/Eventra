import admin from "firebase-admin"
import { Notification } from "../models/notificationModel.js";

var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com"
});

console.log("DEEP LINK : ", process.env.APP_LINK)


const sendNotificationFCM = async (deviceToken, user, title, body, notification_type = "", link = "") => {

    // FIRST SAVING THE USER NOTIFICATION
    const notification = new Notification({
        user: user,
        title: title,
        body: body,
        notification_type: notification_type,
        link: `${process.env.APP_LINK}${link}`,
    });

    await notification.save();

    const message = {
        notification: {
            title: title,
            body: body
        },
        data: {
            notification_type: notification_type,
            link: `${process.env.APP_LINK}${link}`
        },
        token: deviceToken
    };

    try {
        const response = await admin.messaging().send(message);
        return { success: true, result: response, message: 'notification sent' };
    } catch (error) {
        console.log(error);
        return { success: false, result: error, message: 'notification not sent' };
    }

}

export default sendNotificationFCM;