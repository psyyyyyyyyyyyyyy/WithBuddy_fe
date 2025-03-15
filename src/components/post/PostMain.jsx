import { useState } from "react";
import styles from "./postMain.module.css";
import Header from "../header/Header";
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import WriteButton from "./WriteButton";

export default function PostMain() {
  const [sortType, setSortType] = useState("최신순");

  const handleSearch = (query) => {
    console.log("검색어:", query);
    // 검색 기능 로직 추가
  };

  const handleSortChange = (sort) => {
    setSortType(sort);
  };

  return (
    <div className={styles.container}>
      <Header />
      <PostFilter onSearch={handleSearch} onSortChange={handleSortChange} />
      <PostList sortType={sortType}/>
      <WriteButton />
    </div>
  );
}
