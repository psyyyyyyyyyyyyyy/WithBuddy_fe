import Header from "../header/Header";
import styles from "./modificationCard.module.css";

export default function ModificationCard() {
  return (
    <div className={styles.allContainer}>
      <Header />
      <div className={styles.cardContainer}>
        <div className={styles.sectionHeader}>인적사항</div>
        <hr />
        <form className={styles.form}>
          <input type="text" placeholder="변예섭" className={styles.input} />
          <input
            type="text"
            placeholder="소프트웨어학과"
            className={styles.input}
            disabled
          />
          <input
            type="text"
            placeholder="2023216049"
            className={styles.input}
            disabled
          />
          <input
            type="password"
            placeholder="새로운 PIN번호"
            className={styles.input}
          />
          <input
            type="password"
            placeholder="새로운 PIN번호 확인"
            className={styles.input}
          />
        </form>
        <div className={styles.sectionHeader}>SNS 아이디</div>
        <hr />
        <form className={styles.form}>
          <input type="text" placeholder="인스타" className={styles.input} />
          <input type="text" placeholder="카톡" className={styles.input} />
        </form>
        <div className={styles.sectionHeader}>추가 정보</div>
        <hr />
        <form className={styles.form}>
          <input type="text" placeholder="MBTI" className={styles.input} />
          <input type="text" placeholder="한줄소개" className={styles.input} />
          <button type="submit" className={styles.button}>
            저장
          </button>
        </form>
      </div>
    </div>
  );
}
