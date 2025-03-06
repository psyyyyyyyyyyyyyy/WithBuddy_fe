import { useState } from "react";
import styles from "./groupMatching.module.css";
import { FaUser } from "react-icons/fa";
import MemberModal from "./MemberModal";

const members = [
  {
    id: 1,
    year: "20학번",
    name: "윤희준",
    instagram: "@yoon_hj",
    kakao: "yoon123",
    mbti: "ENTP",
    bio: "여행과 음악을 좋아해요!",
  },
  {
    id: 2,
    year: "20학번",
    name: "변예섭",
    instagram: "@byeon_ys",
    kakao: "yeon98",
    mbti: "INFJ",
    bio: "책 읽는 걸 좋아하는 사람",
  },
  {
    id: 3,
    year: "22학번",
    name: "이진동",
    instagram: null,
    kakao: "jindong22",
    mbti: "ISTP",
    bio: "코딩할 때 가장 행복해요!",
  },
  {
    id: 4,
    year: "22학번",
    name: "박성연",
    instagram: "@sy_ovo_oxo",
    kakao: null,
    mbti: "ENTP",
    bio: "사람 만나는 걸 싫어해요 :)",
  },
  {
    id: 5,
    year: "23학번",
    name: "김태현",
    instagram: "@kimth23",
    kakao: "thkim123",
    mbti: "INTJ",
    bio: "조용한 성격이지만 친해지면 말 많아요!",
  },
  {
    id: 6,
    year: "23학번",
    name: "박태경",
    instagram: null,
    kakao: null,
    mbti: "ENTP",
    bio: "축구를 좋아하는 개발자!",
  },
];


export default function PersonalMatching() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className={styles.container}>
      {members.map((member) => (
        <div 
          key={member.id} 
          className={styles.memberCard} 
          onClick={() => setSelectedMember(member)}
        >
          <div className={styles.iconCircle}>
            <FaUser className={styles.icon} />
          </div>
          <p className={styles.year}>{member.year}</p>
          <p className={styles.name}>{member.name}</p>
        </div>
      ))}

      {/* 모달 */}
      {selectedMember && (
        <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
}
