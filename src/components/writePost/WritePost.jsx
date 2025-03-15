import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postPost } from "../../api/postAPI"; // postPost 가져오기
import { FaTimes, FaCheck, FaImage } from "react-icons/fa";
import styles from "./writePost.module.css";

export default function WritePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [content, setContent] = useState("");
  //const [images, setImages] = useState([]);

  const parseHashtags = (input) => {
    return input
      .split(/\s+/) // 공백 기준으로 분리
      .filter((tag) => tag.startsWith("#") && tag.length > 1); // #으로 시작하고 글자 포함
  };

  // 글 작성 요청
  const mutation = useMutation({
    mutationFn: postPost,
    onSuccess: () => {
      navigate(-1); // 이전 페이지로 이동
    },
    onError: (error) => {
      alert("게시글 등록에 실패했습니다.");
      console.error(error);
    },
  });

  const handlePostSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    const hashtagArray = parseHashtags(hashtags);
    mutation.mutate({ title, content, postTags: hashtagArray });
  };

  return (
    <div className={styles.writeContainer}>
      {/* 헤더 */}
      <div className={styles.header}>
        <FaTimes className={styles.icon} onClick={() => navigate(-1)} />
        <span className={styles.headerTitle}>새 글 작성</span>
        <FaCheck className={styles.icon} onClick={handlePostSubmit} />
      </div>

      {/* 입력 폼 */}
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
          maxLength={30}
        />
        <input
          type="text"
          placeholder="해시태그 (#3학년 #전공)"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className={styles.hashtagInput}
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.contentInput}
        />
      </div>

      {/* 이미지 업로드 */}
      {/* 
      <div className={styles.imageUpload}>
        <label htmlFor="imageUpload" className={styles.imageButton}>
          <FaImage className={styles.imageIcon} />
          사진 추가
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          hidden
        />
      </div>
      */}

      {/* 이미지 미리보기 */}
      {/* 
      <div className={styles.previewContainer}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="미리보기"
            className={styles.previewImage}
          />
        ))}
      </div>
      */}
    </div>
  );
}
