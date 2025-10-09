// src/lib/notificationService.ts
import api from "./api";

// Get ALL notifications for user (with optional unreadOnly filter)
export const fetchNotifications = async (userId: string, unreadOnly = false) => {
  const { data } = await api.get(`/notifications/${userId}`, {
    params: {
      unreadOnly, 
    },
  });
  return data;
};
export const getAllNotifications = async (): Promise<Notification[]> => {
  const response = await api.get('/notifications'); // Endpoint مخصص للـ admin
  return response.data;
};

// Mark notification as read
export const markNotificationAsRead = async (id: string) => {
  const { data } = await api.patch(`/notifications/read/${id}`);
  return data;
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId: string) => {
  const { data } = await api.patch(`/notifications/read-all/${userId}`);
  return data;
};
