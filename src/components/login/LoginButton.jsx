import { useNavigate } from "react-router-dom"
import styles from "./loginButton.module.css";

export default function LoginButton() {

  const navigate = useNavigate();

  return (
    <div className={styles.buttonContainer}>
      <p className={styles.text} onClick={() => navigate('/findPIN')}>PIN번호 찾기</p>
      <p className={styles.text} onClick={() => navigate('/signUp')}>회원가입</p>
    </div>
  );
}
