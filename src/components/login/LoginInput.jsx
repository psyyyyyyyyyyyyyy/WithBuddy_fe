import styles from "./loginInput.module.css";

export default function LoginInput({ setStudentId, setPin }) {
  return (
    <div className={styles.inputContainer}>
      <p className={styles.text}>학번</p>
      <input 
        className={styles.input} 
        placeholder="ex) 2022301031" 
        onChange={(e) => setStudentId(e.target.value)} 
      />
      <p className={styles.text}>PIN 번호</p>
      <input 
        className={styles.input} 
        type="password"
        placeholder="ex) 1027" 
        onChange={(e) => setPin(e.target.value)} 
      />
    </div>
  );
}
