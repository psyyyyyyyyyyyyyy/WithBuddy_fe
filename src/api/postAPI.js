import { APIService } from "./axios";

export async function getPosts(lastPostId) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST + "/list";
    const response = await APIService.private.get(baseUrl, {
      params: { lastPostId },
    });
    return response;
  } catch (error) {
    console.error("게시물 불러오기 오류:", error);
    throw error;
  }
}

export async function getPostDetail(postId) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_POST}/${postId}`;
    const response = await APIService.private.get(baseUrl);
    return response;
  } catch (error) {
    console.error("게시물 상세보기 오류:", error);
    throw error;
  }
}

export async function postPost({ title, content }) {
  try {
    const baseUrl = import.meta.env.VITE_APP_POST;
    const response = await APIService.private.post(baseUrl, {
      title,
      content,
    });
    return response;
  } catch (error) {
    console.error("글쓰기 오류:", error);
    throw error;
  }
}

export async function deletePost(postId) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_POST}/delete/${postId}`;
    const response = await APIService.private.delete(baseUrl);
    return response;
  } catch (error) {
    console.error("글삭제 오류:", error);
    throw error;
  }
}

export async function updatePost(postId, data) {
  try {
    const baseUrl = `${import.meta.env.VITE_APP_POST}/update/${postId}`;
    const response = await APIService.private.put(baseUrl, data);
    return response;
  } catch (error) {
    console.error("글 수정 오류:", error);
    throw error;
  }
}
