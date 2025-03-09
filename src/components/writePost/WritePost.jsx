import { useState } from "react";
import styles from "./writePost.module.css";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaCheck, FaImage } from "react-icons/fa";

export default function WritePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // 여러 파일을 배열로 변환
    const newImages = files.map((file) => URL.createObjectURL(file)); // 미리보기 URL 생성
    setImages((prev) => [...prev, ...newImages]); // 기존 이미지와 합쳐서 업데이트
  };

  const handlePostSubmit = () => {
    console.log("제목:", title);
    console.log("해시태그:", hashtags);
    console.log("내용:", content);
    console.log("이미지:", images);
    navigate(-1); // 이전 페이지로 이동
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
      <div className={styles.imageUpload}>
        <label htmlFor="imageUpload" className={styles.imageButton}>
          <FaImage className={styles.imageIcon} />
          사진 추가
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple // 여러 개 선택 가능
          onChange={handleImageUpload}
          hidden
        />
      </div>

      {/* 이미지 미리보기 */}
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
    </div>
  );
}
