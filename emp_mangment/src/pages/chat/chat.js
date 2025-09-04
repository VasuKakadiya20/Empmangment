// import React, { useState, useEffect } from "react";
// import {
//   FaArrowLeft,
//   FaVideo,
//   FaPhoneAlt,
//   FaEllipsisV,
//   FaSmile,
//   FaPaperclip,
//   FaCamera,
// } from "react-icons/fa";
// import { IoSend } from "react-icons/io5";
// import admin from "../../assets/images/logo2.png";
// import user from "../../assets/images/user.png"
// import axios from "axios";
// import "./ChatHeader.css";
// import { useRef } from "react";

// function Chat() {
//   const [chatId, setChatId] = useState(null); 
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//       const chatBodyRef = useRef(null);
// const employee = JSON.parse(localStorage.getItem("user")) || { user: {} };
// const empName = employee.user?.name
// useEffect(() => {
//   const fetchChatAndMessages = async () => {
//     try {
//       let id = chatId;
//       if (!id) {
//         const res = await axios.post("http://localhost:4000/chat/create", {
//             employeeId: employee.user?._id,
//           employeeName: employee.user?.name,
//         });
//         id = res.data._id;
//         console.log(res.data)
//         setChatId(id);
//       }
//       if (id) {
//         const res = await axios.get(`http://localhost:4000/msg/${id}`);
//         setMessages(res.data);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchChatAndMessages();
// }, [chatId, employee.user?.name]); 

//   useEffect(() => {
//       if (chatBodyRef.current) {
//         chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
//       }
//     }, [messages]);

//   const sendMessage = async () => {
//     if (!text.trim() || !chatId) return;

//     try {
//       const res = await axios.post("http://localhost:4000/msg/", {
//         chatId,
//         sender: empName, 
//         receiver: "admin",
//         message: text,
//       });

//       setMessages([...messages, res.data]);
//       console.log(res.data)
//       setText(""); 
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <div className="chat-left">
//           <FaArrowLeft className="icon" />
//           <img src={admin} alt="profile" className="profile-img" />
//           <span className="chat-name">Admin</span>
//         </div>
//         <div className="chat-right">
//           <FaVideo className="icon" />
//           <FaPhoneAlt className="icon" />
//           <FaEllipsisV className="icon" />
//         </div>
//       </div>

    
//  <div className="chat-body" ref={chatBodyRef}>
//         {/* {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={`chat-message ${
//               msg.sender === "employee" ? "employee-msg" : "admin-msg"
//             }`}
//           >
            
           
//             <div className="chat-bubble">
//             <b>{msg.sender === "employee" ? employee.user?.name : "Admin"}</b>
//               <p>{msg.message}</p>
//             </div>
//              <img
//               src={msg.sender === "employee" ? user : admin}
//               alt="profile"
//               className="chat-avatar"
//             />
//           </div>
//         ))} */}
//            {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={`chat-message ${
//               msg.sender === "admin" ? "admin-msg" : "employee-msg"
//             }`}
//           >
            
           
//             <div className="chat-bubble">
//             <b>{msg.sender === "admin" ? "Admin" :employee.user?.name  }</b>
//               <p>{msg.message}</p>
//             </div>
//              <img
//               src={msg.sender === "admin" ? admin: user  }
//               alt="profile"
//               className="chat-avatar"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <div className="input-box">
//           <FaSmile className="icon" />
//           <input
//             type="text"
//             placeholder="Message"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             onKeyDown={(e) => {
//     if (e.key === "Enter") {
//       sendMessage();
//     }
//   }}
//           />
//           <FaPaperclip className="icon" />
//           <FaCamera className="icon" />
//         </div>
//         <button className="send-btn" onClick={sendMessage}>
//           <IoSend />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;


import React, { useState, useEffect, useRef } from "react";
import {
  FaArrowLeft,
  FaVideo,
  FaPhoneAlt,
  FaEllipsisV,
  FaSmile,
  FaPaperclip,
  FaCamera,
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import admin from "../../assets/images/logo2.png";
import user from "../../assets/images/user.png";
import { fetchDataFromApi } from "../../uttils/api";
import axios from "axios";
import "./ChatHeader.css";

function Chat() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatBodyRef = useRef(null);

  const employee = JSON.parse(localStorage.getItem("user")) || { user: {} };
  const empName = employee.user?.name;

  useEffect(() => {
    const fetchChatAndMessages = async () => {
      try {
        let id = chatId;
        if (!id) {
          const res = await axios.post("https://empmangment-backend.onrender.com/chat/create", {
            employeeId: employee.user?._id,
            employeeName: employee.user?.name,
          });
          id = res.data._id;
          console.log("Chat created:", res.data);
          setChatId(id);
        }

        if (id) {
          const fetchMessages = async () => {
            try {
             fetchDataFromApi(`/msg/${id}`).then((res) =>{
               setMessages(res);
              //  console.log("chat data:",res)
             })
            } catch (err) {
              console.error(err);
            }
          };
          fetchMessages();
          const interval = setInterval(fetchMessages, 2000);
          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchChatAndMessages();
  }, [chatId, employee.user?.name]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim() || !chatId) return;

    try {
      const res = await axios.post("https://empmangment-backend.onrender.com/msg/", {
        chatId,
        sender: empName,
        receiver: "admin",
        message: text,
      });

      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-left">
          <FaArrowLeft className="icon" />
          <img src={admin} alt="profile" className="profile-img" />
          <span className="chat-name">Admin</span>
        </div>
        <div className="chat-right">
          <FaVideo className="icon" />
          <FaPhoneAlt className="icon" />
          <FaEllipsisV className="icon" />
        </div>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`chat-message ${
              msg.sender === "admin" ? "admin-msg" : "employee-msg"
            }`}
          >
            <div className="chat-bubble">
              <b>{msg.sender === "admin" ? "Admin" : employee.user?.name}</b>
              <p>{msg.message}</p>
            </div>
            <img
              src={msg.sender === "admin" ? admin : user}
              alt="profile"
              className="chat-avatar"
            />
          </div>
        ))}
      </div>

      <div className="chat-input">
        <div className="input-box">
          <FaSmile className="icon" />
          <input
            type="text"
            placeholder="Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <FaPaperclip className="icon" />
          <FaCamera className="icon" />
        </div>
        <button className="send-btn" onClick={sendMessage}>
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
