import { Notification } from '../models/notificationModel.js';


export const createNotification = async (req, res) => {
    const { user, type, message, link } = req.body;

    try {
        const notification = new Notification({
            user,
            type,
            message,
            link: link || '',
        });
        await notification.save();
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create notification' });
    }
};


export const getUserNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.find({ user: userId })
            .sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
};


export const markNotificationAsRead = async (req, res) => {
    const { id } = req.params;

    try {
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.status(200).json({ message: 'Marked as read' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to mark as read' });
    }
};


export const markAllAsRead = async (req, res) => {
    const { userId } = req.params;

    try {
        await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
        res.status(200).json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to mark all as read' });
    }
};
