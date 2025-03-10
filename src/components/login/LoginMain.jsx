import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import styles from "./loginMain.module.css";
import { postLogin } from "../../api/userAPI";

export default function LoginMain() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = async () => {
    if (!studentId || !pin) {
      alert("학번과 PIN 번호를 입력해주세요.");
      return;
    }

    const requestBody = { studentId, pin };

    try {
      const response = await postLogin(requestBody);
      console.log("로그인 성공:", response);
      alert("로그인에 성공했습니다.");
      navigate("/"); // 로그인 후 홈 화면으로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 학번 또는 PIN을 확인해주세요.");
    }
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.inputContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>With Buddy</h2>
          <p className={styles.subtitle}>서경대학교 선후배 학번 매칭 사이트</p>
        </div>
        <LoginInput setStudentId={setStudentId} setPin={setPin} />
        <LoginButton />
      </div>
      <button className={styles.loginButton} onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}
