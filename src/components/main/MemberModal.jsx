import { FaTimes, FaInstagram, FaCommentDots, FaBrain } from "react-icons/fa";
import { MdShortText } from "react-icons/md";
import styles from "./memberModal.module.css";

export default function GroupModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className={styles.name}>{member.name}</h2>
        <p className={styles.year}>{member.year}</p>
        <hr/>
        <div className={styles.infoContainer}>
          <div className={styles.infoRow}>
            <FaInstagram className={styles.icon} />
            <p>{member.instagram || "없음"}</p>
          </div>
          <div className={styles.infoRow}>
            <FaCommentDots className={styles.icon} />
            <p>{member.kakao || "없음"}</p>
          </div>
          <div className={styles.infoRow}>
            <FaBrain className={styles.icon} />
            <p>{member.mbti || "없음"}</p>
          </div>
          <div className={styles.infoRow}>
            <MdShortText className={styles.icon} />
            <p>{member.bio || "한줄소개 없음"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
