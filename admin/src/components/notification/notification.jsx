  // import { io } from "socket.io-client";
  // import { useEffect } from "react";
  // import toast from "react-hot-toast";
  // import "./notification.css";
  // import userimg from "../../assets/images/user.png";

  //   const playNotificationSound = () => {
  //     const audio = new Audio("/notification.mp3"); 
  //     audio.play().catch((err) => console.error("Audio play failed:", err));
  //   };


  // export default function AdminNotifications() {

  //   useEffect(() => {
  //     const socket = io("http://localhost:4000", { transports: ["websocket"] });

  //     socket.on("connect", () => {
  //       console.log("Connected to socket server:", socket.id);
  //     });

  //     socket.on("leave_request", (data) => {
  //       console.log("Leave request received:", data);

  //       playNotificationSound();

  //       let stored = JSON.parse(localStorage.getItem("notifications")) || [];
  //       stored.push({ ...data, seen: false });
  //       localStorage.setItem("notifications", JSON.stringify(stored));

  //       toast.custom((t) => (
  //         <div
  //           className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
  //         >
  //           <div className="toast-avatar">
  //             <img src={userimg} alt={data?.data?.name} />
  //           </div>
  //           <div className="toast-content">
  //             <p className="toast-title">{data?.data?.name}</p>
  //             <p className="toast-message">
  //               Requested <b>{data?.data?.leavetype}</b> <br />
  //               from <b>{data?.data?.leaveFrom}</b> to <b>{data?.data?.leaveTo}</b>
  //             </p>
  //             <button
  //               onClick={() => toast.dismiss(t.id)}
  //               className="toast-dismiss"
  //             >
  //               ✕
  //             </button>
  //           </div>
  //         </div>
  //       ));
  //     });

  //     return () => socket.disconnect();
  //   }, []);

  //   return null;
  // }



  import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./notification.css";
import userimg from "../../assets/images/user.png";

const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play().catch((err) => console.error("Audio play failed:", err));
};

export default function AdminNotifications() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        setPermissionGranted(perm === "granted");
      });
    }

    const socket = io("https://empmangment-backend.onrender.com", { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
    });

    socket.on("leave_request", (data) => {
      console.log("Leave request received:", data);

      if (permissionGranted) {
        new Notification("Leave Request", {
          body: `${data?.data?.name} requested ${data?.data?.leavetype} leave`,
          icon: userimg, 
        });

        playNotificationSound();
      }
      toast.custom((t) => (
        <div
          className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
        >
          <div className="toast-avatar">
            <img src={userimg} alt={data?.data?.name} />
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
  }, [permissionGranted]);

  return null;
}
