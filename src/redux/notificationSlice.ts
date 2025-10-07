import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchNotifications as fetchNotificationsAPI,
    markNotificationAsRead as markNotificationAsReadAPI,
    markAllNotificationsAsRead as markAllNotificationsAsReadAPI,
    getAllNotifications,
    
} from '../lib/notificationService';

interface Notification {
    _id: string;
    userId: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    loading: false,
    error: null,
};

export const fetchAllNotifications = createAsyncThunk(
    'notifications/fetchAll',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getAllNotifications();
        return data;
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    }
  );
  

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (userId: string, { rejectWithValue }) => {
        try {
            const data = await fetchNotificationsAPI(userId);
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch notifications');
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    'notifications/markNotificationAsRead',
    async (id: string, { rejectWithValue }) => {
        try {
            await markNotificationAsReadAPI(id);
            return id;
        } catch (error) {
            return rejectWithValue('Failed to mark notification as read');
        }
    }
);

export const markAllAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async (userId: string, { rejectWithValue }) => {
        try {
            await markAllNotificationsAsReadAPI(userId);
            return userId;
        } catch (error) {
            return rejectWithValue('Failed to mark all as read');
        }
    }
);

// Slice


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload.map(n => ({
                _id: n._id,
                userId: n.userId,
                message: n.message,
                isRead: n.isRead ?? false,
                createdAt: n.createdAt,
            }));
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift({
                ...action.payload,
                isRead: action.payload.isRead ?? false, // نتأكد من isRead
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
                state.loading = false;
                state.notifications = action.payload.map(n => ({
                    _id: n._id,
                    userId: n.userId,
                    message: n.message,
                    isRead: n.isRead ?? false,
                    createdAt: n.createdAt,
                }));
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
            });
    },
});


export const { setNotifications, addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
