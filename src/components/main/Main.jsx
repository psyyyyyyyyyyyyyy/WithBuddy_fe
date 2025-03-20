import { useEffect, useState } from "react";
import GroupMatching from "./GroupMatching";
import PersonalMatching from "./PersonalMatching";
import styles from "./main.module.css";
import Header from "../header/Header";
import { FaBell, FaBellSlash } from "react-icons/fa";
import {
  handleAllowNotification,
  postDeviceToken,
} from "../../util/notificationFunc";
import { getToken, deleteToken } from "firebase/messaging";
import { messaging } from "../../util/settingFCM.js";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function Main() {
  const [activeTab, setActiveTab] = useState("group");
  const [isLoading, setIsLoading] = useState(false);
  const [isNotiEnabled, setIsNotiEnabled] = useState(
    Notification.permission === "granted"
  );
  useEffect(() => {
    const fetchDeviceToken = async () => {
      try {
        const response = await getDeviceTokenFromServer();

        if (response.data.success.length === 0) {
          setIsNotiEnabled(false);
        } else {
          setIsNotiEnabled(true);
        } // 서버에서 토큰을 가져왔으면 알림 활성화
      } catch (error) {
        setIsNotiEnabled(false);
      }
    };

    fetchDeviceToken();
  }, []);
  // 알림 토글 핸들러
  const toggleNotification = async () => {
    if (Notification.permission === "default") {
      // 사용자가 아직 설정 안 했을 경우 → 알림 권한 요청
      const status = await handleAllowNotification();

      if (status === "granted") {
        alert("웹 알림이 활성화되었습니다!");
      } else {
        alert("알림 권한 요청이 취소되었습니다.");
      }
      return;
    }

    if (Notification.permission === "denied") {
      // 알림 차단된 경우 → 브라우저 설정에서 허용해야 함
      alert("알림이 차단되었습니다.\n브라우저 설정에서 직접 허용해주세요.");
      return;
    }

    // 현재 알림 상태에 따라 토글 (FCM 토큰 등록/삭제)
    setIsLoading(true); // 로딩 시작
    try {
      if (isNotiEnabled) {
        await deleteDeviceToken();
        setIsNotiEnabled(false);
        alert("웹 알림이 비활성화되었습니다.");
      } else {
        const token = await getDeviceToken();
        await postDeviceToken(token);
        setIsNotiEnabled(true);
        alert("웹 알림이 활성화되었습니다!");
      }
    } catch (error) {
      alert("알림 설정 변경 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 파이어베이스로 부터 토큰 가져오기
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const TOKEN_ENDPOINT = import.meta.env.VITE_APP_TOKEN;

  async function getDeviceToken() {
    const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;
    if (!vapidKey) throw new Error("VAPID Key가 설정되지 않았습니다.");
    return await getToken(messaging, { vapidKey });
  }
  const getDeviceTokenFromServer = async () => {
    try {
      const response = await axios.get(`${API_URL}${TOKEN_ENDPOINT}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      alert("다시 시도해주세요.");
    }
  };
  // 서버에서  토큰 삭제 (알림 수신 차단)
  const deleteDeviceToken = async () => {
    try {
      setIsLoading(true);
      await deleteToken(messaging);
      await axios.delete(`${API_URL}${TOKEN_ENDPOINT}/delete`, {
        withCredentials: true,
      });
    } catch (error) {
      alert("로그인 후 이용해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.allContainer}>
        <Header />
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>With Buddy</h2>
          <p className={styles.subtitle}>
            소프트웨어학과 선후배 학번 매칭 사이트
          </p>
          {/* 알림 토글 버튼 */}
          <button
            onClick={toggleNotification}
            className={styles.notiButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#6a9132" size={20} />
            ) : isNotiEnabled ? (
              <FaBell className={styles.bellIcon} />
            ) : (
              <FaBellSlash className={styles.bellIcon} />
            )}
          </button>
        </div>
          <div className={styles.tabContainer}>
            <button
              className={activeTab === "group" ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab("group")}
            >
              그룹 매칭
            </button>
            <button
              className={
                activeTab === "personal" ? styles.activeTab : styles.tab
              }
              onClick={() => setActiveTab("personal")}
            >
              개인 매칭
            </button>
          </div>
        <div className={styles.contentBox}>
          {activeTab === "group" ? <GroupMatching /> : <PersonalMatching />}
        </div>

        <p className={styles.matchingText}>
          {activeTab === "group"
            ? "인접한 학번의 선후배가 매칭됩니다."
            : "일치하는 학번의 선후배가 매칭됩니다."}
        </p>
      </div>
    </>
  );
}
