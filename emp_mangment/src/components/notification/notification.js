// src/components/EmployeeNotifications.js
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import "./notification.css";
import userimg from "../../assets/images/user.png"; 

export default function EmployeeNotifications() {
  useEffect(() => {
    const socket = io("https://empmangment-backend.onrender.com", {
      transports: ["websocket"],
    });

    const storedUser =
      JSON.parse(localStorage.getItem("user")) || { user: {} };
    const empName = storedUser.user?.name || "Employee";

    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);

      if (empName) {
        socket.emit("joinRoom", empName); 
      }
    });

    socket.on("leaveStatusChange", (data) => {
      console.log("Leave status update:", data);

      let stored = JSON.parse(localStorage.getItem("emp_notifications")) || [];
      stored.push({
        ...data,
        seen: false,
      });
      localStorage.setItem("emp_notifications", JSON.stringify(stored));

      toast.custom((t) => (
        <div
          className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
          style={{
            background: "#fff",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            maxWidth: "300px",
          }}
        >
          <div className="toast-avatar">
            <img
              src={userimg}
              alt={data?.name}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </div>
          <div className="toast-content">
            <p className="toast-title" style={{ fontWeight: "600", margin: 0 }}>
              {data?.name}
            </p>
            <p className="toast-message" style={{ margin: 0 }}>
              {data?.message}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>
      ));
    });

    return () => socket.disconnect();
  }, []);

  return null;
}
