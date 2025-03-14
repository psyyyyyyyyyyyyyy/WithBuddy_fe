import { useState } from "react";
import { FaGithub, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import Header from "../header/Header";
import styles from "./settingCard.module.css";
import { deleteUser } from "../../api/userAPI";

export default function SettingCard() {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      localStorage.removeItem("userId");
      alert("회원 탈퇴가 완료되었습니다.");
      window.location.href = "/login";
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
    }
  };

  return (
    <div className={styles.allContainer}>
      <Header />
      <div className={styles.cardContainer}>
        <div className={styles.infoRow}>
          <FaGithub className={styles.icon} />
          <p>
            <a
              href="https://github.com/ye-seob"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              ye-seob
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/psyyyyyyyyyyyyyy"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              psyyyyyyyyyyyyyy
            </a>
          </p>
        </div>
        <div className={styles.infoRow}>
          <FaEnvelope className={styles.icon} />
          <p>
            <a href="mailto:skuwithBuddy@gmail.com" className={styles.link}>
              skuwithBuddy@gmail.com
            </a>
          </p>
        </div>
        <div className={styles.infoRow}>
          <FaSignOutAlt className={styles.icon} />
          <button className={styles.withdrawalButton} onClick={() => setShowModal(true)}>
            회원 삭제
          </button>
        </div>
      </div>

      {/* 회원 탈퇴 모달 */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p>정말 탈퇴하시겠습니까?</p>
            <div className={styles.modalButtons}>
              <button className={`${styles.modalButton} ${styles.confirmButton}`} onClick={handleDeleteUser}>
                예
              </button>
              <button className={`${styles.modalButton} ${styles.cancelButton}`} onClick={() => setShowModal(false)}>
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
