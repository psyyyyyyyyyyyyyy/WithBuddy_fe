import { APIService } from "./axios";

export async function postComments(postId, content) {
    try {
      const baseUrl = import.meta.env.VITE_APP_COMMENT;
      const response = await APIService.private.post(baseUrl, {
        postId,
        content,
      });
      return response;
    } catch (error) {
      console.error("댓글달기 오류:", error);
      throw error;
    }
  }

  export async function deleteComments(commmentId) {
    try {
      const baseUrl = `${import.meta.env.VITE_APP_COMMENT}/delete/${commmentId}`;
      const response = await APIService.private.delete(baseUrl);
      return response;
    } catch (error) {
      console.error("댓글삭제오류:", error);
      throw error;
    }
  }