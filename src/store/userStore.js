import { create } from "zustand";

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null, // 초기값을 로컬스토리지에서 불러오기
  setUser: (userData) => {
    localStorage.setItem("userId", JSON.stringify(userData.userId)); // 로컬 스토리지 저장
    localStorage.setItem("studentId", JSON.stringify(userData.studentId));
    localStorage.setItem("name", JSON.stringify(userData.name));
    set({ user: userData });
  },
  logout: () => {
    localStorage.removeItem("user"); // 로그아웃시 로컬 스토리지 삭제
    set({ user: null });
  },
}));

export default useUserStore;
