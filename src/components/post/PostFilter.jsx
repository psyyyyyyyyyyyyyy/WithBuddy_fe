import { useState } from "react";
import styles from "./postFilter.module.css";
import { FaSearch } from "react-icons/fa";

export default function PostFilter({ onSearch, onSearchClick, onSortChange }) {
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchClick = () => {
    if (searchText.trim() === "") return; // 빈 검색어 방지
    onSearch(searchText);
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
          placeholder="검색어, 해시태그 입력"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={styles.searchInput}
        />
        <FaSearch className={styles.searchIcon} onClick={() => onSearchClick(searchText)}/>
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
    </div>
  );
}
