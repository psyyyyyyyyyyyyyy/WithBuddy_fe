import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./chat.module.css";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { FaPaperPlane, FaArrowLeft } from "react-icons/fa";

const ChatPage = () => {
  const { id } = useParams();
  const roomId = Number(id);
  const userId = Number(localStorage.getItem("userId"));
  const studentId = localStorage.getItem("studentId") || "";

  const studentYear = studentId.slice(3, 5); // ""까지 포함되어 저장되기 때문에 3,5로 설정
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io("https://api.skuwithbuddy.com", {withCredentials: true});
    setSocket(newSocket);

    newSocket.on("connect", () => {
      newSocket.emit("joinRoom", { userId, roomId });
      newSocket.emit("getMessages", roomId);
    });

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
      socket.emit("getMessages", roomId);
      setMessage("");
    }
    
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className={styles.allContainer}>
      <Header />
      <div className={styles.cardContainer}>
      <button className={styles.back_button} onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

        <div className={styles.messages_section}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                msg.senderId === userId ? styles.right : styles.left
              }`}
            >
              <div className={styles.userInfoContainer}>
                <span className={styles.nameText}>
                  {msg.sender.name}
                  <span className={styles.studentId}>{studentYear}학번</span>
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
            <FaPaperPlane />
          </button>
        </form>
      </div>{" "}
    </div>
  );
};

export default ChatPage;
