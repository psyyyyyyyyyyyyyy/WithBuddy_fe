import { useState } from 'react';
import styles from './Header.module.css';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>With Buddy</h1>

            <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <nav className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
                <ul>
                    <li>정보수정</li>
                    <li>게시판</li>
                    <li>설정</li>
                    <li>로그아웃</li>
                </ul>
            </nav>
        </header>
    );
}
