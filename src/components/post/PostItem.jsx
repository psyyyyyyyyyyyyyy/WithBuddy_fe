import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import styles from "./postItem.module.css";
import { forwardRef } from "react"; // ref를 받기 위해 forwardRef 사용

const PostItem = forwardRef(({ post }, ref) => {
  const navigate = useNavigate();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div
      className={styles.postItem}
      onClick={() => navigate(`/post/${post.postId}`, { state: post.postId })}
      ref={ref} // ref 추가
    >
      <h3 className={styles.postTitle}>{post.title}</h3>
      <p className={styles.postContent}>{post.content}</p>
      <span className={styles.postTime}>
        <FaHeart className={styles.heartIcon} /> {post.likeCount || 0} |{" "}
        {formatDate(post.createdAt)}
      </span>
    </div>
  );
});

PostItem.displayName = "PostItem";
export default PostItem;
