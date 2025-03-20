import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SettingCard from "../components/setting/SettingCard";

export default function SettingPage() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return <SettingCard />;
}
