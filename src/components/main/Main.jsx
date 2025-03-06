import { useState } from "react";
import GroupMatching from "./GroupMatching";
import PersonalMatching from "./PersonalMatching";
import styles from "./main.module.css";
import Header from "../header/Header";

export default function Main() {
  const [activeTab, setActiveTab] = useState("group");

  return (
    <div className={styles.allContainer}>
      <Header />
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>With Buddy</h2>
        <p className={styles.subtitle}>
          서경대학교 선후배 학번 매칭 사이트
        </p>
      </div>

      <div className={styles.tabContainer}>
        <button
          className={activeTab === "group" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("group")}
        >
          그룹 매칭
        </button>
        <button
          className={activeTab === "personal" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("personal")}
        >
          개인 매칭
        </button>
      </div>

      <div className={styles.contentBox}>
        {activeTab === "group" ? <GroupMatching /> : <PersonalMatching />}
      </div>

      <p className={styles.matchingText}>
        {activeTab === "group"
          ? "인접한 학번의 선후배가 매칭됩니다."
          : "일치하는 학번의 선후배가 매칭됩니다."}
      </p>
    </div>
  );
}
