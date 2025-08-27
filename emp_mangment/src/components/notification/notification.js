    // // src/components/EmployeeNotifications.js
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


    // src/components/EmployeeNotifications.js
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import "./notification.css";
import userimg from "../../assets/images/user.png";

export default function EmployeeNotifications() {
  const [socket, setSocket] = useState(null);
  const [empName, setEmpName] = useState("");

  // Watch for user changes in localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || { user: {} };
    setEmpName(storedUser.user?.name || "Employee");
  }, [localStorage.getItem("user")]); // updates if localStorage changes

  useEffect(() => {
    if (!empName) return;

    // Connect socket
    const newSocket = io("http://localhost:4000", { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server:", newSocket.id);

      // Join the room of the current user
      newSocket.emit("joinRoom", empName);
    });

    // Listener for leave status updates
    newSocket.on("leaveStatusChange", (data) => {
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

    // Listener for task assignment notifications
    newSocket.on("taskassinged", ({ message, data }) => {
      console.log("Task Assigned:", data);

      try {
        let stored = JSON.parse(localStorage.getItem("task_notifications")) || [];
        stored.push({
          ...data,
          seen: false,
        });
        localStorage.setItem("task_notifications", JSON.stringify(stored));
      } catch (error) {
        console.error("Error storing task notifications:", error);
      }

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

    // Cleanup: leave room and disconnect
    return () => {
      if (newSocket && empName) {
        newSocket.emit("leaveRoom", empName);
        newSocket.off("leaveStatusChange");
        newSocket.off("taskassinged");
        newSocket.disconnect();
      }
    };
  }, [empName]);

  return null;
}
