import { APIService } from "./axios";

export async function postSignUp(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/signup";
    const response = await APIService.public.post(baseUrl, userData);
    return response;
  } catch (error) {
    ("회원가입 API 오류:", error);
    throw error;
  }
}

export async function postLogin(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/login";
    const response = await APIService.private.post(baseUrl, userData);
    return response;
  } catch (error) {
    ("로그인 API 오류:", error);
    throw error;
  }
}

export async function patchPIN(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/update/pin";
    const response = await APIService.public.patch(baseUrl, userData);
    return response;
  } catch (error) {
    ("핀번호 업데이트 오류:", error);
    throw error;
  }
}

export async function getMyInfo() {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/my";
    const response = await APIService.private.get(baseUrl);
    return response;
  } catch (error) {
    ("내 정보 오류:", error);
    throw error;
  }
}

export async function patchMyInfo(userData) {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/update";
    const response = await APIService.private.patch(baseUrl, userData);
    return response;
  } catch (error) {
    ("유저정보 업데이트 오류:", error);
    throw error;
  }
}

export async function deleteUser() {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/delete";
    const response = await APIService.private.delete(baseUrl);
    return response;
  } catch (error) {
    ("유저 탈퇴 오류:", error);
    throw error;
  }
}

export async function postLogout() {
  try {
    const baseUrl = import.meta.env.VITE_APP_USER + "/logout";
    const response = await APIService.private.post(baseUrl);
    return response;
  } catch (error) {
    ("로그아웃 API 오류:", error);
    throw error;
  }
}