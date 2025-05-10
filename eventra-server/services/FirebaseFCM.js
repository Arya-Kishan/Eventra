import admin from "firebase-admin"

var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com"
});


const sendNotificationFCM = async (deviceToken, title, body) => {

    // FIRST SAVING THE USER NOTIFICATION
    // const notification = new Notification({
    //     user: userId,
    //     type: type,
    //     message: { title: title, description: description },
    //     link: link,
    // });

    // await notification.save();

    const message = {
        notification: {
            title, body
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