import { FaPen } from "react-icons/fa";
import styles from "./writeButton.module.css";
import { useNavigate } from "react-router-dom";

export default function WriteButton() {
  const navigate = useNavigate();

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.writeButton} onClick={() => navigate("/write")}>
        <FaPen className={styles.icon} />
        글쓰기
      </button>
    </div>
  );
}
