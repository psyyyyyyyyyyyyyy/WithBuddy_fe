import { useState } from "react";
import styles from "./postFilter.module.css";
import { FaSearch } from "react-icons/fa";

export default function PostFilter({ onSearch, onSortChange }) {
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("latest"); // 기본값: 최신순
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    onSortChange(type);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="검색어 입력..."
          value={searchText}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <FaSearch className={styles.searchIcon} />
      </div>

      <div className={styles.sortDropdown}>
        <button
          className={styles.sortButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {sortType === "latest" ? "최신순" : sortType === "comments" ? "댓글순" : "공감순"} ▼
        </button>
        {isDropdownOpen && (
          <ul className={styles.sortList}>
            <li onClick={() => handleSortChange("latest")}>최신순</li>
            <li onClick={() => handleSortChange("comments")}>댓글순</li>
            <li onClick={() => handleSortChange("likes")}>공감순</li>
          </ul>
        )}
      </div>
    </div>
  );
}
