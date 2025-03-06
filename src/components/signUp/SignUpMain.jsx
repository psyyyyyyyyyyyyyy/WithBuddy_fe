import { useNavigate } from "react-router-dom";
import SignUpInput from "./SignUpInput";
import styles from "./signUpMain.module.css";

export default function SignUpMain() {
    const navigate = useNavigate();

    const handleSignUp = (data) => {
        console.log("회원가입 데이터:", data);
    };

    return (
        <div className={styles.allContainer}>
            <button className={styles.backButton} onClick={() => navigate('/login')}>
                ←
            </button>

            <h2 className={styles.mainText}>회원가입</h2>

            <SignUpInput onSubmit={handleSignUp} />

            <button className={styles.signUpButton} onClick={() => handleSignUp()}>
                회원가입
            </button>
        </div>
    );
}
