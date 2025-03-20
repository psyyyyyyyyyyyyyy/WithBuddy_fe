import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ModificationCard from "../components/modification/modificationCard";

export default function ModificationPage() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return <ModificationCard />;
}
