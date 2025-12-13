import React, { createContext, useContext, useReducer } from 'react';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, { notifications: [] });

  const addNotification = (notification) => {
    // Prevent notification spam
    const currentTime = Date.now();
    const id = currentTime;
    
    console.log('Adding notification:', notification);
    dispatch({ type: 'ADD_NOTIFICATION', payload: { ...notification, id } });
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    }, 5000);
  };

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  return (
    <NotificationContext.Provider value={{
      notifications: state.notifications,
      addNotification,
      removeNotification,
      clearNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;