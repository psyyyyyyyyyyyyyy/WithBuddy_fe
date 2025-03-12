import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import FindPINPage from "../pages/FindPINPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ModificationPage from "../pages/Modification";
import SettingPage from "../pages/SettingPage";
import PostPage from "../pages/PostPage";
import WritePostPage from "../pages/WritePostPage";
import PostDetailPage from "../pages/PostDetailPage";
import ChatList from "../pages/ChatListPage";
import ChatPage from "../pages/ChatPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findPIN" element={<FindPINPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/modify" element={<ModificationPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/write" element={<WritePostPage />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}
