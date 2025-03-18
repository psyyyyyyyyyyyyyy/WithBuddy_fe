import { useState, useEffect } from "react";
import styles from "./groupMatching.module.css";
import { FaUser } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import MemberModal from "./MemberModal";
import { getPersonalMatching, getMatchingInfo } from "../../api/matchingAPI";

export default function PersonalMatching() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoding, setIsLoding] = useState(false);
  const currentUserId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoding(true); // 로딩 시작
      try {
        const response = await getPersonalMatching();
        const matchParticipants = response.success.matchParticipants;

        // 각 멤버의 추가 정보를 가져오기 위해 Promise.all 사용
        const detailedMembers = await Promise.all(
          matchParticipants.map(async (participant) => {
            const userInfo = await getMatchingInfo(participant.user.userId);
            return {
              id: userInfo.success.userId,
              name:
                userInfo.success.userId === currentUserId
                  ? "내 프로필"
                  : userInfo.success.name, // 현재 유저 이름 '나'로 변경
              year:
                userInfo.success.studentId?.slice(2, 4) + "학번" || "정보 없음",
              instagram: userInfo.success.instaId || "정보 없음",
              kakao: userInfo.success.kakaoId || "정보 없음",
              mbti: userInfo.success.mbti || "정보 없음",
              bio: userInfo.success.bio || "정보 없음",
              isCurrentUser: userInfo.success.userId === currentUserId,
            };
          })
        );

        // 현재 유저를 가장 위로 정렬
        const sortedMembers = detailedMembers.sort((a, b) =>
          a.id === currentUserId ? -1 : 1
        );

        setMembers(sortedMembers);
      } catch (error) {
        alert("개인 매칭 데이터 불러오기 실패:");
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
                <FaUser
                  className={styles.icon}
                  style={{
                    color: member.isCurrentUser ? "#6a9132" : "#ffffff",
                  }} // 본인은 초록색
                />
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
