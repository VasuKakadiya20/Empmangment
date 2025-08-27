    // import React, { useEffect } from "react";
    // import { io } from "socket.io-client";
    // import toast from "react-hot-toast";
    // import "./notification.css";
    // import userimg from "../../assets/images/user.png";

    // export default function EmployeeNotifications() {
    //   useEffect(() => {
    //     const socket = io("http://localhost:4000", {
    //       transports: ["websocket"],
    //     });

    //     const storedUser =
    //       JSON.parse(localStorage.getItem("user")) || { user: {} };
    //     const empName = storedUser.user?.name || "Employee";

    //     socket.on("connect", () => {
    //       console.log("Connected to socket server:", socket.id);

    //       if (empName) {
    //         socket.emit("joinRoom", empName);
    //       }
    //     });

    //     // Listener for leave status updates
    //     socket.on("leaveStatusChange", (data) => {
    //       console.log("Leave status update:", data);

    //       let stored = JSON.parse(localStorage.getItem("emp_notifications")) || [];
    //       stored.push({
    //         ...data,
    //         seen: false,
    //       });
    //       localStorage.setItem("emp_notifications", JSON.stringify(stored));

    //       toast.custom((t) => (
    //         <div
    //           className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
    //           style={{
    //             background: "#fff",
    //             padding: "12px",
    //             borderRadius: "8px",
    //             boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    //             display: "flex",
    //             alignItems: "center",
    //             gap: "10px",
    //             maxWidth: "300px",
    //           }}
    //         >
    //          <div className="toast-avatar">
    //         <img
    //           src={userimg}
    //           alt={data?.name}
    //           style={{ width: "40px", height: "40px", borderRadius: "50%" }}
    //         />
    //       </div>
    //       <div className="toast-content">
    //         <p className="toast-title" style={{ fontWeight: "600", margin: 0 }}>
    //           {data?.name}
    //         </p>
    //         <p className="toast-message" style={{ margin: 0 }}>
    //           {data?.message}
    //         </p>
    //       </div>
    //       <button
    //         onClick={() => toast.dismiss(t.id)}
    //         style={{
    //           marginLeft: "auto",
    //           background: "transparent",
    //           border: "none",
    //           cursor: "pointer",
    //           fontSize: "16px",
    //         }}
    //       >
    //         ✕
    //       </button>
    //     </div>
    //       ));
    //     });

    //     // Listener for task assignment notifications
    //   socket.on("taskassinged", ({ message, data }) => {
    //   console.log("Task Assigned:", data);

    //   try {
    //   let stored = JSON.parse(localStorage.getItem("task_notifications")) || [];
    //   stored.push({
    //     ...data,
    //     seen: false,
    //   });
    //   localStorage.setItem("task_notifications", JSON.stringify(stored));
    // } catch (error) {
    //   console.error("Error storing task notifications:", error);
    // }

    //   toast.custom((t) => (
    //     <div
    //       className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
    //       style={{
    //         background: "#fff",
    //         padding: "12px",
    //         borderRadius: "8px",
    //         boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    //         display: "flex",
    //         alignItems: "center",
    //         gap: "10px",
    //         maxWidth: "300px",
    //       }}
    //     >
    //       <div className="toast-avatar">
    //         <img
    //           src={userimg}
    //           alt={data?.name?.name || "Employee"}
    //           style={{ width: "40px", height: "40px", borderRadius: "50%" }}
    //         />
    //       </div>
    //       <div className="toast-content">
    //         <p className="toast-title" style={{ fontWeight: "600", margin: 0 }}>
    //           {data?.name?.name }
    //         </p>
    //         <p className="toast-message" style={{ margin: 0 }}>
    //           {`Hello ${data?.name?.name}, your task '${data?.title }' is due on ${data?.duedate }.`}
    //         </p>
    //       </div>
    //       <button
    //         onClick={() => toast.dismiss(t.id)}
    //         style={{
    //           marginLeft: "auto",
    //           background: "transparent",
    //           border: "none",
    //           cursor: "pointer",
    //           fontSize: "16px",
    //         }}
    //       >
    //         ✕
    //       </button>
    //     </div>
    //   ));
    // });
    //     // Cleanup to prevent duplicate listeners
    //     return () => {
    //       socket.off("leaveStatusChange");
    //       socket.off("taskassinged");
    //       socket.disconnect();
    //     };
    //   }, []);

    //   return null;
    // }

// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import toast from "react-hot-toast";
// import "./notification.css";
// import userimg from "../../assets/images/user.png";

// export default function EmployeeNotifications() {
//   const [socket, setSocket] = useState(null);
//   const [empName, setEmpName] = useState("");

//   useEffect(() => {
//     const storedUser  = JSON.parse(localStorage.getItem("user")) || { user: {} };
//     setEmpName(storedUser .user?.name || "Employee");
//   }, []);

//   useEffect(() => {
//     if (!empName) return;


//     const newSocket = io("https://empmangment-backend.onrender.com", { transports: ["websocket"] });
//     setSocket(newSocket);

//     newSocket.on("connect", () => {
//       console.log("Connected to socket server:", newSocket.id);
//       console.log("emp name: ",empName);
//       newSocket.emit("joinRoom", empName);
//     });

//     const playNotificationSound = () => {
//       const audio = new Audio("/sounds/notification.mp3"); 
//       audio.play().catch(err => console.error("Audio play failed:", err));
//     };

//     newSocket.on("leaveStatusChange", (data) => {
//       console.log("Leave status update:", data);
//       playNotificationSound(); 

//       let stored = JSON.parse(localStorage.getItem("emp_notifications")) || [];
//       stored.push({
//         ...data,
//         seen: false,
//       });
//       localStorage.setItem("emp_notifications", JSON.stringify(stored));

//       toast.custom((t) => (
//         <div
//           className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
//           style={{
//             background: "#fff",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//             maxWidth: "300px",
//           }}
//         >
//           <div className="toast-avatar">
//             <img
//               src={userimg}
//               alt={data?.name}
//               style={{ width: "40px", height: "40px", borderRadius: "50%" }}
//             />
//           </div>
//           <div className="toast-content">
//             <p className="toast-title" style={{ fontWeight: "600", margin: 0 }}>
//               {data?.name}
//             </p>
//             <p className="toast-message" style={{ margin: 0 }}>
//               {data?.message}
//             </p>
//           </div>
//           <button
//             onClick={() => toast.dismiss(t.id)}
//             style={{
//               marginLeft: "auto",
//               background: "transparent",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "16px",
//             }}
//           >
//             ✕
//           </button>
//         </div>
//       ));
//     });

//     newSocket.on("taskassinged", ({ message, data }) => {
//       console.log("Task Assigned:", data);
//       playNotificationSound(); 
//       try {
//         let stored = JSON.parse(localStorage.getItem("task_notifications")) || [];
//         stored.push({
//           ...data,
//           seen: false,
//         });
//         localStorage.setItem("task_notifications", JSON.stringify(stored));
//       } catch (error) {
//         console.error("Error storing task notifications:", error);
//       }

//       toast.custom((t) => (
//         <div
//           className={`toast-container ${t.visible ? "toast-enter" : "toast-leave"}`}
//           style={{
//             background: "#fff",
//             padding: "12px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//             maxWidth: "300px",
//           }}
//         >
//           <div className="toast-avatar">
//             <img
//               src={userimg}
//               alt={data?.name?.name || "Employee"}
//               style={{ width: "40px", height: "40px", borderRadius: "50%" }}
//             />
//           </div>
//           <div className="toast-content">
//             <p className="toast-title" style={{ fontWeight: "600", margin: 0 }}>
//               {data?.name?.name}
//             </p>
//             <p className="toast-message" style={{ margin: 0 }}>
//               {`Hello ${data?.name?.name}, your task '${data?.title}' is due on ${data?.duedate}.`}
//             </p>
//           </div>
//           <button
//             onClick={() => toast.dismiss(t.id)}
//             style={{
//               marginLeft: "auto",
//               background: "transparent",
//               border: "none",
//               cursor: "pointer",
//               fontSize: "16px",
//             }}
//           >
//             ✕
//           </button>
//         </div>
//       ));
//     });

//     return () => {
//       if (newSocket && empName) {
//         newSocket.emit("leaveRoom", empName);
//         newSocket.off("leaveStatusChange");
//         newSocket.off("taskassinged");
//         newSocket.disconnect();
//       }
//     };
//   }, [empName]);

//   return null;
// }

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import "./notification.css";
import userimg from "../../assets/images/user.png";

export default function EmployeeNotifications() {
  const [socket, setSocket] = useState(null);
  const [empName, setEmpName] = useState("");

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
    const storedUser = JSON.parse(localStorage.getItem("user")) || { user: {} };
    setEmpName(storedUser.user?.name || "");
  }, [localStorage.getItem("user")]); 
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
              {data?.name?.name }
            </p>
            <p className="toast-message" style={{ margin: 0 }}>
              {`Hello ${data?.name?.name}, your task '${data?.title }' is due on ${data?.duedate }.`}
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

    return () => {
      if (newSocket) {
        newSocket.emit("leaveRoom", empName);
        newSocket.disconnect();
      }
    };
  }, [empName]);

  return null;
}

