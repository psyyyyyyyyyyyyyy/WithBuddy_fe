import { useEffect, useState } from "react";
import Header from "../header/Header";
import styles from "./modificationCard.module.css";
import { getMyInfo, patchMyInfo } from "../../api/userAPI";

export default function ModificationCard() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    studentId: "",
    kakaoId: "",
    instaId: "",
    pin: "",
    confirmPin: "",
    mbti: "",
    bio: "",
  });

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMyInfo();
        if (response.resultType === "SUCCESS") {
          setUserInfo({
            name: response.success.name || "",
            studentId: response.success.studentId || "",
            kakaoId: response.success.kakaoId || "",
            instaId: response.success.instaId || "",
            mbti: response.success.mbti || "",
            bio: response.success.bio || "",
            pin: "",
            confirmPin: "",
          });
        }
      } catch (error) {
        console.error("내 정보 불러오기 실패:", error);
      }
    };

    fetchMyInfo();
  }, []);

  // 입력 값 관리
  const handleChange = (e) => {
    const { name, value } = e.target;

     // PIN은 숫자만 허용, 4자리로 제한
     if ((name === "pin" || name === "confirmPin") && !/^\d{0,4}$/.test(value)) {
      return;
    }

    // 한줄소개는 50글자 제한
    if (name === "bio" && value.length > 50) {
      alert("한줄소개는 최대 50글자까지 입력 가능합니다.");
      return;
    }
    
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 저장 버튼 클릭 시 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.pin !== userInfo.confirmPin) {
      alert("PIN 번호가 일치하지 않습니다.");
      return;
    }

    const updateData = {
      name: userInfo.name,
      kakaoId: userInfo.kakaoId,
      instaId: userInfo.instaId,
      mbti: userInfo.mbti,
      bio: userInfo.bio,
      pin: userInfo.pin || undefined, // PIN 입력 없으면 보내지 않음
    };

    try {
      const response = await patchMyInfo(updateData);
      if (response.resultType === "SUCCESS") {
        alert("정보가 성공적으로 수정되었습니다!");
      } else {
        alert("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("정보 수정 실패:", error);
      alert("서버에 문제가 발생했습니다.");
    }
  };

  return (
    <div className={styles.allContainer}>
      <Header />
      <div className={styles.cardContainer}>
        <div className={styles.sectionHeader}>인적사항</div>
        <hr />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={userInfo.name}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="소프트웨어학과"
            className={styles.input}
            disabled
          />
          <input
            type="text"
            placeholder="학번"
            value={userInfo.studentId}
            className={styles.input}
            disabled
          />
          <input
            type="password"
            name="pin"
            placeholder="새로운 PIN번호"
            value={userInfo.pin}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="confirmPin"
            placeholder="새로운 PIN번호 확인"
            value={userInfo.confirmPin}
            onChange={handleChange}
            className={styles.input}
          />
        </form>

        <div className={styles.sectionHeader}>SNS 아이디</div>
        <hr />
        <form className={styles.form}>
          <input
            type="text"
            name="instaId"
            placeholder="인스타"
            value={userInfo.instaId}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="kakaoId"
            placeholder="카톡"
            value={userInfo.kakaoId}
            onChange={handleChange}
            className={styles.input}
          />
        </form>

        <div className={styles.sectionHeader}>추가 정보</div>
        <hr />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="mbti"
            placeholder="MBTI"
            value={userInfo.mbti}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="bio"
            placeholder="한줄소개"
            value={userInfo.bio}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            저장
          </button>
        </form>
      </div>
    </div>
  );
}
