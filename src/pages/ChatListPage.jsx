import React, { useEffect, useState } from "react";
import styles from "./chatList.module.css";
import { CiUser } from "react-icons/ci";
import Header from "../components/header/Header";
import { io } from "socket.io-client";

const ChatList = () => {
  const userId = 1;
  const [rooms, setRooms] = useState([]);
  const [socket, setSocket] = useState(null);

  const getUserRooms = () => {
    if (socket) {
      socket.emit("getUserRooms", userId);
    }
  };

  useEffect(() => {
    const newSocket = io("https://api.skuwithbuddy.com");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      // 소켓 연결이 되면 getUserRooms 호출
      getUserRooms();
    });

    // 서버로부터 채팅방 목록을 받을 때
    newSocket.on("userRooms", (rooms) => {
      console.log(rooms);
      setRooms(rooms);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // socket이 변경될 때마다 getUserRooms 호출
  useEffect(() => {
    if (socket) {
      getUserRooms(); // socket이 준비되면 호출
    }
  }, [socket]); // socket이 변경될 때마다 실행

  return (
    <div className={styles.allContainer}>
      <Header />
      <div className={styles.cardContainer}>
        <hr />
        <div className={styles.room_list}>
          {rooms.length > 0 ? (
            rooms.map((room, index) => (
              <div key={index} className={styles.room_item} onClick={() => {}}>
                <div className={styles.room_item_avatar}>
                  <CiUser size={24} />
                </div>
                <div className={styles.room_item_info}>
                  <h2 className={styles.room_item_name}>
                    {room.room.roomName}
                  </h2>
                  <p className={styles.room_item_details}>
                    소프트웨어학과• {room.room.RoomType}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.loading}>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
