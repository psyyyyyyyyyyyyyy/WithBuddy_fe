import styles from "./postMain.module.css";
import Header from "../header/Header";
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import WriteButton from "./WriteButton";
import useSearchStore from "../../store/searchStore";

export default function PostMain() {
  const { searchQuery, isSearching, setSearchQuery, resetSearch, sortType, setSortType } = useSearchStore();

  const handleSearch = (query) => {
    setSearchQuery(query); // Zustand로 검색어어 상태 업데이트
  };

  const handleSortChange = (sort) => {
    setSortType(sort); // Zustand로 정렬 상태 업데이트
  };

  const handleBack = () => {
    resetSearch();
  };

  return (
    <div className={styles.container}>
      <Header />
      <PostFilter
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        isSearching={isSearching}
        onBack={handleBack}
      />
      <PostList sortType={sortType} searchQuery={searchQuery} isSearching={isSearching} />
      <WriteButton />
    </div>
  );
}
