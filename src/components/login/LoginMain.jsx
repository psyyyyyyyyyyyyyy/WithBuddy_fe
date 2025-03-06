import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import styles from "./loginMain.module.css";

export default function LoginMain() {
  return (
    <div className={styles.allContainer}>
      <h3 className={styles.mainText}>With Buddy</h3>
      <div className={styles.inputContainer}>
        <LoginInput />
        <LoginButton />
      </div>
      <button className={styles.loginButton}>로그인</button>
    </div>
  );
}
