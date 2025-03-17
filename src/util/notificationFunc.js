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
        throw error;
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

async function getDeviceToken() {
  const vapidKey = import.meta.env.VITE_APP_VAPID_KEY;
  if (!vapidKey) {
    throw new Error("VAPID Key가 설정되지 않았습니다.");
  }

  // 권한이 허용된 후에 토큰을 가져옴
  const token = await getToken(messaging, {
    vapidKey,
  });
  console.log(token);
  return token;
}

export const postDeviceToken = async (deviceToken) => {
  const userId = Number(localStorage.getItem("userId"));
  const response = await axios.post(
    "https://api.skuwithbuddy.com/api/v1/subscribe",
    { userId },
    {
      headers: {
        engine: deviceToken,
      },
    }
  );
  return response;
};
