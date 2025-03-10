import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpInput from "./SignUpInput";
import styles from "./signUpMain.module.css";
import { postSignUp } from "../../api/userAPI";

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

  const handleSignUp = async () => {
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
  
    if (formData.pin !== formData.confirmPin) {
      alert("PIN 번호가 일치하지 않습니다.");
      return;
    }
  
    // 필수 입력 항목 체크
    const { department, studentId, pin, name } = formData;
    if (!department || !studentId || !pin || !name) {
      alert("필수 입력 항목이 비어있습니다.");
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
        ←
      </button>

      <h2 className={styles.mainText}>회원가입</h2>

      <SignUpInput setFormData={setFormData} setEmail={setEmail} isVerified={isVerified} setIsVerified={setIsVerified} />

      <button className={styles.signUpButton} onClick={handleSignUp}>
        회원가입
      </button>
    </div>
  );
}
