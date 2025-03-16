import styles from "./postMain.module.css";
import Header from "../header/Header";
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import WriteButton from "./WriteButton";
import useSearchStore from "../../store/searchStore";

export default function PostMain() {
  const { searchQuery, isSearching, sortType, setSearchQuery, setSortType, resetSearch } = useSearchStore();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort) => {
    setSortType(sort);
  };

  const handleBack = () => {
    resetSearch(); // Zustand 상태 초기화
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
