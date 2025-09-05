import React, { useState, useEffect } from "react";
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
import axios from "axios";
import "./ChatHeader.css";
import { fetchDataFromApi } from "../../uttils/api";
import { useRef } from "react";

function ChatWindow({ chatId, employeeName }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
    const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatId) {
      const fetchMessages = async () => {
      fetchDataFromApi(`/msg/${chatId}`).then((res)=>{
        setMessages(res)
      })
    }
     fetchMessages();
          const interval = setInterval(fetchMessages, 5000);
          return () => clearInterval(interval);
  }
  }, [chatId]);

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
        sender: "admin", 
        receiver:employeeName,
        message: text,
      });

      setMessages([...messages, res.data]);
      console.log(res.data)
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!chatId) {
    return <div className="chat-empty">👈 Select an employee to start chatting</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-left">
          <FaArrowLeft className="icon" />
          <img src={user} alt="profile" className="profile-img" />
          <span className="chat-name">{employeeName}</span>
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
            <img
              src={msg.sender === "admin" ? admin : user}
              alt="profile"
              className="chat-avatar"
            />
            <div className="chat-bubble">
              <b>{msg.sender === "admin" ? "Admin" : employeeName}</b>
              <p>{msg.message}</p>
            </div>
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

export default ChatWindow;
