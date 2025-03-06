import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ModificationPage from "../pages/Modification";
import SettingPage from "../pages/SettingPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/modify" element={<ModificationPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Routes>
    </Router>
  );
}
