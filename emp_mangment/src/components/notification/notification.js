import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import "./notification.css";
import userimg from "../../assets/images/user.png";

export default function EmployeeNotifications() {
  const [socket, setSocket] = useState(null);
  const [empName, setEmpName] = useState("");

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const showSystemNotification = (title, body) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: '/Brainart.ico', 
      });
    }
  };

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user")) || { user: {} };
      setEmpName(storedUser.user?.name || "");
    };

    updateUser();
    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  useEffect(() => {
    if (!empName) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io("https://empmangment-backend.onrender.com", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
      console.log("emp name:", empName);
      newSocket.emit("joinRoom", empName);
    });

    const playNotificationSound = () => {
      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch((err) => console.error("Audio play failed:", err));
    };

    newSocket.on("leaveStatusChange", (data) => {
      console.log("Leave status update:", data);
      playNotificationSound();
      showSystemNotification(data?.name, data?.message);

      let stored = JSON.parse(localStorage.getItem("emp_notifications")) || [];
      stored.push({ ...data, seen: false });
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


    newSocket.on("taskassinged", ({ data }) => {
      console.log("Task Assigned:", data);
      playNotificationSound();
      showSystemNotification(
        "Task Assigned",
        `Hello ${data?.name?.name}, your task '${data?.title}' is due on ${data?.duedate}.`
      );

      let stored = JSON.parse(localStorage.getItem("task_notifications")) || [];
      stored.push({ ...data, seen: false });
      localStorage.setItem("task_notifications", JSON.stringify(stored));

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
              alt={data?.name?.name || "Employee"}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </div>
          <div className="toast-content">
            <p className="toast-title" style={{ fontWeight: "600", margin: 0 }}>
              {data?.name?.name}
            </p>
            <p className="toast-message" style={{ margin: 0 }}>
              {`Hello ${data?.name?.name}, your task '${data?.title}' is due on ${data?.duedate}.`}
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

    newSocket.on("chatmassge",({ data}) =>{
      console.log("new meassge" , data);
      playNotificationSound();
      showSystemNotification(
        "new message",
       `Admin send you: ${data?.message?.substr(0, 20)}...`
      );

      let stored = JSON.parse(localStorage.getItem("new_meassge")) || [];
      stored.push({...data,seen:false});
      localStorage.setItem("new_meassge" , JSON.stringify(stored));

      toast.custom((t) =>{
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
              alt={data?.name?.name || "Employee"}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          </div>
          <div className="toast-content">
            <p className="toast-title" style={{ fontWeight: "600", margin: 0 }}>
              {data?.receiver}
            </p>
             <p className="toast-message" style={{ margin: 0 }}>
            {`Admin send you: ${data?.message?.substr(0, 20)}...`}
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
      })
    })

    return () => {
      if (newSocket) {
        newSocket.emit("leaveRoom", empName);
        newSocket.disconnect();
      }
    };
  }, [empName]);

  return null;
}
