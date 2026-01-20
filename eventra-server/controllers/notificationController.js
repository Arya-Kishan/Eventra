import { Notification } from "../models/notificationModel.js";

export const createNotification = async (req, res) => {
  const { user, title, body, link, feature, action, docId } = req.body;

  try {
    const notification = new Notification({
      user,
      title,
      body,
      link,
      feature,
      action,
      docId,
    });
    await notification.save();
    res.status(201).json({ data: notification, message: "success" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification" });
  }
};

export const getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  console.log("USER ID GETTING ALL NOTIFICATION : ", userId);

  try {
    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
      });
    res.status(200).json({ data: notifications, message: "success" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.status(200).json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as read" });
  }
};

export const markAllAsRead = async (req, res) => {
  const { userId } = req.params;

  try {
    await Notification.updateMany(
      { user: userId, isRead: false },
      { isRead: true },
    );
    res
      .status(200)
      .json({ data: null, message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark all as read" });
  }
};
