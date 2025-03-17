import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpInput from "./SignUpInput";
import PrivacyPolicy from "../privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../privacyPolicy/TermsAndConditions";
import styles from "./signUpMain.module.css";
import { postSignUp } from "../../api/userAPI";
import { FaArrowLeft } from "react-icons/fa";

export default function SignUpMain() {
  const navigate = useNavigate();
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

  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isAgreedPrivacy, setIsAgreedPrivacy] = useState(false);
  const [isAgreedTerms, setIsAgreedTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSignUp = async () => {
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    if (formData.pin !== formData.confirmPin) {
      alert("PIN 번호가 일치하지 않습니다.");
      return;
    }

    const { department, studentId, pin, name } = formData;
    if (!department || !studentId || !pin || !name) {
      alert("필수 입력 항목이 비어있습니다.");
      return;
    }

    if (!isAgreedPrivacy || !isAgreedTerms) {
      alert("모든 약관에 동의해야 합니다.");
      return;
    }

    const userData = {
      name: formData.name,
      studentId: formData.studentId,
      email: `${email}@skuniv.ac.kr`,
      kakaoId: formData.kakao || null,
      instaId: formData.instagram || null,
      mbti: formData.mbti || null,
      bio: formData.bio || null,
      department: formData.department,
      pin: formData.pin,
    };

    try {
      const response = await postSignUp(userData);
      console.log("회원가입 성공:", response);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      if (error.response && error.response.status === 409) {
        alert("이미 존재하는 유저입니다.");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <div className={styles.allContainer}>
      <button className={styles.backButton} onClick={() => navigate("/login")}>
        <FaArrowLeft />
      </button>

      <h2 className={styles.mainText}>회원가입</h2>

      <SignUpInput
        setFormData={setFormData}
        setEmail={setEmail}
        isVerified={isVerified}
        setIsVerified={setIsVerified}
      />

      {/* 약관 동의 체크박스 */}
      <div className={styles.termsContainer}>
        {/* 개인정보 처리 방침 */}
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.customCheckbox}
            checked={isAgreedPrivacy}
            onChange={(e) => setIsAgreedPrivacy(e.target.checked)}
          />
          개인정보 처리 방침에 동의합니다.
        </label>

        <div className={styles.termsSummary}>
          <p>
            With Buddy 서비스 이용 조건, 회원 및 회사의 권리·의무, 계약
            변경·해지, 면책 사항 등을 규정한 약관.
          </p>
          <button onClick={() => setShowPrivacyPolicy(!showPrivacyPolicy)}>
            {showPrivacyPolicy ? "닫기" : "자세히 보기"}
          </button>
        </div>

        {showPrivacyPolicy && <PrivacyPolicy />}

        {/* 이용 약관 */}
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isAgreedTerms}
            className={styles.customCheckbox}
            onChange={(e) => setIsAgreedTerms(e.target.checked)}
          />
          이용 약관에 동의합니다.
        </label>

        <div className={styles.termsSummary}>
          <p>
            본 서비스는 회원가입 및 관리 목적으로 개인정보를 수집하며, 법령에 따라 예외적으로 보존될 수 있습니다.
          </p>
          <button onClick={() => setShowTerms(!showTerms)}>
            {showTerms ? "닫기" : "자세히 보기"}
          </button>
        </div>

        {showTerms && <TermsAndConditions />}
      </div>

      {/* 모든 약관에 동의해야 회원가입 버튼 활성화 */}
      <button
        className={styles.signUpButton}
        onClick={handleSignUp}
        disabled={!isAgreedPrivacy || !isAgreedTerms}
      >
        회원가입
      </button>
    </div>
  );
}
