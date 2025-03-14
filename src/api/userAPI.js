import { APIService } from "./axios";

export async function postSignUp(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/signup";
    const response = await APIService.public.post(baseUrl, userData);
    return response;
  } catch (error) {
    console.error("회원가입 API 오류:", error);
    throw error; // 에러를 부모 컴포넌트로 던짐
  }
}

export async function postLogin(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/login";
    const response = await APIService.private.post(baseUrl, userData);
    return response;
  } catch (error) {
    console.error("로그인 API 오류:", error);
    throw error;
  }
}

export async function patchPIN(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/update/pin";
    const response = await APIService.public.patch(baseUrl, userData);
    return response;
  } catch (error) {
    console.error("핀번호 업데이트 오류:", error);
    throw error;
  }
}

export async function getMyInfo() {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/my";
    const response = await APIService.private.get(baseUrl);
    return response;
  } catch (error) {
    console.error("내 정보 오류:", error);
    throw error;
  }
}

export async function patchMyInfo(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/update";
    const response = await APIService.private.patch(baseUrl, userData);
    return response;
  } catch (error) {
    console.error("유저정보 업데이트 오류:", error);
    throw error;
  }
}
