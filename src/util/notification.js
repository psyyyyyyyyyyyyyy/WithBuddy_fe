export async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register(
        "firebase-messaging-sw.js"
      );
    } catch (error) {
      console.error("Service Worker 등록 실패:", error);
    }
  }
  