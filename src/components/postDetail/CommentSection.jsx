import { useState, useEffect } from "react";
import styles from "./commentSection.module.css";
import { FaPaperPlane, FaEllipsisV } from "react-icons/fa";
import { postComments, deleteComments } from "../../api/commentAPI";

export default function CommentSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMap, setUserMap] = useState(new Map()); // 익명 매핑 저장
  const [openMenuId, setOpenMenuId] = useState(null);

  const loggedInUserId = Number(localStorage.getItem("userId")); // 로컬스토리지에서 userId 가져오기

  useEffect(() => {
    // 댓글을 commentId 기준으로 내림차순 정렬
    const sortedComments = [...initialComments].sort(
      (a, b) => b.commentId - a.commentId
    );

    // 익명 번호 부여 로직
    const newUserMap = new Map();
    let anonymousCounter = 1;

    sortedComments.forEach((comment) => {
      if (!newUserMap.has(comment.userId)) {
        newUserMap.set(comment.userId, `익명${anonymousCounter++}`);
      }
    });

    setUserMap(newUserMap);
    setComments(sortedComments);
  }, [initialComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLoading(true);

    try {
      const response = await postComments(postId, newComment);

      const savedComment = response?.success;

      setComments((prev) => [savedComment, ...prev]);

      setNewComment("");

      // 새 댓글 작성자에게 익명 번호 할당
      setUserMap((prevMap) => {
        if (!prevMap.has(savedComment.userId)) {
          const newAnonymousId = `익명${prevMap.size + 1}`;
          return new Map(prevMap).set(savedComment.userId, newAnonymousId);
        }
        return prevMap;
      });
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComments(commentId);
      setComments((prev) =>
        prev.filter((comment) => comment.commentId !== commentId)
      );
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const toggleMenu = (commentId) => {
    setOpenMenuId((prev) => (prev === commentId ? null : commentId));
  };

  // 날짜 포맷 함수 (YYYY-MM-DD HH:mm)
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
    <div className={styles.commentSection}>
      <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요."
          className={styles.commentInput}
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.commentButton}
          disabled={loading}
        >
          <FaPaperPlane />
        </button>
      </form>

      <div className={styles.commentList}>
        {comments.length === 0 ? (
          <p className={styles.noComments}>댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.commentId} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <p className={styles.nameText}>{userMap.get(comment.userId)}</p>
                {/* 현재 로그인한 userId와 댓글 작성자의 userId가 같을 때만 옵션 버튼 표시 */}
                {loggedInUserId === comment.userId && (
                  <div className={styles.commentMenuContainer}>
                    <button
                      className={styles.commentMenuButton}
                      onClick={() => toggleMenu(comment.commentId)}
                    >
                      <FaEllipsisV size={18} />
                    </button>

                    {/* 토글 메뉴 */}
                    <nav
                      className={`${styles.commentMenu} ${
                        openMenuId === comment.commentId
                          ? styles.commentMenuOpen
                          : ""
                      }`}
                    >
                      <ul>
                        <li
                          onClick={() => handleDeleteComment(comment.commentId)}
                        >
                          댓글 삭제하기
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
              {comment.content}
              <span className={styles.commentTime}>
                {formatDate(comment.createdAt)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
