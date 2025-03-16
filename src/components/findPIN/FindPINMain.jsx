import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./findPINMain.module.css";
import { postEmailSend, postEmailVerify } from "../../api/emailAPI";
import { patchPIN } from "../../api/userAPI";
import { FaArrowLeft } from "react-icons/fa";

export default function FindPINMain() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isPinReset, setIsPinReset] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    if (emailValue.includes("@")) {
      setEmail(emailValue.split("@")[0]);
    } else {
      setEmail(emailValue);
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleNewPinChange = (e) => {
    const pin = e.target.value;
    if (/^\d{0,4}$/.test(pin)) {
      setNewPin(pin);
    }
  };

  const handleConfirmNewPinChange = (e) => {
    const pin = e.target.value;
    if (/^\d{0,4}$/.test(pin)) {
      setConfirmNewPin(pin);
    }
  };

  // 이메일 인증 코드 전송
  const sendVerificationCode = async () => {
    try {
      await postEmailSend({ email: `${email}@skuniv.ac.kr` });
      alert("인증번호가 발송되었습니다.");
    } catch (error) {
      alert("인증번호 전송에 실패했습니다.");
    }
  };

  // 인증 코드 확인
  const verifyCode = async () => {
    try {
      await postEmailVerify({
        email: `${email}@skuniv.ac.kr`,
        code: verificationCode,
      });
      setIsVerified(true);
      alert("이메일 인증이 완료되었습니다.");
    } catch (error) {
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  // PIN 번호 재설정
  const handlePinReset = async () => {
    if (newPin !== confirmNewPin) {
      alert("PIN 번호가 일치하지 않습니다.");
      return;
    }

    try {
      await patchPIN({
        email: `${email}@skuniv.ac.kr`,
        newPin,
      });

      setIsPinReset(true);
      alert("PIN 번호가 재설정되었습니다.");
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      alert("PIN 번호 변경에 실패했습니다.");
    }
  };

  return (
    <div className={styles.allContainer}>
      <button className={styles.backButton} onClick={() => navigate("/login")}>
        <FaArrowLeft />
      </button>

      <h2 className={styles.title}>PIN 번호 변경</h2>
      <div className={styles.inputContainer}>
        <p className={styles.text}>이메일</p>
        <div className={styles.emailContainer}>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일 입력"
          />
          <span className={styles.email}>@skuniv.ac.kr</span>
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

        {isVerified && (
          <>
            <p className={styles.text}>새 PIN 번호</p>
            <input
              type="password"
              className={styles.input}
              value={newPin}
              onChange={handleNewPinChange}
              placeholder="새 PIN 번호 입력 (4자리)"
              maxLength={4}
              required
            />

            <p className={styles.text}>새 PIN 번호 확인</p>
            <input
              type="password"
              className={styles.input}
              value={confirmNewPin}
              onChange={handleConfirmNewPinChange}
              placeholder="새 PIN 번호 확인"
              maxLength={4}
              required
            />

            <button
              className={styles.verifyButton}
              onClick={handlePinReset}
              disabled={newPin !== confirmNewPin || newPin.length !== 4}
            >
              PIN 번호 재설정
            </button>
          </>
        )}

        {isPinReset && (
          <div className={styles.successMessage}>
            <p>PIN 번호가 성공적으로 재설정되었습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
