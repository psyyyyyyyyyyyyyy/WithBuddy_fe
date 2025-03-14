import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updatePost } from "../../api/postAPI";
import { FaTimes, FaCheck } from "react-icons/fa";
import styles from "../writePost/writePost.module.css";

export default function EditPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const post = location.state;

  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(post);
    if (post) {
      setTitle(post.title || "");
      setHashtags(post.postTags?.join(" ") || "");
      setContent(post.content || "");
    } else {
      navigate(-1);
    }
  }, [post, navigate]);

  const mutation = useMutation({
    mutationFn: ({ postId, data }) => updatePost(postId, data),
    onSuccess: () => {
      navigate(-1); // 수정 후 이전 페이지로 이동
    },
    onError: (error) => {
      alert("게시글 수정에 실패했습니다.");
      console.error(error);
    },
  });

  const handlePostUpdate = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    mutation.mutate({ postId: post.postId, data: { title, content } });
  };

  return (
    <div className={styles.writeContainer}>
      <div className={styles.header}>
        <FaTimes className={styles.icon} onClick={() => navigate(-1)} />
        <span className={styles.headerTitle}>글 수정</span>
        <FaCheck className={styles.icon} onClick={handlePostUpdate} />
      </div>

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
    </div>
  );
}
