import { APIService } from "./axios";

export async function postEmailSend(userEmail) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_EMAIL + "/send";
    const response = await APIService.public.post(baseUrl, userEmail);
    return response;
  } catch (error) {
    ("인증 이메일 전송 오류:", error);
    throw error; // 에러를 부모 컴포넌트로 던짐
  }
}

export async function postEmailVerify(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_EMAIL + "/verify";
    const response = await APIService.public.post(baseUrl, userData);
    return response;
  } catch (error) {
    ("인증 이메일 코드 일치 오류:", error);
    throw error; // 에러를 부모 컴포넌트로 던짐
  }
}
