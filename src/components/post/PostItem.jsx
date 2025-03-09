import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import styles from "./postItem.module.css";

export default function PostItem({ post }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.postItem}
      onClick={() => navigate(`/post/${post.id}`, { state: post })}
    >
      <h3 className={styles.postTitle}>{post.title}</h3>
      <p className={styles.postContent}>{post.content}</p>
      <span className={styles.postTime}>
        <FaHeart className={styles.heartIcon} /> {post.likes || 0} | {post.time}{" "}
        | 익명
      </span>
    </div>
  );
}
