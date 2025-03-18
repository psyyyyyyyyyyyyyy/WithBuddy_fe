import { useState } from "react";
import GroupMatching from "./GroupMatching";
import PersonalMatching from "./PersonalMatching";
import styles from "./main.module.css";
import Header from "../header/Header";
import { FaBell, FaBellSlash } from "react-icons/fa";
import { handleAllowNotification, postDeviceToken } from "../../util/notificationFunc";
import { getToken, deleteToken } from "firebase/messaging";
import { messaging } from "../../util/settingFCM.js";

export default function Main() {
  const [activeTab, setActiveTab] = useState("group");
  const [isNotiEnabled, setIsNotiEnabled] = useState(Notification.permission === "granted");

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
};

// FCM 토큰 가져오기
async function getDeviceToken() {
  const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;
  if (!vapidKey) throw new Error("VAPID Key가 설정되지 않았습니다.");
  return await getToken(messaging, { vapidKey });
}

// FCM 토큰 삭제 (알림 수신 차단)
const deleteDeviceToken = async () => {
  try {
    await deleteToken(messaging);
    console.log("FCM 토큰 삭제 완료 (알림 끄기)");
  } catch (error) {
    console.error("FCM 토큰 삭제 실패:", error);
  }
};

  return (
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
        >
          {isNotiEnabled ? (
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
          className={activeTab === "personal" ? styles.activeTab : styles.tab}
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
  );
}
