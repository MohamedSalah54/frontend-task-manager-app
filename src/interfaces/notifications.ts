export interface Notification {
    _id: string;
    userId: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

export const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null,
};