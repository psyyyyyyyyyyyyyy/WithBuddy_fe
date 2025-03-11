import { useState, useEffect } from "react";
import styles from "./groupMatching.module.css";
import { FaUser } from "react-icons/fa";
import MemberModal from "./MemberModal";
import { getGroupMatching, getMatchingInfo } from "../../api/matchingAPI";

export default function GroupMatching() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getGroupMatching();
        const matchParticipants = response.success.matchParticipants;

        // 각 멤버의 추가 정보를 가져오기 위해 Promise.all 사용
        const detailedMembers = await Promise.all(
          matchParticipants.map(async (participant) => {
            const userInfo = await getMatchingInfo(participant.user.userId); // 개별 정보 요청
            return {
              id: userInfo.success.userId,
              name: userInfo.success.name,
              year: userInfo.success.studentId?.slice(0, 2) + "학번" || "정보 없음", // 학번 앞 두 자리 추출
              instagram: userInfo.success.instaId || "정보 없음",
              kakao: userInfo.success.kakaoId || "정보 없음",
              mbti: userInfo.success.mbti || "정보 없음",
              bio: userInfo.success.bio || "정보 없음",
            };
          })
        );

        setMembers(detailedMembers);
      } catch (error) {
        console.error("그룹 매칭 데이터 불러오기 실패:", error);
      }
    };

    fetchMembers();
  }, []);

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
