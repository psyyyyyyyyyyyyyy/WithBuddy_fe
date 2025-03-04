import styles from "./loginInput.module.css";

export default function LoginInput() {
  return (
    <div className={styles.inputContainer}>
      <p className={styles.text}>학번</p>
      <input className={styles.input} placeholder="ex) 2022301031" />
      <p className={styles.text}>PIN 번호</p>
      <input className={styles.input} placeholder="ex) 1027" />
    </div>
  );
}
