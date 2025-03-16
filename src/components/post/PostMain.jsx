import { useState } from "react";
import styles from "./postMain.module.css";
import Header from "../header/Header";
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import WriteButton from "./WriteButton";

export default function PostMain() {
  const [sortType, setSortType] = useState("최신순");
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [isSearching, setIsSearching] = useState(false); // 검색 여부 상태

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  const handleSortChange = (sort) => {
    setSortType(sort);
  };

  const handleBack = () => {
    window.location.href = "/post";
  };

  return (
    <div className={styles.container}>
      <Header />
      <PostFilter
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        isSearching={isSearching} // 검색 여부 전달
        onBack={handleBack} // 뒤로 가기 버튼 클릭 시 실행
      />
      <PostList sortType={sortType} searchQuery={searchQuery} isSearching={isSearching} />
      <WriteButton />
    </div>
  );
}
