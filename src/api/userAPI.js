import { APIService } from "./axios";

export async function postSignUp(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_USER + "/signup";
    const response = await APIService.public.post(baseUrl, userData);
    return response;
  } catch (error) {
    console.error("회원가입 API 오류:", error);
    throw error; // 에러를 부모 컴포넌트로 던짐
  }
}

export async function postLogin(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST_USER + "/login";
    const response = await APIService.public.post(baseUrl, userData);
    return response;
  } catch (error) {
    console.error("로그인 API 오류:", error);
    throw error;
  }
}
