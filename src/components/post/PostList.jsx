import { useRef, useCallback } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPosts, getSearchPost } from "../../api/postAPI";
import PostItem from "./PostItem";
import styles from "./postList.module.css";
import { ClipLoader } from "react-spinners";

export default function PostList({ sortType, searchQuery, isSearching }) {
  // 검색 모드일 경우 useQuery 사용 (API 한 번만 호출)
  const { data: searchData, isLoading: isSearchLoading } = useQuery({
    queryKey: ["searchPosts", searchQuery],
    queryFn: () => getSearchPost(searchQuery),
    enabled: isSearching, // 검색어가 있을 때만 실행
  });

  // 일반 게시글 조회 (무한 스크롤)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["posts", sortType],
    queryFn: ({ pageParam = null }) => getPosts(pageParam, sortType),
    getNextPageParam: (lastPage) =>
      lastPage.success.length ? lastPage.success[lastPage.success.length - 1].postId : null,
    enabled: !isSearching, // 검색 중이면 일반 게시글 요청 안 함
  });

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (isFetchingNextPage || isSearching) return; // 검색 중이면 무한 스크롤 막기
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage, isSearching]
  );

  // 검색 모드일 경우 검색 데이터 사용
  const posts = isSearching ? searchData?.success || [] : data?.pages.flatMap((page) => page.success) || [];

  return (
    <div className={styles.postList}>
      {posts.map((post, index) => (
        <PostItem
          key={post.postId}
          post={post}
          ref={index === posts.length - 1 && !isSearching ? lastPostRef : undefined} // 검색 모드일 땐 무한 스크롤 X
        />
      ))}
      {(isFetchingNextPage || isSearchLoading) && (
        <div className={styles.spinnerContainer}>
          <ClipLoader color="#6a9132" size={30} />
        </div>
      )}
    </div>
  );
}
