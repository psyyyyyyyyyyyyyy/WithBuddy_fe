import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <h1 className={styles.title} onClick={() => navigate("/")}>
                With Buddy
            </h1>

            <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <nav className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
                <ul>
                    <li onClick={() => navigate("/modify")}>정보수정</li>
                    <li onClick={() => navigate("/post")}>게시판</li>
                    <li onClick={() => navigate("/setting")}>설정</li>
                    <li>로그아웃</li>
                </ul>
            </nav>
        </header>
    );
}
