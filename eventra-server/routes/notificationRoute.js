import express from 'express';
import {
    createNotification,
    getUserNotifications,
    markNotificationAsRead,
    markAllAsRead,
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', createNotification);
router.get('/:userId', getUserNotifications);
router.put('/:id/read', markNotificationAsRead);
router.put('/markAllRead/:userId', markAllAsRead);

export default router;