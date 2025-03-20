export async function registerServiceWorker() {

  function isInAppBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes("naver") || userAgent.includes("gsa");
  }
  
  if (!("serviceWorker" in navigator)) {
    console.warn("이 브라우저는 Service Worker를 지원하지 않습니다.");
    return;
  }

  if (isInAppBrowser()) {
    console.warn("인앱 브라우저에서는 Service Worker를 등록하지 않습니다.");
    return;
  }

  try {
    await navigator.serviceWorker.register("firebase-messaging-sw.js");
    console.log("Service Worker 등록 성공");
  } catch (error) {
    console.error("Service Worker 등록 실패:", error);
  }
}
