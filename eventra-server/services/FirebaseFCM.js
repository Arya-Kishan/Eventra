import admin from "firebase-admin";
import { User } from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";

var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com",
});

const sendNotificationToUsersArr = async ({
  userIdArr = [], // ARRAY of tokens
  title,
  body,
  feature = "",
  action = "",
  docId = "",
  link = "",
}) => {
  if (!userIdArr.length) {
    return { success: false, message: "No user IDs provided" };
  }

  const saveNotificationsPromises = userIdArr.map(async (userId) => {
    const notification = new Notification({
      user: userId,
      title,
      body,
      feature,
      action,
      docId,
      link: `${process.env.APP_LINK}${link}`,
    });
    return notification.save();
  });

  // Save all notifications concurrently
  await Promise.all(saveNotificationsPromises);

  // FETCH USERS TO GET THEIR TOKENS

  const users = await User.find({
    _id: { $in: userIdArr },
  })
    .select("_id name email FCMToken") // fetch only required fields
    .lean(); // 🔥 faster, lighter objects

  const deviceTokens = users.map((user) => user.FCMToken);
  const uniqueTokensArr = [...new Set(deviceTokens)];
  const message = {
    notification: {
      title,
      body,
    },
    data: {
      feature,
      link: `${process.env.APP_LINK}${link}`,
    },
    android: {
      priority: "high",
      notification: {
        channel_id: "default",
        sound: "notification_sound",
      },
    },
    tokens: uniqueTokensArr, // 👈 array here
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);

    return {
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      responses: response.responses,
      message: "Notifications processed",
      error: null,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: error, message: "Notification failed" };
  }
};

export default sendNotificationToUsersArr;
