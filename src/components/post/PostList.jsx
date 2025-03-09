import styles from "./postList.module.css";
import PostItem from "./PostItem";

const dummyPosts = [
  { id: 1, title: "umc", content: "umc 동아리 스프링 면접 다들 잘 보셨나요??", time: "방금 전" },
  { id: 2, title: "리더십", content: "신입생인데요..ㅜㅜ 리더십 OT 들으신 선배님들 계신가요?", time: "5분 전" },
  { id: 3, title: "컴퓨팅사고", content: "누구나 만들며 배울수있는 컴퓨팅사고 들으시는분 제발여", time: "7분 전" },
  { id: 4, title: "기초수학", content: "한 명만 빠져주실 수 있나요....ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ", time: "7분 전" },
  { id: 5, title: "umc", content: "umc 동아리 스프링 면접 다들 잘 보셨나요??", time: "방금 전" },
  { id: 6, title: "리더십", content: "신입생인데요..ㅜㅜ 리더십 OT 들으신 선배님들 계신가요????????????????????????!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ㅠㅠㅠㅠㅠㅠㅠㅠㅠ", time: "5분 전" },
  { id: 7, title: "컴퓨팅사고", content: "누구나 만들며 배울수있는 컴퓨팅사고 들으시는분 제발여", time: "7분 전" },
  { id: 8, title: "기초수학", content: "한 명만 빠져주실 수 있나요....ㅠㅠ", time: "7분 전" },
  { id: 9, title: "umc", content: "umc 동아리 스프링 면접 다들 잘 보셨나요??", time: "방금 전" },
  { id: 10, title: "리더십", content: "신입생인데요..ㅜㅜ 리더십 OT 들으신 선배님들 계신가요?", time: "5분 전" },
  { id: 11, title: "컴퓨팅사고", content: "누구나 만들며 배울수있는 컴퓨팅사고 들으시는분 제발여", time: "7분 전" },
  { id: 12, title: "기초수학", content: "한 명만 빠져주실 수 있나요....ㅠㅠ", time: "7분 전" },
];

export default function PostList() {
  return (
    <div className={styles.postList}>
      {dummyPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
