import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import API from "../services/API";
import { useSelector } from "react-redux";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const socketRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    socketRef.current = io("http://localhost:8080");
    if (user?._id) socketRef.current.emit("joinNotifications", user._id);
    socketRef.current.on("newNotification", (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });
    return () => socketRef.current?.disconnect();
  }, [user]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const { data } = await API.get(`/notifications?userId=${user._id}`);
        setNotifications(data);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      }
    };
    if (user?._id) loadNotifications();
  }, [user]);

  const handleMarkAsRead = async (id) => {
    console.log("Marking as read:", id);
    try {
      const { data } = await API.patch(`/notifications/${id}/mark-as-read`);
      setNotifications(
        (prev) => prev.map((n) => (n._id === id ? data : n)) // Use the backend response
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full relative"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 font-semibold border-b">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-gray-500">No new notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleMarkAsRead(notification._id)}
                  className={`p-4 border-b cursor-pointer transition-colors duration-200 ${
                    !notification.read ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <div className="text-sm">{notification.message}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      notification.read ? "text-gray-400" : "text-blue-500"
                    }`}
                  >
                    {notification.read ? "Read" : "New"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
