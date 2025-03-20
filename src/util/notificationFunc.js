import { getToken } from "firebase/messaging";
import { messaging } from "./settingFCM.js";
import { registerServiceWorker } from "./notification.js";
import axios from "axios";

export async function handleAllowNotification() {
  if (Notification.permission === "default") {
    const status = await Notification.requestPermission();
    //여기서 에러 처리 해야함.
    // 나중에 차단되었을 때 다시 허용할 수 있도록 설정해야함 (그건 다시 까는 법밖에 없음))
    // 에러 처리 유연하게 대체하기 alret창 안뜨게 끔) 종류 3개 - granted, denied, default
    if (status === "denied") {
      return "denied";
    } else if (status === "granted") {
      try {
        // 서비스 워커 등록 완료를 기다림
        await registerServiceWorker();
        const token = await retryGetDeviceToken(3); // 최대 3번까지 재시도
        await postDeviceToken(token);
        return "granted";
      } catch (error) {
        console.error(error);
      }
    } else {
      return "default";
    }
  } else {
    return "exist Notification type";
  }
}

// getDeviceToken 재시도 로직 추가
async function retryGetDeviceToken(retries) {
  try {
    return await getDeviceToken();
  } catch (error) {
    if (retries === 0) {
      console.error("최대 재시도 횟수 초과:", error);
      throw error;
    } else {
      console.warn(`getDeviceToken 재시도 중... 남은 횟수: ${retries}`);
      return retryGetDeviceToken(retries - 1);
    }
  }
}

function isInAppBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes("naver") || userAgent.includes("gsa");
}


async function getDeviceToken() {
  if (isInAppBrowser()) {
    console.warn("인앱 브라우저에서는 FCM을 지원하지 않습니다.");
    return null; // FCM 미지원 환경에서는 토큰 요청 안 함
  }

  if (Notification.permission !== "granted") {
    console.warn("알림 권한이 허용되지 않음.");
    return null;
  }

  const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;
  if (!vapidKey) {
    console.error("VAPID Key가 설정되지 않았습니다.");
    return null;
  }

  try {
    return await getToken(messaging, { vapidKey });
  } catch (error) {
    console.error("FCM 토큰 가져오기 실패:", error);
    return null;
  }
}

const API_URL = import.meta.env.VITE_APP_API_URL;
const TOKEN_ENDPOINT = import.meta.env.VITE_APP_TOKEN;

export const postDeviceToken = async (deviceToken) => {
  const response = await axios.post(
    `${API_URL}${TOKEN_ENDPOINT}/subscribe`,
    {},
    {
      headers: {
        engine: deviceToken,
      },
      withCredentials: true,
    }
  );
  return response;
};

