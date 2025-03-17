import { useState, useEffect } from "react";
import { postEmailSend, postEmailVerify } from "../../api/emailAPI";
import styles from "./signUpInput.module.css";
import { ClipLoader } from "react-spinners";

export default function SignUpInput({
  setFormData,
  setEmail,
  isVerified,
  setIsVerified,
}) {
  const [localEmail, setLocalEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [localFormData, setLocalFormData] = useState({
    department: "소프트웨어학과",
    studentId: "",
    pin: "",
    confirmPin: "",
    name: "",
    instagram: "",
    kakao: "",
    mbti: "",
    bio: "",
  });

  useEffect(() => {
    setFormData(localFormData);
    setEmail(localEmail);
  }, [localFormData, localEmail, setFormData, setEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "pin" || name === "confirmPin") {
      newValue = value.replace(/\D/g, "").slice(0, 4);
    } else if (name === "name") {
      newValue = value.slice(0, 5);
    } else if (name === "studentId") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "bio" && value.length > 50) {
      alert("한줄소개는 최대 50글자까지 입력 가능합니다.");
      return;
    }

    setLocalFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleEmailChange = (e) => {
    let value = e.target.value;
    if (!value.includes("@")) {
      setLocalEmail(value);
    }
  };

  const sendVerificationCode = async () => {
    if (!localEmail) {
      alert("이메일을 입력해주세요.");
      return;
    }
    setIsSendingCode(true); // 로딩 시작
    try {
      await postEmailSend({ email: `${localEmail}@skuniv.ac.kr` });
      alert("인증번호가 발송되었습니다.");
    } catch (error) {
      alert("이메일 인증 요청에 실패했습니다. 다시 시도해주세요.");
      console.error("인증 이메일 전송 오류:", error);
    } finally {
      setIsSendingCode(false); // 로딩 종료
    }
  };

  const verifyCode = async () => {
    if (!verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      await postEmailVerify({
        email: `${localEmail}@skuniv.ac.kr`,
        code: verificationCode,
      });
      setIsVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    } catch (error) {
      alert("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
      console.error("인증 코드 검증 오류:", error);
    }
  };

  return (
    <div className={styles.inputContainer}>
      {/* 이메일 입력 */}
      <p className={styles.text}>이메일*</p>
      <div className={styles.emailContainer}>
        <input
          type="email"
          className={`${styles.input} ${styles.emailInput}`}
          value={localEmail}
          onChange={handleEmailChange}
          placeholder="이메일 입력"
          disabled={isVerified}
        />
        <span className={styles.email}>@skuniv.ac.kr</span>
      </div>
      {isSendingCode ? (
        <div className={styles.spinnerContainer}>
          <ClipLoader color="#6a9132" size={40} />
        </div>
      ) : (
        <button
          className={styles.verifyButton}
          onClick={sendVerificationCode}
          disabled={isVerified || isSendingCode}
        >
          {isVerified ? "인증 완료" : "인증 요청"}
        </button>
      )}

      {/* 인증번호 입력 */}
      {!isVerified && (
        <>
          <p className={styles.text}>인증번호 입력</p>
          <input
            type="text"
            className={styles.input}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증번호 입력"
          />

          <button className={styles.verifyButton} onClick={verifyCode}>
            확인
          </button>
        </>
      )}

      <p className={styles.text}>학과*</p>
      <input
        type="text"
        className={styles.input}
        name="department"
        value={localFormData.department}
        placeholder="소프트웨어학과"
        disabled
      />

      <p className={styles.text}>학번*</p>
      <input
        type="text"
        className={styles.input}
        name="studentId"
        value={localFormData.studentId}
        onChange={handleChange}
        placeholder="학번 입력"
      />

      <p className={styles.text}>PIN 번호*</p>
      <input
        type="password"
        className={styles.input}
        name="pin"
        value={localFormData.pin}
        onChange={handleChange}
        placeholder="PIN 번호 입력"
      />

      <p className={styles.text}>PIN 번호 확인*</p>
      <input
        type="password"
        className={styles.input}
        name="confirmPin"
        value={localFormData.confirmPin}
        onChange={handleChange}
        placeholder="PIN 번호 확인"
      />

      <p className={styles.text}>이름*</p>
      <input
        type="text"
        className={styles.input}
        name="name"
        value={localFormData.name}
        onChange={handleChange}
        placeholder="이름 입력"
      />

      <p className={styles.text}>인스타 아이디 (선택)</p>
      <input
        type="text"
        className={styles.input}
        name="instagram"
        value={localFormData.instagram}
        onChange={handleChange}
        placeholder="인스타그램 아이디 입력"
      />

      <p className={styles.text}>카카오톡 아이디 (선택)</p>
      <input
        type="text"
        className={styles.input}
        name="kakao"
        value={localFormData.kakao}
        onChange={handleChange}
        placeholder="카카오톡 아이디 입력"
      />

      <p className={styles.text}>MBTI (선택)</p>
      <input
        type="text"
        className={styles.input}
        name="mbti"
        value={localFormData.mbti}
        onChange={handleChange}
        placeholder="MBTI 입력"
      />

      <p className={styles.text}>한줄 소개 (선택)</p>
      <input
        type="text"
        className={styles.input}
        name="bio"
        value={localFormData.bio}
        onChange={handleChange}
        placeholder="한줄 소개 입력"
      />
    </div>
  );
}
