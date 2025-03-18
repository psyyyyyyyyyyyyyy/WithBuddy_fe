import { APIService } from "./axios";

export async function getPersonalMatching() {
  try {
    const baseUrl = import.meta.env.VITE_APP_GET_MATCHING + "/personal";
    const response = await APIService.private.get(baseUrl);
    return response;
  } catch (error) {
    ("개인 매칭 오류:", error);
    throw error; // 에러를 부모 컴포넌트로 던짐
  }
}

export async function getGroupMatching() {
  try {
    const baseUrl = import.meta.env.VITE_APP_GET_MATCHING + "/group";
    const response = await APIService.private.get(baseUrl);
    return response;
  } catch (error) {
    ("그룹 매칭 오류:", error);
    throw error; 
  }
}

export async function getMatchingInfo(userId) {
    try {
      const baseUrl = `${import.meta.env.VITE_APP_GET_MATCHING}/${userId}`;
      const response = await APIService.private.get(baseUrl);
      return response;
    } catch (error) {
      (`사용자 ${userId} 매칭 정보 오류:`, error);
      throw error;
    }
  }