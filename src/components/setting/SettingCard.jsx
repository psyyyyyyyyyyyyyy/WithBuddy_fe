import { FaGithub, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import Header from "../header/Header";
import styles from "./settingCard.module.css";

export default function SettingCard() {
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
            <a
              href="mailto:skuwithBuddy@gmail.com"
              className={styles.link}
            >
              skuwithBuddy@gmail.com
            </a>
          </p>
        </div>
        <div className={styles.infoRow}>
          <FaSignOutAlt className={styles.icon} />
          <button className={styles.withdrawalButton}>회원 삭제</button>
        </div>
      </div>
    </div>
  );
}
