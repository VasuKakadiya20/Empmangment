// import { io } from "socket.io-client";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import "./notification.css";
// import userimg from "../../assets/images/user.png";

// const playNotificationSound = () => {
//   const audio = new Audio("/notification.mp3");
//   audio.play().catch((err) => console.error("Audio play failed:", err));
// };

// export default function AdminNotifications() {
//   const [permissionGranted, setPermissionGranted] = useState(false);

//   useEffect(() => {
//     if ("Notification" in window) {
//       Notification.requestPermission().then((perm) => {
//         setPermissionGranted(perm === "granted");
//       });
//     }

//     const socket = io("https://empmangment-backend.onrender.com", { transports: ["websocket"] });
//     const Admin = "admin"
//     socket.on("connect", () => {
//       console.log("Connected to socket server:", socket.id);
//        console.log("emp name:", Admin);
//       socket.emit("joinRoom", Admin);
//     });

//     socket.on("leave_request", (data) => {
//       console.log("Leave request received:", data);
//        let stored = JSON.parse(localStorage.getItem("leave_request")) || [];
//       stored.push({...data,seen:false});
//       localStorage.setItem("notifications" , JSON.stringify(stored));
//       if (permissionGranted) {
//         new Notification("Leave Request", {
//           body: `${data?.data?.name} requested ${data?.data?.leavetype} leave`,
//           icon: userimg, 
//         });

//         playNotificationSound();
//       }
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
//     socket.on("chatmassge", (data) => {
//       console.log("new meassge:", data);

//       if (permissionGranted) {
//         new Notification("new message", {
//           body: `${data?.data?.sender} send you ${data?.data?.message?.substr(0, 20)}...`,
//           icon: userimg, 
//         });

//          let stored = JSON.parse(localStorage.getItem("chatmassge")) || [];
//       stored.push({...data,seen:false});
//       localStorage.setItem("new_notifications" , JSON.stringify(stored));

//         playNotificationSound();
//       }
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
//              {`${data?.sender} send you: ${data?.message?.substr(0, 20)}...`}
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
//   }, [permissionGranted]);

//   return null;
// }
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./notification.css";
import userimg from "../../assets/images/user.png";
import { fetchDataFromApi } from "../../uttils/api";

const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play().catch((err) => console.error("Audio play failed:", err));
};

export default function AdminNotifications() {
  const [permissionGranted, setPermissionGranted] = useState(false);

const getUserImage = async (name) => {
    const emp = await fetchDataFromApi(`/emp/${name}`);
    return emp?.profileImage || userimg; 
};


  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((perm) => {
        setPermissionGranted(perm === "granted");
      });
    }

    const socket = io("https://empmangment-backend.onrender.com", {
      transports: ["websocket"],
    });

    const Admin = "admin";

    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
      console.log("emp name:", Admin);
      socket.emit("joinRoom", Admin);
    });

    // Leave request handler
    socket.on("leave_request", async (data) => {
      console.log("Leave request received:", data);

      const profileImage = await getUserImage(data?.data?.name);

      let stored = JSON.parse(localStorage.getItem("leave_request")) || [];
      stored.push({ ...data, seen: false, img : profileImage });
      localStorage.setItem("notifications", JSON.stringify(stored));

      if (permissionGranted) {
        new Notification("Leave Request", {
          body: `${data?.data?.name} requested ${data?.data?.leavetype} leave`,
          icon: profileImage,
        });

        playNotificationSound();
      }

      toast.custom((t) => (
        <div
          className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
        >
          <div className="toast-avatar">
            <img src={profileImage} alt={data?.data?.name} />
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

    // Chat message handler
    socket.on("chatmassge", async (data) => {
      console.log("new message:", data);

      const profileImage = await getUserImage(data?.data?.sender);

      if (permissionGranted) {
        new Notification("New Message", {
          body: `${data?.data?.sender} sent you ${data?.data?.message?.substr(
            0,
            20
          )}...`,
          icon: profileImage,
        });

        let stored = JSON.parse(localStorage.getItem("chatmassge")) || [];
        stored.push({ ...data, seen: false });
        localStorage.setItem("new_notifications", JSON.stringify(stored));

        playNotificationSound();
      }

      toast.custom((t) => (
        <div
          className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
        >
          <div className="toast-avatar">
            <img src={profileImage} alt={data?.data?.sender} />
          </div>
          <div className="toast-content">
            <p className="toast-title">{data?.data?.sender}</p>
            <p className="toast-message">
              {`${data?.data?.sender} sent you: ${data?.data?.message?.substr(
                0,
                20
              )}...`}
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

