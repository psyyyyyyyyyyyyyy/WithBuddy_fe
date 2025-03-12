import React, { useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { io } from "socket.io-client";
import { CiCircleChevLeft } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

const ChatPage = () => {
  const roomId = 1;
  const userId = 1;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io("https://api.skuwithbuddy.com");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("joinRoom", { userId, roomId });
    });

    newSocket.emit("getMessages", roomId);

    newSocket.on("loadMessages", (msg) => {
      setMessages(msg);
    });

    newSocket.on("newMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      const newMsg = {
        userId,
        roomId,
        content: message,
      };

      socket.emit("sendMessage", newMsg);
      setMessage("");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className={styles.allContainer}>
      <Header />
      <div className={styles.cardContainer}>
        <div className={styles.messages_section}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                msg.senderId === userId ? styles.right : styles.left
              }`}
            >
              <div>
                <span>
                  {msg.sender.name}
                  <span>{msg.senderId}학번</span>
                </span>
              </div>
              <div>{msg.content}</div>
              <div className={styles.timestamp}>
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.input_section}>
          <input
            placeholder="메세지를 입력해주세요"
            type="text"
            value={message}
            className={styles.input}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={styles.send_button} type="submit">
            전송
          </button>
        </form>
      </div>{" "}
    </div>
  );
};

export default ChatPage;
