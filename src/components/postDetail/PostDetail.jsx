import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaComment, FaTimes } from "react-icons/fa";
import styles from "./postDetail.module.css";
import { useState } from "react";
import CommentSection from "./CommentSection";

export default function PostDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state; // 전달받은 게시물 정보
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likeCount, setLikeCount] = useState(post.likes || 0); // 좋아요 개수

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className={styles.allContainer}>
      {/* 헤더 */}
      <div className={styles.detailHeader}>
        <FaTimes className={styles.icon} onClick={() => navigate(-1)} />
      </div>
      <div className={styles.postDetail}>
        {/* 제목 & 해시태그 */}
        <div className={styles.postContentBox}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postHashtag}>{post.hashtags || "#태그없음"}</p>
        </div>

        {/* 게시글 내용 */}
        <p className={styles.postBody}>{post.content}</p>

        {/* 좋아요 & 댓글 */}
        <div className={styles.reactionContainer}>
          <button className={styles.likeButton} onClick={toggleLike}>
            {liked ? <FaHeart className={styles.likedIcon} /> : <FaRegHeart />}
            {likeCount}
          </button>
          <button className={styles.commentButton}>
            <FaComment /> {post.comments || 0}
          </button>
        </div>
        {/* 댓글 섹션 */}
        <CommentSection postId={post.id} />
      </div>
    </div>
  );
}
