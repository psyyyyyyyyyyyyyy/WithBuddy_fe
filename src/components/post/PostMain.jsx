import styles from "./postMain.module.css";
import Header from "../header/Header";
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import WriteButton from "./WriteButton";

export default function PostMain() {
  const handleSearch = (query) => {
    console.log("검색어:", query);
    // 검색 기능 로직 추가
  };

  const handleSortChange = (sortType) => {
    console.log("정렬 기준:", sortType);
    // 정렬 로직 추가
  };
  return (
    <div className={styles.container}>
      <Header />
      <PostFilter onSearch={handleSearch} onSortChange={handleSortChange} />
      <PostList />
      <WriteButton />
    </div>
  );
}
