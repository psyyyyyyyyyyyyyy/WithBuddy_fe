import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import styles from "./loginMain.module.css";

export default function LoginMain() {
  return (
    <div className={styles.allContainer}>
      <div className={styles.inputContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>With Buddy</h2>
          <p className={styles.subtitle}>서경대학교 선후배 학번 매칭 사이트</p>
        </div>
        <LoginInput />
        <LoginButton />
      </div>
      <button className={styles.loginButton}>로그인</button>
    </div>
  );
}
