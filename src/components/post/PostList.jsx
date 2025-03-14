import { useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/postAPI";
import PostItem from "./PostItem";
import styles from "./postList.module.css";
import { ClipLoader } from "react-spinners";

export default function PostList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = null }) => getPosts(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.success.length
          ? lastPage.success[lastPage.success.length - 1].postId
          : null,
    });

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <div className={styles.postList}>
      {data?.pages.map((page, i) =>
        page.success.map((post, index) => (
          <PostItem
            key={post.postId}
            post={post}
            ref={index === page.success.length - 1 ? lastPostRef : undefined}
          />
        ))
      )}
      {isFetchingNextPage && (
        <div className={styles.spinnerContainer}>
          <ClipLoader color="#6a9132" size={30} />
        </div>
      )}
    </div>
  );
}
