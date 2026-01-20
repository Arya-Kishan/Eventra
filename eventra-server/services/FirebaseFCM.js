import admin from "firebase-admin";
import { Notification } from "../models/notificationModel.js";
import axios from "axios";

var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com",
});

const sendNotification = async ({
  deviceToken,
  user,
  title,
  body,
  feature,
  action,
  docId,
  link,
}) => {
  try {
    // FIRST SAVING THE USER NOTIFICATION
    const notification = new Notification({
      user,
      title,
      body,
      feature,
      action,
      docId,
      link: `${process.env.APP_LINK}${link}`,
    });

    await notification.save();

    const { data } = await axios.post(
      `${process.env.SOCKET_BASE_URL}/sendNotification`,
      {
        user: user,
        title: title,
        body: body,
        feature,
        action,
        docId,
        link: `${process.env.APP_LINK}${link}`,
        isRead: false,
        deviceToken: deviceToken,
      },
    );

    console.log("SENDING NOTIFICATION SERVER TO SOCKET SEND : ");
  } catch (error) {
    console.log(
      "ERROR IN SAVING NOTIFICATION OR TALKING TO OTHER SOCKET SERVER",
    );
    console.log(error);
  }
};

export default sendNotification;
