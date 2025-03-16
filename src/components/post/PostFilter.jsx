import { useState } from "react";
import styles from "./postFilter.module.css";
import { FaSearch, FaArrowLeft } from "react-icons/fa";

export default function PostFilter({ onSearch, onSortChange, isSearching, onBack }) {
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchClick = () => {
    if (searchText.trim() === "") return;
    onSearch(searchText);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    onSortChange(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.filterContainer}>
      {isSearching ? (
        // 검색 후: 뒤로 가기 버튼만 표시
        <button className={styles.backButton} onClick={onBack}>
          <FaArrowLeft /> 뒤로가기
        </button>
      ) : (
        // 기본 상태: 검색창 + 정렬 버튼 표시
        <>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="검색어, 해시태그 입력"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchInput}
            />
            <FaSearch className={styles.searchIcon} onClick={handleSearchClick} />
          </div>

          <div className={styles.sortDropdown}>
            <button
              className={styles.sortButton}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {sortType} ▼
            </button>
            {isDropdownOpen && (
              <ul className={styles.sortList}>
                <li onClick={() => handleSortChange("최신순")}>최신순</li>
                <li onClick={() => handleSortChange("댓글순")}>댓글순</li>
                <li onClick={() => handleSortChange("공감순")}>공감순</li>
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
