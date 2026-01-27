import admin from "firebase-admin";

var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com",
});
console.log("link", process.env.APP_LINK);
const sendChatNotificationFCM = async ({
  deviceToken,
  title,
  body,
  feature = "",
  link = "",
}) => {
  if (!deviceToken) {
    return console.log("FCM TOKEN NOT PROVIDED");
  }

  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: {
      feature: feature,
      link: `${process.env.APP_LINK}${link}`,
    },
    android: {
      priority: "high",
      notification: {
        channel_id: "default",
        sound: "notification_sound",
      },
    },
    token: deviceToken,
  };

  try {
    const response = await admin.messaging().send(message);
    return { success: true, result: response, message: "notification sent" };
  } catch (error) {
    console.log(error);
    return { success: false, result: error, message: "notification not sent" };
  }
};

export default sendChatNotificationFCM;
