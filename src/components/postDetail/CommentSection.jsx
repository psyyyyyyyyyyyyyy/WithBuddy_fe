import { useState } from "react";
import styles from "./commentSection.module.css";
import { FaPaperPlane } from "react-icons/fa";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]); // 댓글 목록
  const [newComment, setNewComment] = useState(""); // 입력 중인 댓글

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // 빈 댓글 방지

    const newCommentObj = {
      id: comments.length + 1,
      text: newComment,
      time: new Date().toLocaleTimeString(),
    };

    setComments([...comments, newCommentObj]);
    setNewComment(""); // 입력창 초기화
  };

  return (
    <div className={styles.commentSection}>
    

      {/* 댓글 입력 */}
      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className={styles.commentInput}
        />
        <button type="submit" className={styles.commentButton}>
          <FaPaperPlane />
        </button>
      </form>

      {/* 작성된 댓글 목록 */}
      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <p>{comment.text}</p>
              <span className={styles.commentTime}>{comment.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
