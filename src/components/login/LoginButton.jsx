import styles from "./loginButton.module.css";

export default function LoginButton() {
  return (
    <div className={styles.buttonContainer}>
      <p className={styles.text}>PIN번호 찾기</p>
      <p className={styles.text}>회원가입</p>
    </div>
  );
}
