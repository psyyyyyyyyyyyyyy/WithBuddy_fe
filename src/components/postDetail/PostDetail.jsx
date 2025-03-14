import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaTimes,
  FaEllipsisV,
} from "react-icons/fa";
import styles from "./postDetail.module.css";
import CommentSection from "./CommentSection";
import { getPostDetail, deletePost } from "../../api/postAPI";
import { ClipLoader } from "react-spinners";

export default function PostDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.state;

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loggedInUserId = Number(localStorage.getItem("userId")); // 로컬스토리지에서 userId 가져오기

  useEffect(() => {
    if (!postId) {
      navigate(-1);
      return;
    }

    const fetchPostDetail = async () => {
      try {
        const response = await getPostDetail(postId);
        const postData = response?.success || {};
        setPost(postData);
        setLikeCount(postData.likeCount || 0);
      } catch (error) {
        console.error("게시물 상세 조회 오류:", error);
        navigate(-1);
      }
    };

    fetchPostDetail();
  }, [postId, navigate]);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEditPost = () => {
    console.log("글 수정하기 클릭");
    // TODO: 글 수정 페이지로 이동 (예: navigate(`/edit/${postId}`))
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
      navigate("/post");
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
    }
  };

  if (!post) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinnerContainer}>
          <ClipLoader color="#6a9132" size={40} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.allContainer}>
      {/* 헤더 */}
      <div className={styles.detailHeader}>
        <FaTimes className={styles.icon} onClick={() => navigate(-1)} />

        {/* 현재 로그인한 userId와 post.userId가 같을 때만 옵션 버튼 표시 */}
        {loggedInUserId === post.userId && (
          <div className={styles.postMenuContainer}>
            <button className={styles.postMenuButton} onClick={toggleMenu}>
              <FaEllipsisV size={20} />
            </button>

            {/* 수정/삭제 메뉴 */}
            <nav
              className={`${styles.postMenu} ${
                menuOpen ? styles.postMenuOpen : ""
              }`}
            >
              <ul>
                <li onClick={() => console.log("글 수정")}>글 수정하기</li>
                <li onClick={() => setShowDeleteModal(true)}>글 삭제하기</li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      <div className={styles.postDetail}>
        {/* 제목 & 해시태그 */}
        <div className={styles.postContentBox}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postHashtag}>
            {post.postTags?.join(" ") || "#태그없음"}
          </p>
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
            <FaComment /> {post.comment || 0}
          </button>
        </div>

        {/* 댓글 섹션 */}
        <CommentSection
          postId={postId}
          initialComments={post?.comments || []}
        />
      </div>

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <p>정말 삭제하시겠습니까?</p>
            <div className={styles.modalButtons}>
              <button
                className={styles.confirmButton}
                onClick={handleDeletePost}
              >
                예
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setShowDeleteModal(false)}
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
