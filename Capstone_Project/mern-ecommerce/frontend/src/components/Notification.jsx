import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

export default function Notification() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded shadow-lg max-w-md ${
            notification.type === 'error' 
              ? 'bg-red-500 text-white' 
              : notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              {notification.title && <h4 className="font-bold">{notification.title}</h4>}
              <p>{notification.message}</p>
            </div>
            <button 
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}