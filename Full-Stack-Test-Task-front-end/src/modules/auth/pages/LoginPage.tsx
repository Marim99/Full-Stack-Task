import Logo from "@/components/shared/logo";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function LoginPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center justify-center mb-4">
          <Logo/>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {t("login")}
        </h1>
        <LoginForm />

        <p className="text-center text-sm text-gray-600 mt-6">
          {t("loginForm.haveAccount")}{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            {t("loginForm.signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
}
