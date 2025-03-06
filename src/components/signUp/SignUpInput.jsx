import { useState } from "react";
import styles from "./signUpInput.module.css";

export default function SignUpInput() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({
    department: "",
    studentId: "",
    pin: "",
    confirmPin: "",
    name: "",
    instagram: "",
    kakao: "",
    mbti: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 특정 필드에 대한 입력값 검증
    let newValue = value;

    if (name === "pin" || name === "confirmPin") {
      newValue = value.replace(/\D/g, "").slice(0, 4); // 숫자만 입력 + 4자리 제한
    } else if (name === "name") {
      newValue = value.slice(0, 5); // 최대 5글자
    } else if (name === "studentId") {
      newValue = value.replace(/\D/g, "").slice(0, 10); // 숫자만 입력 + 10자리 제한
    } else if (name === "bio") {
      newValue = value.slice(0, 50); // 최대 50글자
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleEmailChange = (e) => {
    let value = e.target.value;
    if (!value.includes("@")) {
      setEmail(value); // @skuniv.ac.kr 부분 제외하고 입력
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const sendVerificationCode = () => {
    // 이메일 인증 코드 전송 로직
    alert("인증번호가 발송되었습니다.");
  };

  const verifyCode = () => {
    // 인증 코드 확인 로직
    setIsVerified(true);
    alert("이메일 인증이 완료되었습니다.");
  };

  return (
    <div className={styles.inputContainer}>
      <p className={styles.text}>이메일</p>
      <div className={styles.emailContainer}>
        <input
          type="email"
          className={`${styles.input} ${styles.emailInput}`}
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일 입력"
          disabled={isVerified}
        />
        <span className={styles.email}>@skuniv.ac.kr</span>{" "}
        {/* 고정된 이메일 도메인 */}
      </div>
      <button
        className={styles.verifyButton}
        onClick={sendVerificationCode}
        disabled={isVerified}
      >
        {isVerified ? "인증 완료" : "인증 요청"}
      </button>

      {!isVerified && (
        <>
          <p className={styles.text}>인증번호 입력</p>
          <input
            type="text"
            className={styles.input}
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            placeholder="인증번호 입력"
          />
          <button className={styles.verifyButton} onClick={verifyCode}>
            확인
          </button>
        </>
      )}

      <p className={styles.text}>학과</p>
      <input
        type="text"
        className={styles.input}
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="학과 입력"
      />

      <p className={styles.text}>학번</p>
      <input
        type="text"
        className={styles.input}
        name="studentId"
        value={formData.studentId}
        onChange={handleChange}
        placeholder="학번 입력"
      />

      <p className={styles.text}>PIN 번호</p>
      <input
        type="password"
        className={styles.input}
        name="pin"
        value={formData.pin}
        onChange={handleChange}
        placeholder="PIN 번호 입력"
      />

      <p className={styles.text}>PIN 번호 확인</p>
      <input
        type="password"
        className={styles.input}
        name="confirmPin"
        value={formData.confirmPin}
        onChange={handleChange}
        placeholder="PIN 번호 확인"
      />

      <p className={styles.text}>이름</p>
      <input
        type="text"
        className={styles.input}
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="이름 입력"
      />

      <p className={styles.text}>인스타 아이디 (선택)</p>
      <input
        type="text"
        className={styles.input}
        name="instagram"
        value={formData.instagram}
        onChange={handleChange}
        placeholder="인스타그램 아이디 입력"
      />

      <p className={styles.text}>카카오톡 아이디 (선택)</p>
      <input
        type="text"
        className={styles.input}
        name="kakao"
        value={formData.kakao}
        onChange={handleChange}
        placeholder="카카오톡 아이디 입력"
      />

      <p className={styles.text}>MBTI (선택)</p>
      <input
        type="text"
        className={styles.input}
        name="mbti"
        value={formData.mbti}
        onChange={handleChange}
        placeholder="MBTI 입력"
      />

      <p className={styles.text}>한줄 소개 (선택)</p>
      <input
        type="text"
        className={styles.input}
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="한줄 소개 입력"
      />
    </div>
  );
}
