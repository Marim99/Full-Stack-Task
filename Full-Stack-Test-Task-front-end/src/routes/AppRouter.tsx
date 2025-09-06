import { BrowserRouter as Router, Routes, Route } from "react-router-dom";import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";
import HomePage from "@/modules/home/pages/HomePage";
import MainLayout from "@/components/MainLayout";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          element={<MainLayout />}
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
