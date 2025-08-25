import { io } from "socket.io-client";
import { useEffect } from "react";
import toast from "react-hot-toast";
import './notification.css'
import userimg from "../../assets/images/user.png"

export default function AdminNotifications() {
  useEffect(() => {
    const socket = io("https://empbackend-ten.vercel.app", { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
    });

    socket.on("leave_request", (data) => {
      console.log("Leave request received:", data); 

    toast.custom((t) => (
  <div className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}>
    <div className="toast-avatar">
      <img
        src={userimg}
        alt={data?.data?.name}
      />
    </div>
    <div className="toast-content">
      <p className="toast-title">{data?.data?.name}</p>
      <p className="toast-message">
        Requested <b>{data?.data?.leavetype}</b> <br />
        from <b>{data?.data?.leaveFrom}</b> to <b>{data?.data?.leaveTo}</b>
      </p>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="toast-dismiss"
      >
        ✕
      </button>
    </div>
  </div>
));

    });

    return () => socket.disconnect();
  }, []);

  return null;
}
