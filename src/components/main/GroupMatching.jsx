import { useState, useEffect } from "react";
import styles from "./groupMatching.module.css";
import { FaUser } from "react-icons/fa";
import MemberModal from "./MemberModal";
import { getGroupMatching, getMatchingInfo } from "../../api/matchingAPI";
import { ClipLoader } from "react-spinners";

export default function GroupMatching() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoding, setIsLoding] = useState(false);

  const currentUserId = Number(localStorage.getItem("userId"));
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoding(true); //로딩 시작
      try {
        const response = await getGroupMatching();
        const matchParticipants = response.success.matchParticipants;

        // 현재 로그인한 유저는 제외하고 데이터 요청
        const filteredParticipants = matchParticipants.filter(
          (participant) => participant.user.userId !== currentUserId
        );

        // 각 멤버의 추가 정보를 가져오기 위해 Promise.all 사용
        const detailedMembers = await Promise.all(
          filteredParticipants.map(async (participant) => {
            const userInfo = await getMatchingInfo(participant.user.userId);
            return {
              id: userInfo.success.userId,
              name: userInfo.success.name,
              year: userInfo.success.studentId?.slice(2, 4) + "학번" || "정보 없음",
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
      } finally {
        setIsLoding(false); // 로딩 종료
      }
    };

    fetchMembers();
  }, [currentUserId]);

  return (
    <>
      {isLoding ? (
        <div className={styles.spinnerContainer}>
          <ClipLoader color="#6a9132" size={40} />
        </div>
      ) : (
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
        </div>
      )}

      {/* 모달 */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </>
  );
}
