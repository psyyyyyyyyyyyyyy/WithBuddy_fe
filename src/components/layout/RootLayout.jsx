import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useSearchStore from "../../store/searchStore";

export default function RootLayout({ children }) {
  const location = useLocation();
  const resetSearch = useSearchStore((state) => state.resetSearch);

  useEffect(() => {
    // `/post`가 아닌 경로로 이동하면 Zustand 상태 초기화
    if (!location.pathname.startsWith("/post")) {
      resetSearch();
    }
  }, [location.pathname, resetSearch]);

  return <>{children}</>;
}
